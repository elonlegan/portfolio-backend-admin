import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { SkillService, AlertService } from '@app/services';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { CodeModel } from '@ngstack/code-editor';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  form: UntypedFormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  isValidImage: boolean = false;
  image: any;

  urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'css',
    uri: 'main.css',
    value: `.skill-pill#skill-title{\n}`,
  };

  options = {
    contextmenu: false,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    automaticLayout: true,
  };

  onCodeChanged(value) {
    // console.log('CODE', value);
    this.form.controls['customStyles'].setValue(value);
  }

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private skillService: SkillService,
    private alertService: AlertService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      color: ['#026fff'],
      customStyles: [''],
      url: ['', [Validators.pattern(this.urlRegex)]],
      imageUrl: ['', this.isAddMode ? '' : Validators.nullValidator],
    });

    if (!this.isAddMode) {
      this.skillService
        .getById(this.id)
        .pipe(first())
        .subscribe((skill) => {
          this.form.patchValue({
            ...skill,
            imageUrl: '',
          });
          this.updateCodeValue(skill.title, skill.customStyles);
        });
    }

    this.updateCodeValue();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  updateCodeValue(
    event = this.f.title.value,
    codeValue = this.codeModel.value
  ) {
    let value = this.getUpdatedValueCode(
      codeValue,
      this.camelize(event || 'skillTitle')
    );
    this.codeModel = {
      ...this.codeModel,
      value,
    };
    this.form.controls['customStyles'].setValue(value);
  }

  getUpdatedValueCode(value, title) {
    return value.replace(/skill-pill#.*{/, `skill-pill#${title}{`);
  }

  camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createSkill();
    } else {
      this.updateSkill();
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSize = file.size / 1024 / 1024;
      if (fileSize <= 5) {
        this.image = file;
        this.isValidImage = true;
      } else {
        this.isValidImage = false;
        alert('Too large image, max 5MB');
        this.form.controls['imageUrl'].setValue('');
        this.image = '';
      }
    }
  }

  private async createSkill() {
    try {
      await this.handleImageUpload();
      this.skillService
        .create(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success('Skill created successfully', {
              keepAfterRouteChange: true,
            });
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error) => {
            this.alertService.error(error);
            this.loading = false;
          },
        });
    } catch (error) {
      this.alertService.error(error);
      this.loading = false;
    }
  }

  private async updateSkill() {
    try {
      await this.handleImageUpload();
      this.skillService
        .update(this.id, this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success('Update successful', {
              keepAfterRouteChange: true,
            });
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          error: (error) => {
            this.alertService.error(error);
            this.loading = false;
          },
        });
    } catch (error) {
      this.alertService.error(error);
      this.loading = false;
    }
  }

  async handleImageUpload() {
    if (this.image) {
      const data = new FormData();
      data.append('file', this.image);
      data.append('upload_preset', 'vikings');
      data.append('cloud_name', 'dev-empty');

      const response = await this.http
        .post<any>(environment.CLOUDINARY_URL, data)
        .toPromise();
      this.form.value.imageUrl = response.url;
    }
  }
}

import { Component, OnInit, OnChanges, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { first } from 'rxjs/operators';

import { ReportService, AlertService } from '@app/services';
import { Project, Week, Report } from '@app/models';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit, OnChanges {
  @Input() project: Project;
  @Input() week: Week;
  report: Report;
  form: FormGroup;
  isEditingMode: boolean;
  isSendingReport: boolean;
  loading: boolean = true;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
      hours: ['', [Validators.required, Validators.min(1), Validators.max(45)]],
    });
  }

  ngOnInit(): void {}

  ngOnChanges() {
    this.submitted = false;
    this.isEditingMode = false;
    this.form.reset();

    this.reportService
      .getByProjectWeek(this.project.id, this.week.id)
      .pipe(first())
      .subscribe({
        next: (report) => {
          this.report = report;
          this.form.patchValue(report);
          this.isEditingMode = true;
          this.loading = false;
        },
        error: () => {
          this.form.reset();

          this.isEditingMode = false;
          this.loading = false;
        },
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.isSendingReport = true;

    if (!this.isEditingMode) {
      this.createReport();
    } else {
      this.updateReport();
    }
  }

  private createReport() {
    this.reportService
      .create({
        ...this.form.value,
        project: this.project.id,
        week: this.week.id,
      })
      .pipe(first())
      .subscribe({
        next: (report) => {
          this.report = report;
          this.alertService.success('Report created successfully', {
            keepAfterRouteChange: true,
          });
          this.isSendingReport = false;
          this.isEditingMode = true;
        },
        error: (error) => {
          this.alertService.error(error);
          this.isSendingReport = false;
        },
      });
  }

  private updateReport() {
    this.reportService
      .update(this.report.id, {
        ...this.form.value,
        project: this.project.id,
        week: this.week.id,
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', {
            keepAfterRouteChange: true,
          });
          this.isSendingReport = false;
        },
        error: (error) => {
          this.alertService.error(error);
          this.isSendingReport = false;
        },
      });
  }
}

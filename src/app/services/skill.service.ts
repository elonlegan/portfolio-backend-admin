﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Skill } from '@app/models';

const baseUrl = `${environment.apiUrl}/skills`;

@Injectable({ providedIn: 'root' })
export class SkillService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Skill[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Skill>(`${baseUrl}/${id}`);
  }

  create(params) {
    return this.http.post(baseUrl, params);
  }

  update(id, params) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}

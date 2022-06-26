import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Report } from '@app/models';

const baseUrl = `${environment.apiUrl}/reports`;

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Report[]>(baseUrl);
  }

  getByProjectWeek(projectId: string, weekId: string) {
    return this.http.get<Report>(`${baseUrl}/${projectId}/${weekId}`);
  }

  create(params) {
    return this.http.post<Report>(baseUrl, params);
  }

  update(id, params) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class StudentsService {
	private readonly http = inject(HttpClient);
	private readonly apiUrl = environment.apiUrl;

  getStudents() {
    return this.http.get(`${this.apiUrl}/students`);
  }

  getStudentsByQuery(page: number, items: number) {
    return this.http.get(`${this.apiUrl}/students/query`, {params: { page, items }});
  }
}

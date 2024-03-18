import { Route } from '@angular/router';

export default [
	{
		path: '',
		loadComponent: () => import('./pages.component').then((c) => c.PagesComponent),
	},
	{
		path: 'students',
		loadComponent: () => import('./students/students.component').then((c) => c.StudentsComponent),
	},
] as Route[];

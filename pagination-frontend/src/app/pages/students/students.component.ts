/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewChild,
	inject,
	signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StudentsService } from './students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-students',
	standalone: true,
	imports: [CommonModule, MatTableModule, MatPaginatorModule, MatProgressBarModule],
	templateUrl: './students.component.html',
	styleUrl: './students.component.scss',
	changeDetection: ChangeDetectionStrategy.Default,
})
export class StudentsComponent implements OnInit, AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	private readonly studentsService = inject(StudentsService);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);

	dataSource = new MatTableDataSource<any>([]);

	displayedColumns = ['id', 'name', 'email', 'major', 'gpa'];

	loading = signal(false);

	pageSizes = [10, 20, 30, 40, 50];
	totalData = signal(0);

	students!: any;

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			const page = params['page'] || 1;
			const items = params['items'] || 10;
			this.fetchData(page, items);
		});
	}

	fetchData(page: number, items: number) {
		this.loading.set(true);
		this.studentsService
			.getStudentsByQuery(page, items)
			.pipe(finalize(() => this.loading.set(false)))
			.subscribe((response: any) => {
				console.log(response);
        this.dataSource.data =  response.data;
				this.paginator.pageIndex = response.page - 1;
				this.paginator.pageSize = items;
        this.paginator.length = response.total;
				// this.totalData.set(response.total);
			});
	}

	onPageChange(event: any) {
		const page = event.pageIndex + 1;
		const items = event.pageSize;

		this.fetchData(page, items);

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: { page, items },
			queryParamsHandling: 'merge',
		});
	}

	ngAfterViewInit() {
		// this.dataSource.paginator = this.paginator;
		this.paginator.page.subscribe((event) => this.onPageChange(event));
	}
}

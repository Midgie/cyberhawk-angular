import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ReportService, WindmillReport } from 'src/app/services/report.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  title: string = 'Windmill Report';
  columnHeaders: string[] = [ 'item', 'status' ];

  form: FormControl = new FormControl();
  options: string[] = [ 'Coating Damage', 'Lightning Strike', 'Coating Damage and Lightning Strike' ];
  filterItems: Observable<string[]>;
  
  data: WindmillReport[] = [];
  report: MatTableDataSource<WindmillReport>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private reports: ReportService ) { }

  ngOnInit(): void {
    this.reports.fetch()
      .subscribe( ( data: WindmillReport[] ) => this.data = data );
    this.report = new MatTableDataSource<WindmillReport>( this.data );

    this.report.filterPredicate = (data, filter: string): boolean => {
      return data.item.toString().toLowerCase().includes(filter) 
          || data.report.toString().toLowerCase().includes(filter);
    };

    this.filterItems = this.form.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngAfterViewInit() {
    this.report.paginator = this.paginator;
    this.report.sort = this.sort;
  }

  filter( search: string ): void {
    this.report.filter = search.trim().toLowerCase();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // console.log( this.filterItems );
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}

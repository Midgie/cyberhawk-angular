import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService, WindmillReport } from 'src/app/services/report.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  title: string = 'Windmill Report';
  columnHeaders: string[] = [ 'item', 'status' ];
  report: MatTableDataSource<WindmillReport>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private reports: ReportService ) { }

  ngOnInit(): void {

    this.report = new MatTableDataSource<WindmillReport>( this.reports.fetch() );

    this.report.filterPredicate = (data, filter: string): boolean => {
      return data.item.toString().toLowerCase().includes(filter) 
          || data.report.toString().toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit() {
    this.report.paginator = this.paginator;
    this.report.sort = this.sort;
  }

  filter( search: string ): void {
    this.report.filter = search.trim().toLowerCase();
  }
}

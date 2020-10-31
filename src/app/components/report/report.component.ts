import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService, WindmillReport } from 'src/app/services/report.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  columnHeaders: string[] = [ 'item', 'status' ];
  report: MatTableDataSource<WindmillReport>;

  constructor( private reports: ReportService ) { }

  ngOnInit(): void {

    this.report = new MatTableDataSource<WindmillReport>( this.reports.fetch() );

    this.report.filterPredicate = (data, filter: string): boolean => {
      return data.item.toString().toLowerCase().includes(filter) 
          || data.report.toString().toLowerCase().includes(filter);
    };
  }

  filter( search: string ): void {
    this.report.filter = search.trim().toLowerCase();
  }
}

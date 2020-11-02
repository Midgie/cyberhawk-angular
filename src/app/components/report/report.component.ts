import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ReportService, WindTurbineApiResponse } from 'src/app/services/report.service';

interface WindTurbineTable {
    item: number;
    report: string;
}
@Component( {
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
} )
export class ReportComponent implements OnInit {
    // form title
    title: string = 'Wind Turbine Report';
    // AutoCompleteOptions
    form: FormControl = new FormControl();
    options: string[] = [ 'Coating Damage', 'Lightning Strike', 'Coating Damage and Lightning Strike' ];
    filterItems: Observable<string[]>;
    // Table Data
    columnHeaders: string[] = [ 'item', 'status' ];
    // tableData: WindTurbineTable[] = [];
    tableData: MatTableDataSource<WindTurbineTable>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor( private reports: ReportService ) {}

    ngOnInit(): void {
        // setup the onchange listener for the input box
        this.filterItems = this.form.valueChanges.pipe(
            startWith(''),
            map( value => this._filter( value ) )
       );
    }

    ngAfterViewInit() {
        // fetch the WindTurbine report from the server
        this.reports.fetch()
            .subscribe( ( data: WindTurbineApiResponse[] ) => { 
                this.tableData = new MatTableDataSource<WindTurbineTable>( this._buildTable( data ) );

                this.tableData.filterPredicate = (data, filter: string): boolean => {
                    return data.item.toString().toLowerCase().includes(filter) 
                        || data.report.toString().toLowerCase().includes(filter);
                };
                // setup the sort and paginator
                this.tableData.paginator = this.paginator;
                this.tableData.sort = this.sort;
            } );
    }

    // search based on the predicate
    search( search: string ): void {
        this.tableData.filter = search.trim().toLowerCase();
    }

    // transform our API response into a compatible format for our table
    private _buildTable( data: WindTurbineApiResponse[] ) {
        let table: WindTurbineTable[] = [];
        for( const { item, report } of data ) {
            table.push( { 
                item: item,
                report: report.message
            } );
        }
        return table;
    }

    private _filter( value: string ): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter( option => option.toLowerCase().indexOf( filterValue ) === 0 );
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WindTurbineReport {
    hasCoatingDamage: boolean,
    hasLightningStrike: boolean,
    message: string
}

export interface WindTurbineApiResponse {
    item: number,
    report: WindTurbineReport
}
@Injectable( {
    providedIn: 'root'
} )
export class ReportService {
    reportUrl = 'api/windturbine.php';

    constructor( private http: HttpClient ) { }

    fetch(): Observable<WindTurbineApiResponse[]> {
        return this.http.get<WindTurbineApiResponse[]>( this.reportUrl );
    }
}

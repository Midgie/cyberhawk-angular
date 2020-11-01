import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WindmillReport {
  item: number,
  report: string
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
    reportUrl = 'ajax/reports/windmill.php';
    
    numItems: number = 100;
    COATING_DMG: number = 3;
    LIGHTNING_STRIKE: number = 5;

    constructor( private http: HttpClient ) { }

    checkDamages( i ) {
      let state = i;
      if( !( i % this.COATING_DMG ) ) {
        state = 'Coating Damage';
        if( !( i % this.LIGHTNING_STRIKE ) ) {
                state += ' and Lightning Strike';
            }
        } else if ( !( i % this.LIGHTNING_STRIKE ) ) {
            state = 'Lightning Strike';
        }
        return state;
    }

    fetch(): Observable<WindmillReport[]> {
      // let report: WindmillReport[] = [];
      // for( let i = 1; i <= this.numItems; ++i ) {
      //   report.push( {
      //     item: i,
      //     report: this.checkDamages( i )
      //   } );
      // }
      // return report;
     return this.http.get<WindmillReport[]>( this.reportUrl );
    }
}

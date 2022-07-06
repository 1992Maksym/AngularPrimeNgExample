import { Component, OnInit, } from '@angular/core';
import {map, tap, catchError, finalize} from 'rxjs/operators';
import { HttpService } from './http.service';
import {Observable, of} from "rxjs";
// import {HttpEvent, HttpHandler, , } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  basicData: any;
  heroesName:any = [];
  heroesHeight:any = [];
  color:string = '#1fd219';
  error:string = '';
  loader:boolean = true;

  constructor(private httpService: HttpService) {}

  change(event: any){
    this.color = event.value
    this.basicData.datasets[0].backgroundColor = this.color
    this.basicData = {...this.basicData};
  }

  getData(){
    this.httpService.getHttp().
    pipe(
      map((value: any) => {
        return value['results'].map((el: any) => {
          this.heroesName.push(el.name);
          this.heroesHeight.push(el.height);
        });
      }),
      tap(el => {
        this.basicData = {
          labels: this.heroesName,
          datasets: [
            {
              label: 'Heroes height',
              backgroundColor: this.color,
              data: this.heroesHeight,
            }
          ]
        };
      }),
      catchError(err => {
        this.error = err.message;
        return of("From catchError");

      }),
      finalize(() => this.loader = false)
    ).subscribe()
  }


  ngOnInit() {
    this.getData()
  }

}

import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, tap, } from 'rxjs/operators'
import {ColorPicker} from "primeng/colorpicker";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  basicData: any;
  heroesName:any = [];
  heroesHeight:any = [];
  color:string = '#1fd219'

  constructor(private http: HttpClient) {}

  change(event: any){
    this.color = event.value
    this.basicData.datasets[0].backgroundColor = this.color
    this.basicData = {...this.basicData};
  }

  getData(){
    return this.http.get('https://swapi.dev/api/people').pipe(
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
      })
    ).subscribe()
  }
  ngOnInit() {
    this.getData()
  }

}

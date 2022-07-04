import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, tap, } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  basicData: any;
  heroesName:any = [];
  heroesHeight:any = [];

  constructor(private http: HttpClient) {}
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
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
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

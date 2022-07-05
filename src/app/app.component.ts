import { Component, OnInit, } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, tap, catchError } from 'rxjs/operators'
import { HttpService } from './http.service'

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
    ).subscribe()

  }
  ngOnInit() {
    this.getData()

  }

}

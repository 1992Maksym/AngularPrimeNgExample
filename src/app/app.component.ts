import { Component, OnInit, } from '@angular/core';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import { HttpService } from './http.service';
import { of } from "rxjs";
import { MessageService } from 'primeng/api';

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
  loader:boolean = false;

  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
  ) {}

  change(event: any){
    this.color = event.value
    this.basicData.datasets[0].backgroundColor = this.color
    this.basicData = {...this.basicData};
  }

  getData(){
    this.loader = true;
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
        this.showError()
        return of("From catchError");

      }),
      finalize(() => this.loader = false)
    ).subscribe()
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.error});
  }
  clear() {
    this.messageService.clear();
  }
  ngOnInit() {}

}

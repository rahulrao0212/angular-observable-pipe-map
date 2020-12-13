import { Component, ElementRef, ViewChild } from '@angular/core';
import { from, fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-observable-pipe-map';

  constructor(private http: HttpClient,
    private keyValue: KeyValuePipe) {
  }

  srcArray = from([1, 2, 3, 4]);
  srcName$ = from(['John', 'Tom', 'Katy'])
  srcObject = from([
    { fName: 'Sachin', lName: "Tendulkar" },
    { fName: 'Rahul', lName: "Dravid" },
    { fName: 'Saurav', lName: "Ganguly" },
  ]);
  @ViewChild('btn1', { static: true }) button1: ElementRef;

  ngOnInit() {
    this.multiplyBy2();
    console.log('-----------------------');
    this.toUpperCase();
    console.log('-----------------------');
    this.mapToSingleProperty();
    console.log('-----------------------');
    this.mulitpleMaps();
    console.log('-----------------------');
  }

  multiplyBy2() {
    this.srcArray
      .pipe(map((val, i) => {         //index
        console.log('index- ', i)                //0
        return val * 2;
      }))
      .subscribe(val => { console.log(val) })
  }

  toUpperCase() {
    this.srcName$
      .pipe(map(data => {
        return data.toUpperCase();
      }))
      .subscribe(data => console.log(data))
  }

  mapToSingleProperty() {
    this.srcObject
      .pipe(map(data => { return data.fName + ' ' + data.lName }))
      .subscribe(data => { console.log(data) })
  }

  mulitpleMaps() {
    this.srcArray
    .pipe(
      map(val => {
        return val + 10;
      }),
      map((val, i) => {
        return val * 2;
      }))
    .subscribe(val => { console.log(val) })
  }

  //Form event
  ngAfterViewInit() {
    this.buttonClick();
  }

  buttonClick() {
    fromEvent(this.button1.nativeElement, 'click')
      .pipe(map(ev => (ev as any).clientX))
      .subscribe(res => console.log(res));
    console.log('-----------------------');
  }

  //http
  $dogsBreed(): Observable<any> {
    return this.http.get<any>("https://dog.ceo/api/breeds/list/all")
  }

  getDogsBreed() {

    this.$dogsBreed()
      .pipe(map(data => {
        var dogs = this.keyValue.transform(data.message)
        console.log(dogs)
        console.log('-----------------------');
      }))
      .subscribe();

  }

}

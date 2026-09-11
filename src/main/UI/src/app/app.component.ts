import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public submitted!: boolean;
  roomsearch!: FormGroup;
  rooms!: Room[];
  request!: ReserveRoomRequest;
  currentCheckInVal!: string;
  currentCheckOutVal!: string;
  welcomeMessageEnglish: string = '';
  welcomeMessageFrench: string = '';
  presentationMessage: string = '';

  private baseURL: string = 'http://localhost:8080';
  private getUrl: string = this.baseURL + '/room/reservation/v1/';
  private postUrl: string = this.baseURL + '/room/reservation/v1';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.roomsearch = new FormGroup({
      checkin: new FormControl(' '),
      checkout: new FormControl(' ')
    });

    const roomsearchValueChanges$ = this.roomsearch.valueChanges;

    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });

    this.httpClient.get<string[]>(this.baseURL + '/api/welcome').subscribe(data => {
      if (data && data.length === 2) {
        this.welcomeMessageEnglish = data[0];
        this.welcomeMessageFrench = data[1];
      }
    });

    this.httpClient.get(this.baseURL + '/api/presentation', {responseType: 'text'}).subscribe(data => {
      this.presentationMessage = data;
    });
  }

  onSubmit({value, valid}: {value: Roomsearch, valid: boolean}) {
    this.getAll().subscribe(
      rooms => {
        this.rooms = <Room[]>Object.values(rooms)[0];
      }
    );
  }

  reserveRoom(value: string) {
    this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);
    this.createReservation(this.request);
  }

  createReservation(body: ReserveRoomRequest) {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({'Content-Type': 'application/json'});

    const options = {
      headers: new HttpHeaders().append('key', 'value'),
    };

    this.httpClient.post(this.postUrl, body, options).subscribe();
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin=' + this.currentCheckInVal + '&checkout=' + this.currentCheckOutVal, {responseType: 'json'});
  }
}

export interface Roomsearch {
  checkin: string;
  checkout: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  price: string;
  links: string;
}

export class ReserveRoomRequest {
  roomId: string;
  checkin: string;
  checkout: string;

  constructor(roomId: string, checkin: string, checkout: string) {
    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'
    );
  }
}

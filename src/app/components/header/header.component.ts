import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/currency';
import { HttpService } from './http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [HttpService],
})
export class HeaderComponent implements OnInit {
  currencyEUR: Currency | undefined;
  currencyUSD: Currency | undefined;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getCurrency('EUR').subscribe((data: any) => {
      this.currencyEUR = new Currency(
        data[0].r030,
        data[0].txt,
        data[0].rate,
        data[0].cc,
        data[0].exchangedate
      );
    });

    this.httpService.getCurrency('USD').subscribe((data: any) => {
      this.currencyUSD = new Currency(
        data[0].r030,
        data[0].txt,
        data[0].rate,
        data[0].cc,
        data[0].exchangedate
      );
    });
  }
}

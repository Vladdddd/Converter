import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/currency';
import { VariantsEnum } from 'src/app/models/app-enums';
import { HttpService } from './http.service';

@Component({
  selector: 'app-convertation',
  templateUrl: './convertation.component.html',
  styleUrls: ['./convertation.component.scss'],
  providers: [HttpService],
})
export class ConvertationComponent implements OnInit {
  public Variants = VariantsEnum;

  currency: Currency[] = [];

  firstCurrencyValue = 1;
  secondCurrencyValue = 1;

  cachedFirstCurrency = 'USD';
  cachedSecondCurrency = 'EUR';

  firstCurrency = 'USD';
  secondCurrency = 'EUR';

  isFirstUpdate = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getData().subscribe((data: any) => (this.currency = data));
  }

  ngDoCheck() {
    if (!this.isFirstUpdate && this.currency.length) {
      this.calculateCurrencyValues(1, this.Variants.firstCurrency);
      this.isFirstUpdate = true;
    }
    if (
      this.cachedFirstCurrency !== this.firstCurrency ||
      this.cachedSecondCurrency !== this.secondCurrency
    ) {
      this.calculateCurrencyValues(
        this.firstCurrencyValue,
        this.Variants.firstCurrency
      );
      this.cachedFirstCurrency = this.firstCurrency;
      this.cachedSecondCurrency = this.secondCurrency;
    }
  }

  onInputFirstValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.firstCurrencyValue = +target.value;
    this.calculateCurrencyValues(+target.value, this.Variants.firstCurrency);
  }

  onInputSecondValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.secondCurrencyValue = +target.value;
    this.calculateCurrencyValues(+target.value, this.Variants.secondCurrency);
  }

  calculateCurrencyValues(value: number, variant: VariantsEnum) {
    if (this.firstCurrency === this.secondCurrency) {
      {
        variant === this.Variants.firstCurrency
          ? (this.secondCurrencyValue = this.firstCurrencyValue)
          : (this.firstCurrencyValue = this.secondCurrencyValue);
      }
      return;
    }

    let first: number = 0;
    let second: number = 0;

    this.currency.forEach((e) => {
      if (e.cc === this.firstCurrency) {
        first = this.toFixed(e.rate);
      }
      if (e.cc === this.secondCurrency) {
        second = this.toFixed(e.rate);
      }
    });

    if (first && second) {
      variant === this.Variants.firstCurrency
        ? (this.secondCurrencyValue = this.toFixed((first * value) / second))
        : (this.firstCurrencyValue = this.toFixed((second * value) / first));
    }
  }

  onChangeFirstCurrency(event: Event) {
    const target = event.target as HTMLInputElement;
    this.cachedFirstCurrency = this.firstCurrency;
    this.firstCurrency = target.value;
  }

  onChangeSecondCurrency(event: Event) {
    const target = event.target as HTMLInputElement;
    this.cachedSecondCurrency = this.secondCurrency;
    this.secondCurrency = target.value;
  }

  toFixed(number: number) {
    if (number > 0.0001) return +number.toFixed(4);
    else return number;
  }
}

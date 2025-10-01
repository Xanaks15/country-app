import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
  styles: ``
})
export class CountryListComponent {

  countries = input.required<Country[]>();
}

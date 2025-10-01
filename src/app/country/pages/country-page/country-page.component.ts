import { CountryService } from './../../services/country.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  CountryService = inject(CountryService)

  countryResource = rxResource({
    request: () => ({code: this.countryCode}),
    loader: ({request}) => {
      return this.CountryService.searchCountryByAlphaCode(request.code)
    }
  })
}

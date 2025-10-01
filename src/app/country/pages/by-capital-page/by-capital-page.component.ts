import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';

import { CountryService } from './../../services/country.service';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  CountryService = inject(CountryService)
  query = signal('');

  countryResource = rxResource({
      request: () => ({ query: this.query() }),
      loader: ( { request }) => {
        if( !request.query) return of([]);

        return this.CountryService.searchByCapital(request.query)
      },
  });
  // countryResource = resource({
  //     request: () => ({ query: this.query() }),
  //     loader: async( { request }) => {

  //       if( !request.query) return [];

  //       return await firstValueFrom(
  //         this.CountryService.searchByCapital(request.query)
  //       )
  //     }
  // })

  // isLoading = signal(false)
  // isError = signal<string|null>(null)
  // countries = signal<Country[]>([])


  // onSearch( query: string){

  //   if(this.isLoading()) return;

  //   this.isLoading.set(true)
  //   this.isError.set(null);

  //   this.CountryService.searchByCapital(query).subscribe ({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false)
  //         this.countries.set([])
  //         this.isError.set(err)
  //       },
  //     })
  // }
}

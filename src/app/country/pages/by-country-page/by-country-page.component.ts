import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent,CountryListComponent],
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  CountryService = inject(CountryService)

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  
  query = linkedSignal(()=>this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ( { request }) => {
      if( !request.query) return of([]);
        this.router.navigate(['/country/by-capital'],{
          queryParams: {
            query: request.query,
          }
        })
      return this.CountryService.searchByCountry(request.query);
    },
  });

  // countryResource = resource({
  //     request: () => ({ query: this.query() }),
  //     loader: async( { request }) => {

  //       if( !request.query) return [];

  //       return await firstValueFrom(
  //         this.CountryService.searchByCountry(request.query)
  //       )
  //     }
  // })
}

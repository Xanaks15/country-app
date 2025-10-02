import { Region } from './../../interfaces/country.interface';
import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  CountryService = inject(CountryService)

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ]
  
  selectedRegion = signal<Region | null>(null)
  
  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ( { request }) => {
      if( !request.region) return of([]);

      return this.CountryService.searchByRegion(request.region);
    },
  });

  // selectRegion(region: Region) {
  //   this.selectedRegion.set(region)
  // }
}

import { ActivatedRoute, Router } from '@angular/router';
import { Region } from './../../interfaces/country.interface';
import { Component, inject, input, linkedSignal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';


function validateQueryParam( queryParam: string): Region{

  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string, Region>={
    'africa':'Africa',
    'americas':'Americas',
    'asia':'Asia',
    'europe':'Europe',
    'oceania':'Oceania',
    'antarctic':'Antarctic'
  };

  return validRegions[queryParam] ?? 'Americas'
}
@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  CountryService = inject(CountryService)
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ]

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  
  selectedRegion = linkedSignal<Region>(() => 
    validateQueryParam(this.queryParam)  
  );
  
  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ( { request }) => {
      if( !request.region) return of([]);
        this.router.navigate(['/country/by-region'],{
          queryParams: {region: request.region}
        });
      return this.CountryService.searchByRegion(request.region);
    },
  });

  // selectRegion(region: Region) {
  //   this.selectedRegion.set(region)
  // }
}

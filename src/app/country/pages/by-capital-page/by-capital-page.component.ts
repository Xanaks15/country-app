import { CountryService } from './../../services/country.service';
import { Component, inject } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  CountryService = inject(CountryService)

  onSearch( query: string){
    this.CountryService.searchByCapital(query)
      .subscribe ( resp => {
        console.log(resp);
      })
  }
}

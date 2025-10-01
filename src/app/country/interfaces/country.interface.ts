import { Languages } from './rest-countries.interface';
export interface Country{
    cca2: string;
    flag: string;
    flagSvg: string;
    name: string;
    capital: string;
    population: number;
    region: string;
    subregion: string;
    borders: string[];
    area: number;
    // timezones: string[];
}
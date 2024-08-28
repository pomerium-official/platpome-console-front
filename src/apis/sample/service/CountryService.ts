import axios from 'axios';

export interface CountryData {
  name: string;
  code: string;
}

export class CountryService {
  getCountries() {
    return axios
      .get<{ data: CountryData[] }>('/assets/sample/data/countries.json')
      .then((res) => res.data.data);
  }
}

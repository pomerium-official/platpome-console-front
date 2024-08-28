import axios from 'axios';

export interface Photo {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}

export class PhotoService {
  getImages() {
    return axios
      .get<{ data: Photo[] }>('/assets/sample/data/photos.json')
      .then((res) => res.data.data);
  }
}

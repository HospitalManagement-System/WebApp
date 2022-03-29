export interface PeriodicElement {
  imageUrl: string;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export class EventMap {
  // public id: string,
  constructor(
    public publicId: string,
    public title: string,
    public date: string,
    public color: string
  ) {}
}

export interface IReadPoint {
  id: number;
  type: string;
  title: string;
  description: string;
  coordinates: number[];
}

export class ReadPoint implements IReadPoint {
  id: number;
  type: string;
  title: string;
  description: string;
  coordinates: number[];

  public constructor() {}
}

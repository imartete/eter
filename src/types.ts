export interface meterData {
  id: number;
  number: number;
  previous: number | string;
  current: number | string;
}

export interface meterCalculatedData {
  id: number;
  number: number;
  bill: number;
}

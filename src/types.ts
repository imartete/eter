export interface meterData {
  id: number;
  previous: number | string;
  current: number | string;
}

export interface meterCalculatedData {
  id: number;
  bill: number;
}

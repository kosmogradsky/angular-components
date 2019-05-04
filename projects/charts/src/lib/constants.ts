export enum Statistics {
  CostRUB = 'cost_rub',
  CostRUBPercent = 'cost_rub_per',
  YOY = 'yoy_per',
  Quantity = 'quantity',
  Volume = 'volume',
  VolumePercent = 'volume_per'
}

export enum Detalizations {
  Day = 'day',
  Week = 'week',
  Month = 'month',
}

export enum ValueType {
  Absolute = 'absolute',
  Relative = 'relative'
}

export const STATISTIC_TITLES = {
  [Statistics.CostRUB]: 'Cost RUB',
  [Statistics.CostRUBPercent]: 'Cost RUB, %',
  [Statistics.Quantity]: 'Quantity',
  [Statistics.YOY]: 'Y-O-Y, %',
  [Statistics.Volume]: 'Volume',
  [Statistics.VolumePercent]: 'Volume, %'
};

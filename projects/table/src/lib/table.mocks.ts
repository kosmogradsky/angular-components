import { randomBetween } from 'utils';

export const rows = () => [
  { title: 'BMW', url: '/bmw' },
  { title: 'Nissan', url: '/nissan' },
  { title: 'Opel', url: '/opel' },
  { title: 'Dodge', url: '/dodge' },
  { title: 'Jeep', url: '/jeep' },
  { title: 'Tata Motor', url: '/tata' },
  { title: 'Chrysler', url: '/chrysler' },
  { title: 'Pagani', url: '/pagani' },
  { title: 'Alfa Romeo', url: '/alfa' },
  { title: 'Volkswagen', url: '/volkswagen' },
].map(link => ({
  brandTitle: link.title,
  brandUrl: link.url,
  costRub: randomBetween(100000000, 495712200),
  costRubPercent: randomBetween(1, 99.9),
  yoy: Math.round(randomBetween(10, 200)),
  quantity: randomBetween(1000, 99999),
  volume: randomBetween(100000, 999999),
  volumePercent: randomBetween(1, 99.9),
  inaccurate: [
    'costRub',
    'costRubPercent',
    'yoy',
    'quantity',
    'volume',
    'volumePercent',
  ].filter(() => Math.random() > 0.85),
}));

export const sortColumns = [
  {
    title: 'Cost RUB',
    field: 'costRub',
    initial: true,
  },
  {
    title: 'Cost RUB, %',
    field: 'costRubPercent',
  },
  {
    title: 'Y-O-Y, %',
    field: 'yoy',
  },
  {
    title: 'Quantity',
    field: 'quantity',
  },
  {
    title: 'Volume',
    field: 'volume',
  },
  {
    title: 'Volume %',
    field: 'volumePercent',
  },
];

export const diagramSortColumns = [
  {
    title: 'Cost RUB',
    field: 'costRub',
  },
  {
    title: 'Cost RUB, %',
    field: 'costRubPercent',
  },
  {
    title: 'Y-O-Y, %',
    field: 'yoy',
  },
  {
    title: 'Quantity',
    field: 'quantity',
  },
  {
    title: 'Volume',
    field: 'volume',
  },
  {
    title: 'Volume %',
    field: 'volumePercent',
  },
];

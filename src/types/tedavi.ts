import { OdemeBilgileri } from './payment'

export interface TedaviListItem {
  id: number;
  tarih: string;
  hastane: string;
  tur: string;
  doktor: string;
}

export interface TedaviDetay {
  id: number;
  ad: string;
  tarih: string;
  saat: string;
  hastane: string;
  klinik: string;
  doktor: string;
  odemeBilgileri: OdemeBilgileri;
  sonuc: string;
  notlar?: string;
  raporUrl?: string;
}

// Legacy type alias
export type Tedavi = TedaviListItem;


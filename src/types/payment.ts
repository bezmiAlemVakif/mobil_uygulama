export interface OdemeBilgileri {
  toplamTutar: number;
  indirimOrani: number; // 0-100
  indirimTutari: number;
  kartIleOdenen: number;
  odemeYontemi: string; // 'Bezmialem Vakıf Kart'
  odemeTarihi?: Date;
}

export interface FaturaBilgileri {
  faturaNo: string;
  faturaTarihi: Date;
  kdvOrani: number;
  kdvTutari: number;
  genelToplam: number;
}

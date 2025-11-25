export interface Indirim {
  tur: string;
  oran: number;
}

export interface User {
  ad: string;
  soyad: string;
  tcKimlik: string;
  kartNo: string;
  durum: 'Aktif' | 'Pasif';
  telefon?: string;
  eposta?: string;
  indirimler?: Indirim[];
}

export interface KullaniciProfil {
  id: number;
  adSoyad: string;
  tcKimlik: string;
  telefon: string;
  eposta: string;
  kartNumarasi: string;
  kartDurumu: 'aktif' | 'pasif';
  sonKullanma: string; // MM/YYYY
  uyelikTarihi: string; // DD Month YYYY
  toplamTedavi: number;
  buAyTedavi: number;
}

export interface LoginForm {
  tcKimlik: string;
  sifre: string;
}

export interface LoginError {
  show: boolean;
  message: string;
}


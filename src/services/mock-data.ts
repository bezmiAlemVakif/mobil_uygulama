import type { Tedavi } from '../types/tedavi'
import type { KullaniciProfil } from '../types/user'

export const mockProfil: KullaniciProfil = {
  id: 1,
  adSoyad: 'AHMET YILMAZ',
  tcKimlik: '12345678901',
  telefon: '+90 (532) 000 00 00',
  eposta: 'ahmet.yilmaz@example.com',
  kartNumarasi: '**** 1234',
  kartDurumu: 'aktif',
  sonKullanma: '12/2027',
  uyelikTarihi: '15 Ocak 2024',
  toplamTedavi: 5,
  buAyTedavi: 3
}

export const mockTedaviler: Tedavi[] = [
  {
    id: 1,
    ad: 'Kardiyoloji Kontrolü',
    tarih: '12 Kasım 2025',
    saat: '14:30',
    hastane: 'Bezmialem Vakıf Üniversitesi Hastanesi',
    klinik: 'Kardiyoloji Kliniği',
    doktor: 'Prof. Dr. Mehmet Öztürk',
    odemeBilgileri: { toplamTutar: 2500, indirimOrani: 40, indirimTutari: 1000, kartIleOdenen: 1500, odemeYontemi: 'Bezmialem Vakıf Kart' },
    sonuc: 'Kontrol muayenesi sonuçları normal sınırlardadır...',
    notlar: 'Tansiyonunuzu düzenli ölçmeye devam ediniz.',
    raporUrl: '/reports/tedavi-1.pdf',
    durum: 'tamamlandi'
  }
]

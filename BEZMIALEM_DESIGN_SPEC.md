# Bezmialem Vakıf Kart Mobil Uygulama - Tasarım ve Geliştirme Kılavuzu
## React + Ionic + TypeScript

## 🎨 Tasarım Sistemi

### Renk Paleti

```css
/* Ana Renkler */
--primary-gold: #C8A850;        /* Altın vurgu rengi - Butonlar, ikonlar, aktif durumlar */
--primary-gold-hover: #B89740;  /* Altın hover durumu */
--primary-gold-light: #C8A85014; /* %8 opacity - Arka plan vurguları için */

/* Nötr Renkler (Minimalist Tema) */
--background-white: #FFFFFF;     /* Ana arka plan */
--background-off-white: #FAFAFA; /* Alternatif arka plan */
--text-black: #000000;           /* Ana başlıklar */
--text-dark-gray: #1F1F1F;       /* Normal metinler */
--text-gray: #6B7280;            /* İkincil metinler */
--text-light-gray: #9CA3AF;      /* Yardımcı metinler */

/* Kart ve Çerçeveler */
--card-background: #FFFFFF;
--card-dark: #1F2937;            /* Kullanıcı bilgi kartı için koyu arka plan */
--border-gray: #E5E7EB;          /* İnce çizgiler ve ayırıcılar */
--border-gold: #C8A850;          /* Vurgu çerçeveleri */

/* Durum Renkleri */
--success-green: #10B981;        /* Başarılı işlemler */
--error-red: #EF4444;            /* Hata mesajları */
--warning-yellow: #F59E0B;       /* Uyarılar */
--info-blue: #3B82F6;            /* Bilgilendirme */
```

### Tipografi

```css
/* Font Family */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* Font Boyutları */
--text-xs: 12px;      /* Küçük yardımcı metinler */
--text-sm: 14px;      /* Yardımcı metinler, etiketler */
--text-base: 16px;    /* Normal gövde metinleri */
--text-lg: 18px;      /* Alt başlıklar */
--text-xl: 20px;      /* Başlıklar */
--text-2xl: 24px;     /* Ana başlıklar */
--text-3xl: 30px;     /* Büyük başlıklar */

/* Font Ağırlıkları */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing ve Border Radius

```css
/* Spacing (Padding & Margin) */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;

/* Border Radius */
--radius-sm: 8px;    /* Küçük kartlar, butonlar */
--radius-md: 12px;   /* Orta kartlar */
--radius-lg: 16px;   /* Büyük kartlar */
--radius-full: 9999px; /* Yuvarlak elemanlar (avatar, badge) */
```

---

## 📱 Sayfa Yapıları ve Bileşenler

### 1. Giriş Sayfası (LoginPage.tsx)

#### Görsel Yapı
```
┌─────────────────────────────────┐
│                                 │
│    [BEZMIALEM LOGO - 120px]     │
│                                 │
│     BEZMİALEM VAKIF KART       │
│                                 │
│  ┌─────────────────────────┐   │
│  │ T.C. Kimlik No          │   │
│  │ [___________________]    │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Şifre                    │   │
│  │ [___________________]    │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │    Giriş Yap (Altın)    │   │
│  └─────────────────────────┘   │
│                                 │
│      Şifremi Unuttum           │
│                                 │
└─────────────────────────────────┘
```

#### Ionic React Bileşenleri
```tsx
import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonText,
  IonToast,
  IonImg
} from '@ionic/react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [tcKimlik, setTcKimlik] = useState('');
  const [sifre, setSifre] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tcKimlik || !sifre) {
      setErrorMessage('Lütfen tüm alanları doldurunuz.');
      setShowError(true);
      return;
    }

    if (tcKimlik.length !== 11) {
      setErrorMessage('T.C. Kimlik No 11 haneli olmalıdır.');
      setShowError(true);
      return;
    }

    // Mock login - gerçek uygulamada API çağrısı yapılır
    onLogin();
  };

  return (
    <IonPage>
      <IonContent className="ion-padding login-page">
        <div className="login-container">
          {/* Logo */}
          <div className="logo-container">
            <IonImg 
              src="/assets/logo-bezmialem.png" 
              alt="Bezmialem Vakıf Üniversitesi" 
              className="logo"
            />
          </div>

          {/* Başlık */}
          <IonText>
            <h1 className="title">BEZMİALEM VAKIF KART</h1>
          </IonText>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <IonInput
              label="T.C. Kimlik No"
              labelPlacement="stacked"
              type="text"
              maxlength={11}
              value={tcKimlik}
              onIonInput={(e) => setTcKimlik(e.detail.value?.replace(/\D/g, '') || '')}
              fill="outline"
              className="custom-input"
            />

            <IonInput
              label="Şifre"
              labelPlacement="stacked"
              type="password"
              value={sifre}
              onIonInput={(e) => setSifre(e.detail.value || '')}
              fill="outline"
              className="custom-input"
            />

            <IonButton 
              expand="block" 
              type="submit"
              className="login-button"
            >
              Giriş Yap
            </IonButton>

            <IonText>
              <p className="forgot-password">Şifremi Unuttum</p>
            </IonText>
          </form>

          {/* Error Toast */}
          <IonToast
            isOpen={showError}
            onDidDismiss={() => setShowError(false)}
            message={errorMessage}
            duration={3000}
            color="danger"
            position="top"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
```

#### Özel Stiller (LoginPage.css)
```css
.login-page {
  --background: #FFFFFF;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}

.logo-container {
  text-align: center;
  margin-bottom: 24px;
}

.logo {
  width: 120px;
  height: auto;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  text-align: center;
  margin-bottom: 48px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.custom-input {
  --border-color: #E5E7EB;
  --border-radius: 8px;
  --padding-start: 16px;
  --padding-end: 16px;
  --highlight-color: #C8A850;
}

.login-button {
  --background: #C8A850;
  --background-hover: #B89740;
  --background-activated: #B89740;
  --border-radius: 8px;
  --padding-top: 14px;
  --padding-bottom: 14px;
  margin-top: 8px;
}

.forgot-password {
  color: #C8A850;
  font-size: 14px;
  text-align: center;
  margin-top: 16px;
  cursor: pointer;
}

.forgot-password:hover {
  text-decoration: underline;
}
```

#### TypeScript Interface
```typescript
interface LoginForm {
  tcKimlik: string;
  sifre: string;
}

interface LoginError {
  show: boolean;
  message: string;
}
```

---

### 2. Ana Sayfa - Dashboard (DashboardPage.tsx)

#### Görsel Yapı
```
┌────────────────────���────────────┐
│ Bezmialem Vakıf Kart    [👤]   │ ← Header
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ ● Kart Sahibi           │   │ ← Kullanıcı Kartı (Koyu)
│  │ AHMET YILMAZ            │   │
│  │ Kart No: **** 1234      │   │
│  │ [Aktif Badge - Altın]   │   │
│  └─────────────────────────┘   │
│                                 │
│  Hızlı Erişim                   │
│  ┌──────────┐  ┌──────────┐   │
│  │  [📋]    │  │  [💬]    │   │ ← 3 Kart (Randevu kaldırıldı)
│  │ Geçmiş   │  │ Destek   │   │
│  │ Tedaviler│  │          │   │
│  └──────────┘  └──────────┘   │
│  ┌──────────┐                  │
│  │  [📞]    │                  │
│  │ İletişim │                  │
│  └──────────┘                  │
│                                 │
│  Duyurular                      │
│  ┌─────────────────────────┐   │
│  │ 15 Kasım 2025           │   │
│  │ Yeni online randevu...  │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [📋] [💬] [📞] [👤]       │ ← Tab Bar
└─────────────────────────────────┘
```

#### Ionic React Component
```tsx
import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText
} from '@ionic/react';
import { 
  clipboardOutline, 
  chatbubblesOutline, 
  callOutline,
  personCircleOutline 
} from 'ionicons/icons';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bezmialem Vakıf Kart</IonTitle>
          <IonAvatar slot="end" className="header-avatar">
            <div className="avatar-placeholder">AY</div>
          </IonAvatar>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding dashboard-page">
        {/* Kullanıcı Bilgi Kartı */}
        <IonCard className="user-card">
          <div className="status-dot"></div>
          <IonCardContent>
            <IonText color="medium">
              <p className="card-label">Kart Sahibi</p>
            </IonText>
            <h2 className="card-name">AHMET YILMAZ</h2>
            <IonText>
              <p className="card-number">Kart No: **** **** **** 1234</p>
            </IonText>
            <IonBadge className="status-badge">Aktif</IonBadge>
          </IonCardContent>
        </IonCard>

        {/* Hızlı Erişim */}
        <div className="section">
          <IonText>
            <h3 className="section-title">Hızlı Erişim</h3>
          </IonText>
          
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <QuickAccessCard
                  icon={clipboardOutline}
                  title="Geçmiş Tedavilerim"
                  onClick={() => onNavigate('tedaviler')}
                />
              </IonCol>
              <IonCol size="6">
                <QuickAccessCard
                  icon={chatbubblesOutline}
                  title="Destek"
                  onClick={() => onNavigate('destek')}
                />
              </IonCol>
              <IonCol size="6">
                <QuickAccessCard
                  icon={callOutline}
                  title="İletişim"
                  onClick={() => onNavigate('iletisim')}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Duyurular */}
        <div className="section">
          <IonText>
            <h3 className="section-title">Duyurular</h3>
          </IonText>
          
          <IonCard className="announcement-card">
            <IonCardContent>
              <IonText color="medium">
                <p className="announcement-date">15 Kasım 2025</p>
              </IonText>
              <p className="announcement-text">Yeni online randevu sistemi aktif edildi</p>
            </IonCardContent>
          </IonCard>

          <IonCard className="announcement-card">
            <IonCardContent>
              <IonText color="medium">
                <p className="announcement-date">10 Kasım 2025</p>
              </IonText>
              <p className="announcement-text">Hafta sonu poliklinik çalışma saatleri güncellendi</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

// Quick Access Card Component
interface QuickAccessCardProps {
  icon: string;
  title: string;
  onClick: () => void;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ icon, title, onClick }) => {
  return (
    <IonCard className="quick-access-card" onClick={onClick} button>
      <IonCardContent className="card-content-center">
        <IonIcon icon={icon} className="quick-access-icon" />
        <IonText>
          <p className="quick-access-title">{title}</p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default DashboardPage;
```

#### Dashboard Stiller (DashboardPage.css)
```css
.dashboard-page {
  --background: #FFFFFF;
}

.header-avatar {
  width: 40px;
  height: 40px;
  margin-right: 16px;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #C8A850;
  color: white;
  font-size: 16px;
  font-weight: 600;
}

/* Kullanıcı Bilgi Kartı */
.user-card {
  background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
  border-radius: 16px;
  color: white;
  margin: 16px 0;
  position: relative;
}

.user-card .status-dot {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 12px;
  height: 12px;
  background: #C8A850;
  border-radius: 50%;
}

.user-card .card-label {
  color: #9CA3AF;
  font-size: 14px;
  margin-bottom: 8px;
}

.user-card .card-name {
  font-size: 24px;
  font-weight: 700;
  margin: 8px 0;
  color: white;
}

.user-card .card-number {
  color: #D1D5DB;
  font-size: 14px;
  margin-bottom: 12px;
}

.user-card .status-badge {
  --background: #C8A850;
  --color: white;
  --padding-start: 12px;
  --padding-end: 12px;
}

/* Sections */
.section {
  margin: 24px 0;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 16px;
}

/* Hızlı Erişim Kartları */
.quick-access-card {
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0;
}

.quick-access-card:hover {
  border-color: #C8A850;
  transform: translateY(-2px);
}

.card-content-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 16px;
}

.quick-access-icon {
  font-size: 32px;
  color: #C8A850;
  margin-bottom: 12px;
}

.quick-access-title {
  font-size: 14px;
  color: #000000;
  margin: 0;
}

/* Duyurular */
.announcement-card {
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  margin-bottom: 12px;
}

.announcement-date {
  font-size: 14px;
  margin-bottom: 4px;
}

.announcement-text {
  font-size: 16px;
  color: #000000;
  margin: 0;
}
```

---

### 3. Geçmiş Tedaviler Listesi (TedavilerPage.tsx)

#### Görsel Yapı
```
┌─────────────────────────────────┐
│ Geçmiş Tedavilerim              │ ← Header
├─────────────────────────────────┤
│                                 │
│  12 Kasım 2025                  │
│  Bezmialem V.Ü. Hastanesi      │
│            Kardiyoloji Kontrolü >│
│  ─────────────────────────────  │
│  5 Kasım 2025                   │
│  Bezmialem V.Ü. Hastanesi      │
│            Göz Muayenesi        >│
│  ─────────────────────────────  │
│  28 Ekim 2025                   │
│  Bezmialem Fatih Hastanesi     │
│            Dahiliye Muayenesi   >│
│                                 │
└─────────────────────────────────┘
│ [🏠] [📋] [💬] [📞] [👤]       │
└─────────────────────────────────┘
```

#### Ionic React Component
```tsx
import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText
} from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';

interface Tedavi {
  id: number;
  tarih: string;
  hastane: string;
  tur: string;
  doktor: string;
}

const tedaviler: Tedavi[] = [
  {
    id: 1,
    tarih: '12 Kasım 2025',
    hastane: 'Bezmialem Vakıf Üniversitesi Hastanesi',
    tur: 'Kardiyoloji Kontrolü',
    doktor: 'Prof. Dr. Mehmet Öztürk',
  },
  {
    id: 2,
    tarih: '5 Kasım 2025',
    hastane: 'Bezmialem Vakıf Üniversitesi Hastanesi',
    tur: 'Göz Muayenesi',
    doktor: 'Doç. Dr. Ayşe Demir',
  },
  {
    id: 3,
    tarih: '28 Ekim 2025',
    hastane: 'Bezmialem Fatih Hastanesi',
    tur: 'Dahiliye Muayenesi',
    doktor: 'Uzm. Dr. Ali Kaya',
  },
];

interface TedavilerPageProps {
  onTedaviClick: (id: number) => void;
}

const TedavilerPage: React.FC<TedavilerPageProps> = ({ onTedaviClick }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Geçmiş Tedavilerim</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="tedaviler-page">
        {tedaviler.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <IonIcon icon={chevronForwardOutline} />
            </div>
            <IonText>
              <p className="empty-text">
                Henüz tamamlanmış bir tedaviniz bulunmamaktadır.
              </p>
            </IonText>
          </div>
        ) : (
          <IonList lines="full" className="tedavi-list">
            {tedaviler.map((tedavi) => (
              <IonItem
                key={tedavi.id}
                button
                onClick={() => onTedaviClick(tedavi.id)}
                className="tedavi-item"
              >
                <IonLabel>
                  <div className="tedavi-item-content">
                    <div className="item-left">
                      <h3 className="tedavi-date">{tedavi.tarih}</h3>
                      <IonText color="medium">
                        <p className="tedavi-hospital">{tedavi.hastane}</p>
                      </IonText>
                    </div>
                    <div className="item-right">
                      <IonText>
                        <p className="tedavi-type">{tedavi.tur}</p>
                      </IonText>
                      <IonIcon icon={chevronForwardOutline} />
                    </div>
                  </div>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TedavilerPage;
```

#### Tedaviler Stiller (TedavilerPage.css)
```css
.tedaviler-page {
  --background: #FFFFFF;
}

.tedavi-list {
  padding: 0;
}

.tedavi-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --inner-padding-end: 0;
  cursor: pointer;
}

.tedavi-item:hover {
  --background: #FAFAFA;
}

.tedavi-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 0;
}

.item-left {
  flex: 1;
}

.tedavi-date {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin: 0 0 4px 0;
}

.tedavi-hospital {
  font-size: 14px;
  color: #6B7280;
  margin: 0;
}

.item-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tedavi-type {
  font-size: 14px;
  color: #1F1F1F;
  margin: 0;
}

.item-right ion-icon {
  color: #9CA3AF;
  font-size: 20px;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  min-height: 400px;
}

.empty-icon {
  width: 96px;
  height: 96px;
  background: #F3F4F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.empty-icon ion-icon {
  font-size: 48px;
  color: #D1D5DB;
}

.empty-text {
  font-size: 16px;
  color: #6B7280;
  text-align: center;
  margin: 0;
}
```

---

### 4. Tedavi Detayı (TedaviDetayPage.tsx) - ÖNEMLİ: Ödeme Bilgileri Eklendi

#### Görsel Yapı
```
┌─────────────────────────────────┐
│ [←] Tedavi Detayı               │ ← Header (Geri butonu)
├─────────────────────────────────┤
│                                 │
│  Kardiyoloji Kontrolü           │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Temel Bilgiler          │   │
│  │ ─────────────────────   │   │
│  │ Tarih: 12 Kasım 2025   │   │
│  │ Saat: 14:30             │   │
│  │ ─────────────────────   │   │
│  │ Hastane: Bezmialem...   │   │
│  │ ─────────────────────   │   │
│  │ Klinik: Kardiyoloji     │   │
│  │ ─────────────────────   │   │
│  │ Doktor: Prof. Dr. ...   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 💳 Kart İndirim Detayı  │   │ ← YENİ: Ödeme Kartı
│  │ ─────────────────────   │   │
│  │ Toplam Tutar            │   │
│  │            2,500.00 ₺   │   │
│  │ İndirim Oranı: %40      │   │
│  │ İndirim Tutarı          │   │
│  │            1,000.00 ₺   │   │
│  │ ─────────────────────   │   │
│  │ Kart ile Ödenen         │   │
│  │            1,500.00 ₺   │   │ ← Altın, bold
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Muayene Sonucu          │   │ ← Altın çerçeve
│  │ Kontrol muayenesi...    │   │
│  │ ─────────────────────   │   │
│  │ Doktor Notları          │   │
│  │ Tansiyonunuzu...        │   │
│  └─────────────────────────┘   │
│                                 │
│  [📄 Raporu İndir (PDF)]       │
│                                 │
└─────────────────────────────────┘
```

#### TypeScript Interface
```typescript
interface OdemeBilgileri {
  toplamTutar: number;
  indirimOrani: number;
  indirimTutari: number;
  kartIleOdenen: number;
  odemeYontemi: string;
}

interface TedaviDetay {
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
```

#### Ionic React Component
```tsx
import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonItem,
  IonLabel
} from '@ionic/react';
import { documentTextOutline, cardOutline } from 'ionicons/icons';

interface TedaviDetayPageProps {
  tedaviId: number;
  onBack: () => void;
}

const tedaviData: Record<number, TedaviDetay> = {
  1: {
    id: 1,
    ad: 'Kardiyoloji Kontrolü',
    tarih: '12 Kasım 2025',
    saat: '14:30',
    hastane: 'Bezmialem Vakıf Üniversitesi Hastanesi',
    klinik: 'Kardiyoloji Kliniği',
    doktor: 'Prof. Dr. Mehmet Öztürk',
    odemeBilgileri: {
      toplamTutar: 2500.00,
      indirimOrani: 40,
      indirimTutari: 1000.00,
      kartIleOdenen: 1500.00,
      odemeYontemi: 'Bezmialem Vakıf Kart'
    },
    sonuc: 'Kontrol muayenesi sonuçları normal sınırlardadır. Mevcut tedaviye devam edilmesi önerilmektedir.',
    notlar: 'Tansiyonunuzu düzenli ölçmeye devam ediniz.'
  }
};

const TedaviDetayPage: React.FC<TedaviDetayPageProps> = ({ tedaviId, onBack }) => {
  const tedavi = tedaviData[tedaviId];

  if (!tedavi) {
    return (
      <IonPage>
        <IonContent>
          <div className="empty-state">
            <IonText>
              <p>Tedavi bilgisi bulunamadı.</p>
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tedaviler" onClick={onBack} />
          </IonButtons>
          <IonTitle>Tedavi Detayı</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding tedavi-detay-page">
        {/* Tedavi Adı */}
        <IonText>
          <h2 className="tedavi-title">{tedavi.ad}</h2>
        </IonText>

        {/* Temel Bilgiler */}
        <IonCard className="info-card">
          <IonCardContent>
            <InfoRow label="Tarih" value={`${tedavi.tarih} - ${tedavi.saat}`} />
            <div className="divider"></div>
            <InfoRow label="Hastane" value={tedavi.hastane} />
            <div className="divider"></div>
            <InfoRow label="Klinik" value={tedavi.klinik} />
            <div className="divider"></div>
            <InfoRow label="Doktor" value={tedavi.doktor} />
          </IonCardContent>
        </IonCard>

        {/* YENİ: Ödeme Bilgileri Kartı */}
        <IonCard className="payment-card">
          <IonCardContent>
            <div className="payment-header">
              <IonIcon icon={cardOutline} className="payment-icon" />
              <IonText>
                <h3 className="payment-title">Kart İndirim Detayı</h3>
              </IonText>
            </div>

            <div className="payment-row">
              <IonText color="medium">
                <p className="payment-label">Toplam Tutar</p>
              </IonText>
              <IonText>
                <p className="payment-value">
                  {tedavi.odemeBilgileri.toplamTutar.toFixed(2)} ₺
                </p>
              </IonText>
            </div>

            <div className="payment-row">
              <div className="label-with-badge">
                <IonText color="medium">
                  <p className="payment-label">İndirim Oranı</p>
                </IonText>
                <span className="discount-badge">
                  %{tedavi.odemeBilgileri.indirimOrani}
                </span>
              </div>
              <IonText>
                <p className="payment-value discount">
                  {tedavi.odemeBilgileri.indirimTutari.toFixed(2)} ₺
                </p>
              </IonText>
            </div>

            <div className="divider-thick"></div>

            <div className="payment-row">
              <IonText>
                <p className="payment-label-bold">Kart ile Ödenen</p>
              </IonText>
              <IonText>
                <p className="payment-value-total">
                  {tedavi.odemeBilgileri.kartIleOdenen.toFixed(2)} ₺
                </p>
              </IonText>
            </div>

            <div className="payment-method-info">
              <IonText color="medium">
                <p className="method-label">Ödeme Yöntemi</p>
              </IonText>
              <IonText>
                <p className="method-value">{tedavi.odemeBilgileri.odemeYontemi}</p>
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Sonuç ve Notlar */}
        <IonCard className="result-card">
          <IonCardContent>
            <IonText color="medium">
              <p className="result-label">Muayene Sonucu</p>
            </IonText>
            <IonText>
              <p className="result-text">{tedavi.sonuc}</p>
            </IonText>

            {tedavi.notlar && (
              <>
                <div className="divider"></div>
                <IonText color="medium">
                  <p className="result-label">Doktor Notları</p>
                </IonText>
                <IonText>
                  <p className="result-text">{tedavi.notlar}</p>
                </IonText>
              </>
            )}
          </IonCardContent>
        </IonCard>

        {/* Rapor İndirme */}
        <IonButton 
          expand="block" 
          fill="outline"
          className="download-button"
        >
          <IonIcon icon={documentTextOutline} slot="start" />
          Raporu İndir (PDF)
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

// Info Row Component
interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className="info-row">
      <IonText color="medium">
        <p className="info-label">{label}</p>
      </IonText>
      <IonText>
        <p className="info-value">{value}</p>
      </IonText>
    </div>
  );
};

export default TedaviDetayPage;
```

#### Tedavi Detay Stiller (TedaviDetayPage.css)
```css
.tedavi-detay-page {
  --background: #FFFFFF;
}

.tedavi-title {
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  margin: 0 0 24px 0;
}

/* Temel Bilgiler Kartı */
.info-card {
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  margin-bottom: 16px;
}

.info-row {
  padding: 12px 0;
}

.info-label {
  font-size: 14px;
  margin: 0 0 4px 0;
}

.info-value {
  font-size: 16px;
  color: #000000;
  margin: 0;
}

/* Ödeme Bilgileri Kartı - YENİ */
.payment-card {
  border: 2px solid #C8A850;
  border-radius: 12px;
  background: rgba(200, 168, 80, 0.05);
  margin-bottom: 16px;
}

.payment-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.payment-icon {
  font-size: 24px;
  color: #C8A850;
}

.payment-title {
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  margin: 0;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.payment-label {
  font-size: 14px;
  margin: 0;
}

.payment-label-bold {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin: 0;
}

.payment-value {
  font-size: 16px;
  color: #000000;
  font-weight: 500;
  margin: 0;
}

.payment-value.discount {
  color: #10B981;
}

.payment-value-total {
  font-size: 20px;
  color: #C8A850;
  font-weight: 700;
  margin: 0;
}

.label-with-badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discount-badge {
  background: #C8A850;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.payment-method-info {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E5E7EB;
  text-align: center;
}

.method-label {
  font-size: 12px;
  margin: 0 0 4px 0;
}

.method-value {
  font-size: 14px;
  color: #C8A850;
  font-weight: 600;
  margin: 0;
}

/* Sonuç Kartı */
.result-card {
  border: 2px solid #C8A850;
  border-radius: 12px;
  background: rgba(200, 168, 80, 0.05);
  margin-bottom: 16px;
}

.result-label {
  font-size: 14px;
  margin: 0 0 8px 0;
}

.result-text {
  font-size: 16px;
  color: #000000;
  line-height: 1.6;
  margin: 0;
}

/* Dividers */
.divider {
  height: 1px;
  background: #E5E7EB;
  margin: 4px 0;
}

.divider-thick {
  height: 2px;
  background: #C8A850;
  margin: 12px 0;
}

/* Download Button */
.download-button {
  --border-color: #C8A850;
  --color: #C8A850;
  --border-width: 1px;
  --border-radius: 8px;
  margin-top: 8px;
}

.download-button:hover {
  --background: #C8A850;
  --color: white;
}
```

---

### 5. İletişim, Destek ve Profil Sayfaları

Bu sayfalar için de benzer yapı kullanılacak. Aynı Ionic React pattern'leri uygulanacak:

- `IonPage`, `IonHeader`, `IonToolbar`, `IonContent`
- `IonCard`, `IonCardContent`
- `IonList`, `IonItem`, `IonLabel`
- `IonInput`, `IonTextarea`, `IonSelect`
- `IonButton`, `IonIcon`

---

## 🧭 Tab Navigation Yapısı

### Ana Routing (App.tsx)
```tsx
import React, { useState } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import {
  homeOutline,
  clipboardOutline,
  chatbubblesOutline,
  callOutline,
  personOutline
} from 'ionicons/icons';

/* Core CSS required for Ionic components */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme */
import './theme/variables.css';
import './theme/global.css';

/* Pages */
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TedavilerPage from './pages/TedavilerPage';
import TedaviDetayPage from './pages/TedaviDetayPage';
import DestekPage from './pages/DestekPage';
import IletisimPage from './pages/IletisimPage';
import ProfilPage from './pages/ProfilPage';

setupIonicReact();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <IonApp>
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/tedaviler" component={TedavilerPage} />
            <Route path="/tedaviler/:id" component={TedaviDetayPage} />
            <Route exact path="/destek" component={DestekPage} />
            <Route exact path="/iletisim" component={IletisimPage} />
            <Route exact path="/profil" component={ProfilPage} />
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="custom-tab-bar">
            <IonTabButton tab="dashboard" href="/dashboard">
              <IonIcon icon={homeOutline} />
              <IonLabel>Ana Sayfa</IonLabel>
            </IonTabButton>

            <IonTabButton tab="tedaviler" href="/tedaviler">
              <IonIcon icon={clipboardOutline} />
              <IonLabel>Tedaviler</IonLabel>
            </IonTabButton>

            <IonTabButton tab="destek" href="/destek">
              <IonIcon icon={chatbubblesOutline} />
              <IonLabel>Destek</IonLabel>
            </IonTabButton>

            <IonTabButton tab="iletisim" href="/iletisim">
              <IonIcon icon={callOutline} />
              <IonLabel>İletişim</IonLabel>
            </IonTabButton>

            <IonTabButton tab="profil" href="/profil">
              <IonIcon icon={personOutline} />
              <IonLabel>Profil</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
```

### Tab Bar Stili (global.css)
```css
.custom-tab-bar {
  --background: white;
  --border: 1px solid #E5E7EB;
  height: 64px;
}

.custom-tab-bar ion-tab-button {
  --color: #6B7280;
  --color-selected: #C8A850;
}

.custom-tab-bar ion-icon {
  font-size: 20px;
}

.custom-tab-bar ion-label {
  font-size: 12px;
  margin-top: 4px;
}
```

---

## 📦 Proje Yapısı

```
bezmialem-vakif-kart/
├── public/
│   └── assets/
│       └── logo-bezmialem.png
├── src/
│   ├── components/
│   │   ├── UserCard.tsx
│   │   ├── QuickAccessCard.tsx
│   │   ├── TedaviListItem.tsx
│   │   └── PaymentInfoCard.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── TedavilerPage.tsx
│   │   ├── TedaviDetayPage.tsx
│   │   ├── DestekPage.tsx
│   │   ├── IletisimPage.tsx
│   │   └── ProfilPage.tsx
│   ├── services/
│   │   ├── api.ts
│   │   └── mockData.ts
│   ├── types/
│   │   ├── tedavi.ts
│   │   ├── user.ts
│   │   └── payment.ts
│   ├── theme/
│   │   ├── variables.css
│   │   └── global.css
│   ├── App.tsx
│   ├── index.tsx
│   └── setupTests.ts
├── capacitor.config.ts
├── ionic.config.json
├── package.json
└── tsconfig.json
```

---

## 🔧 Kurulum Komutları

```bash
# Ionic React projesi oluştur
npm install -g @ionic/cli
ionic start bezmialem-vakif-kart blank --type=react --capacitor

cd bezmialem-vakif-kart

# iOS ve Android platformları ekle
ionic capacitor add ios
ionic capacitor add android

# Geliştirme sunucusunu başlat
ionic serve

# iOS için build
ionic capacitor build ios
ionic capacitor open ios

# Android için build
ionic capacitor build android
ionic capacitor open android
```

---

## 📝 package.json Bağımlılıkları

```json
{
  "dependencies": {
    "@capacitor/android": "^5.0.0",
    "@capacitor/app": "^5.0.0",
    "@capacitor/core": "^5.0.0",
    "@capacitor/haptics": "^5.0.0",
    "@capacitor/ios": "^5.0.0",
    "@capacitor/keyboard": "^5.0.0",
    "@capacitor/status-bar": "^5.0.0",
    "@ionic/react": "^7.0.0",
    "@ionic/react-router": "^7.0.0",
    "ionicons": "^7.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router": "^5.3.0",
    "react-router-dom": "^5.3.0"
  },
  "devDependencies": {
    "@capacitor/cli": "^5.0.0",
    "@ionic/cli": "^7.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@types/react-router": "^5.1.0",
    "@types/react-router-dom": "^5.3.0",
    "typescript": "^5.0.0"
  }
}
```

---

## 🎯 Önemli Değişiklikler - Son Güncelleme

### ✅ Tamamlanan
1. **Randevularım alanı kaldırıldı** - Dashboard'da sadece 3 hızlı erişim kartı var
2. **Ödeme bilgileri eklendi** - Tedavi detayında tam ödeme ve indirim kartı
3. **Logo alanı eklendi** - Login sayfasında Bezmialem logosu için alan
4. **React + Ionic** - Tüm kod örnekleri React + TypeScript + Ionic formatında

### Ödeme Bilgileri Detayları
- Toplam Tutar gösterimi
- İndirim Oranı (%) badge ile vurgulanmış
- İndirim Tutarı (yeşil renk)
- Kart ile Ödenen (altın renk, bold, büyük font)
- Ödeme yöntemi bilgisi

---

## 🚀 Geliştirme Aşamaları

### Faz 1: Temel Kurulum ✅
1. Ionic React projesi oluştur
2. Capacitor ekle
3. Tema ve renkler ayarla
4. Tab navigation yapısını kur

### Faz 2: Sayfalar ✅
1. LoginPage (Logo ile)
2. DashboardPage (Randevu kaldırılmış - 3 kart)
3. TedavilerPage
4. TedaviDetayPage (Ödeme bilgileri ile)
5. DestekPage
6. IletisimPage
7. ProfilPage

### Faz 3: Native Features
1. Haptic feedback ekle
2. Status bar ayarları
3. Safe area padding
4. Platform detection (iOS/Android)

### Faz 4: API Entegrasyonu
1. Mock data'yı gerçek API ile değiştir
2. Error handling ekle
3. Loading states ekle
4. Offline support

### Faz 5: Test ve Deploy
1. iOS test (Xcode Simulator)
2. Android test (Android Studio Emulator)
3. App Store build
4. Play Store build

---

## ✅ Final Kontrol Listesi

- [x] React + Ionic + TypeScript yapısı
- [x] Logo eklendi (LoginPage)
- [x] Randevu butonu kaldırıldı (Dashboard - 3 kart)
- [x] Ödeme bilgileri kartı eklendi (TedaviDetay)
- [x] İndirim oranı ve tutarı gösteriliyor
- [x] Kart ile ödenen tutar altın renkle vurgulanmış
- [x] Tab navigation 5 sayfa
- [x] Minimalist siyah-beyaz-altın tema
- [ ] iOS test
- [ ] Android test

---

Bu dokümantasyon ile React + Ionic + TypeScript kullanarak Bezmialem Vakıf Kart uygulamanızı geliştirebilirsiniz. Başarılar! 🎉

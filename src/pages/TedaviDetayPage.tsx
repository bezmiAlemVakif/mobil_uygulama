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
  IonText
} from '@ionic/react';
import { documentTextOutline, cardOutline } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { getTedaviDetay } from '../services/mockData';
import './TedaviDetayPage.css';

const TedaviDetayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tedavi = getTedaviDetay(parseInt(id));

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
            <IonBackButton defaultHref="/tedaviler" />
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

        {/* Ödeme Bilgileri Kartı */}
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

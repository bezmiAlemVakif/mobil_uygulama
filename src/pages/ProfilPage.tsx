import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonModal,
  IonInput,
  IonToast
} from '@ionic/react';
import { keyOutline, callOutline, mailOutline, chevronForwardOutline } from 'ionicons/icons';
import { mockUser } from '../services/mockData';
import './ProfilPage.css';

interface ProfilPageProps {
  onLogout: () => void;
}

const ProfilPage: React.FC<ProfilPageProps> = ({ onLogout }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setToastMessage('Lütfen tüm alanları doldurunuz.');
      setShowToast(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setToastMessage('Yeni şifreler eşleşmiyor.');
      setShowToast(true);
      return;
    }

    if (newPassword.length < 6) {
      setToastMessage('Şifre en az 6 karakter olmalıdır.');
      setShowToast(true);
      return;
    }

    setToastMessage('Şifreniz başarıyla değiştirildi.');
    setShowToast(true);
    setShowPasswordModal(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePhoneChange = () => {
    if (!newPhone) {
      setToastMessage('Lütfen telefon numaranızı giriniz.');
      setShowToast(true);
      return;
    }

    if (newPhone.replace(/\D/g, '').length !== 10) {
      setToastMessage('Telefon numarası 10 haneli olmalıdır.');
      setShowToast(true);
      return;
    }

    setToastMessage('Doğrulama kodu gönderildi.');
    setShowToast(true);
    setShowPhoneModal(false);
    setNewPhone('');
  };

  const handleEmailChange = () => {
    if (!newEmail) {
      setToastMessage('Lütfen e-posta adresinizi giriniz.');
      setShowToast(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setToastMessage('Geçerli bir e-posta adresi giriniz.');
      setShowToast(true);
      return;
    }

    setToastMessage('E-posta adresiniz başarıyla güncellendi.');
    setShowToast(true);
    setShowEmailModal(false);
    setNewEmail('');
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding profil-page">
        {/* Profil Bilgileri */}
        <div className="section">
          <div className="profile-header">
            <div className="profile-avatar">
              {mockUser.ad[0]}{mockUser.soyad[0]}
            </div>
            <h2 className="profile-name">{mockUser.ad} {mockUser.soyad}</h2>
          </div>
        </div>

        {/* İstatistikler */}
        <IonGrid className="stats-grid">
          <IonRow>
            <IonCol size="6">
              <IonCard className="stat-card">
                <IonCardContent>
                  <div className="stat-value">12</div>
                  <div className="stat-label">Toplam Tedavi</div>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="stat-card">
                <IonCardContent>
                  <div className="stat-value">3</div>
                  <div className="stat-label">Bu Ay</div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Kişisel Bilgiler */}
        <div className="section">
          <IonText>
            <h3 className="section-title">Kişisel Bilgiler</h3>
          </IonText>
          
          <IonCard>
            <IonCardContent>
              <IonList lines="none">
                <IonItem>
                  <IonLabel>
                    <p className="info-label">T.C. Kimlik No</p>
                    <h3 className="info-value">{mockUser.tcKimlik}</h3>
                  </IonLabel>
                </IonItem>

                {mockUser.telefon && (
                  <IonItem>
                    <IonLabel>
                      <p className="info-label">Telefon</p>
                      <h3 className="info-value">{mockUser.telefon}</h3>
                    </IonLabel>
                  </IonItem>
                )}

                {mockUser.eposta && (
                  <IonItem>
                    <IonLabel>
                      <p className="info-label">E-posta</p>
                      <h3 className="info-value">{mockUser.eposta}</h3>
                    </IonLabel>
                  </IonItem>
                )}
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Hesap Ayarları */}
        <div className="section">
          <IonText>
            <h3 className="section-title">Hesap Ayarları</h3>
          </IonText>

          <IonCard>
            <IonCardContent>
              <IonList lines="full">
                <IonItem button detail onClick={() => setShowPasswordModal(true)}>
                  <IonIcon slot="start" icon={keyOutline} />
                  <IonLabel>Şifre Değiştir</IonLabel>
                  <IonIcon slot="end" icon={chevronForwardOutline} />
                </IonItem>
                <IonItem button detail onClick={() => setShowPhoneModal(true)}>
                  <IonIcon slot="start" icon={callOutline} />
                  <IonLabel>Telefon Değiştir</IonLabel>
                  <IonIcon slot="end" icon={chevronForwardOutline} />
                </IonItem>
                <IonItem button detail onClick={() => setShowEmailModal(true)}>
                  <IonIcon slot="start" icon={mailOutline} />
                  <IonLabel>E-posta Değiştir</IonLabel>
                  <IonIcon slot="end" icon={chevronForwardOutline} />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Çıkış Yap */}
        <IonButton 
          expand="block" 
          fill="outline"
          color="danger"
          onClick={onLogout}
          className="logout-button"
        >
          Çıkış Yap
        </IonButton>

        {/* Modals */}
        <IonModal isOpen={showPasswordModal} onDidDismiss={() => setShowPasswordModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Şifre Değiştir</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              label="Mevcut Şifre"
              labelPlacement="stacked"
              type="password"
              value={oldPassword}
              onIonInput={(e) => setOldPassword(e.detail.value || '')}
              className="custom-input"
            />
            <IonInput
              label="Yeni Şifre"
              labelPlacement="stacked"
              type="password"
              value={newPassword}
              onIonInput={(e) => setNewPassword(e.detail.value || '')}
              className="custom-input"
            />
            <IonInput
              label="Yeni Şifre (Tekrar)"
              labelPlacement="stacked"
              type="password"
              value={confirmPassword}
              onIonInput={(e) => setConfirmPassword(e.detail.value || '')}
              className="custom-input"
            />
            <IonButton expand="block" className="primary-button" onClick={handlePasswordChange}>Kaydet</IonButton>
            <IonButton expand="block" fill="clear" onClick={() => setShowPasswordModal(false)}>Vazgeç</IonButton>
          </IonContent>
        </IonModal>

        <IonModal isOpen={showPhoneModal} onDidDismiss={() => setShowPhoneModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Telefon Değiştir</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              label="Yeni Telefon Numarası"
              labelPlacement="stacked"
              type="tel"
              maxlength={10}
              value={newPhone}
              onIonInput={(e) => setNewPhone((e.detail.value || '').replace(/\D/g, ''))}
              className="custom-input"
              placeholder="5XX XXX XX XX"
            />
            <IonButton expand="block" className="primary-button" onClick={handlePhoneChange}>Devam Et</IonButton>
            <IonButton expand="block" fill="clear" onClick={() => setShowPhoneModal(false)}>Vazgeç</IonButton>
          </IonContent>
        </IonModal>

        <IonModal isOpen={showEmailModal} onDidDismiss={() => setShowEmailModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>E-posta Değiştir</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              label="Yeni E-posta"
              labelPlacement="stacked"
              type="email"
              value={newEmail}
              onIonInput={(e) => setNewEmail(e.detail.value || '')}
              className="custom-input"
              placeholder="ornek@eposta.com"
            />
            <IonButton expand="block" className="primary-button" onClick={handleEmailChange}>Kaydet</IonButton>
            <IonButton expand="block" fill="clear" onClick={() => setShowEmailModal(false)}>Vazgeç</IonButton>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2500}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfilPage;

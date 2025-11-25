import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  homeOutline,
  clipboardOutline,
  chatbubblesOutline,
  callOutline,
  personOutline
} from 'ionicons/icons';

/* Pages */
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import BasvuruKontroluPage from './pages/BasvuruKontroluPage';
import DashboardPage from './pages/DashboardPage';
import IslemlerPage from './pages/IslemlerPage';
import IslemDetayPage from './pages/IslemDetayPage';
import DestekPage from './pages/DestekPage';
import IletisimPage from './pages/IletisimPage';
import ProfilPage from './pages/ProfilPage';

setupIonicReact();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // LocalStorage'dan auth durumunu oku
    const savedAuth = localStorage.getItem('bezmialem_auth');
    return savedAuth === 'true';
  });

  useEffect(() => {
    // Auth durumu değiştiğinde localStorage'a kaydet
    localStorage.setItem('bezmialem_auth', isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('bezmialem_auth');
  };

  return (
    <IonApp>
      <IonReactRouter>
        {!isLoggedIn ? (
          <IonRouterOutlet animated={false}>
            <Route exact path="/login">
              <LoginPage onLogin={handleLogin} />
            </Route>
            <Route exact path="/otp">
              <OtpPage onVerified={handleLogin} />
            </Route>
            <Route exact path="/basvuru-kontrolu">
              <BasvuruKontroluPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        ) : (
          <IonTabs>
            <IonRouterOutlet animated={false}>
              <Route exact path="/dashboard">
                <DashboardPage />
              </Route>
              <Route exact path="/islemler">
                <IslemlerPage />
              </Route>
              <Route exact path="/islemler/:id">
                <IslemDetayPage />
              </Route>
              <Route exact path="/destek">
                <DestekPage />
              </Route>
              <Route exact path="/iletisim">
                <IletisimPage />
              </Route>
              <Route exact path="/profil">
                <ProfilPage onLogout={handleLogout} />
              </Route>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" className="custom-tab-bar">
              <IonTabButton tab="dashboard" href="/dashboard">
                <IonIcon icon={homeOutline} />
                <IonLabel>Ana Sayfa</IonLabel>
              </IonTabButton>

              <IonTabButton tab="islemler" href="/islemler">
                <IonIcon icon={clipboardOutline} />
                <IonLabel>İşlemler</IonLabel>
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
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

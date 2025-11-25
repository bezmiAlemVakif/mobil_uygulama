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
import { useHistory } from 'react-router-dom';
import { mockTedaviler } from '../services/mockData';
import './TedavilerPage.css';

const TedavilerPage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Geçmiş Tedavilerim</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="tedaviler-page">
        {mockTedaviler.length === 0 ? (
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
            {mockTedaviler.map((tedavi) => (
              <IonItem
                key={tedavi.id}
                button
                onClick={() => history.push(`/tedaviler/${tedavi.id}`)}
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

import { IonPage, IonContent, IonButton } from "@ionic/react";

import Header from "../../components/Header/Header";
import "./Scan.css";

export default function Scan({ eventName, startTime, endTime }) {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="custom-scan">
          <h1>{eventName}</h1>
          <h3 className="custom-subtitle">
            Time: {startTime} - {endTime}
          </h3>
          <div className="btn-margin">
            <IonButton class="custom-ion-btn">Scan</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

import {
  IonContent,
  IonInput,
  IonList,
  IonItem,
  IonButton,
} from "@ionic/react";

import "./Login.css";

export default function Login({ show }: { show: boolean }) {
  if (!show) {
    return <></>;
  }

  return (
    <IonContent fullscreen class="login-content">
      <div className="center-items">
        <IonList class="ion-padding-start ion-margin-end" lines="none">
          <IonItem class="show-outline ion-margin-bottom">
            <IonInput placeholder="Username" class="ion-padding"></IonInput>
          </IonItem>
          <IonItem class="show-outline ion-margin-bottom">
            <IonInput
              placeholder="Password"
              type="password"
              class="ion-padding"
            ></IonInput>
          </IonItem>
          <IonItem class="ion-padding no-outline">
            <IonButton class="login-submit">Submit</IonButton>
          </IonItem>
        </IonList>
      </div>
    </IonContent>
  );
}

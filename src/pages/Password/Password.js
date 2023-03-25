import {
  IonContent,
  IonPage,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";

import { hideTabBar, showTabBar } from "../../utils/tabs";
import { login } from "../../services/login";
import { useHistory } from "react-router";

import "./Password.css";

export default function Password() {
  const [pass, setPass] = useState("");
  const [present] = useIonToast();
  let history = useHistory();

  useIonViewDidEnter(() => {
    hideTabBar();
  });

  useIonViewDidLeave(() => {
    showTabBar();
  });

  const onLogin = async () => {
    try {
      const res = await login(pass);
      if (res.status === 200) {
        history.push("/home");
      }
    } catch (error) {
      console.log("ahsdfhaldsf");
      present({
        message: error.message,
        duration: 1500,
        position: "bottom",
      });
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="pass-page">
          <IonItem>
            <IonLabel position="stacked">Enter Password</IonLabel>
            <IonInput
              type="password"
              value={pass}
              onIonChange={(e) => setPass(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonButton expand="block" onClick={onLogin}>
            Submit
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

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
  IonList,
  IonSelect,
  IonSpinner,
  IonSelectOption,
} from "@ionic/react";
import { useEffect, useState } from "react";

import { hideTabBar, showTabBar } from "../../utils/tabs";
import { login } from "../../services/login";
import { useHistory } from "react-router";
import { getOfficers } from "../../services/student";

import "./Password.css";
import useEventStore from "../../store/events";

export default function Password() {
  const [pass, setPass] = useState("");
  const [officers, setOfficers] = useState([]);
  const [selected, setSelected] = useState("");
  const [ping, setPing] = useState(false);
  const setScanner = useEventStore((state) => state.setScanner);
  const [present] = useIonToast();
  let history = useHistory();

  useEffect(() => {
    getOfficers().then((result) => {
      setPing(true);
      const names = result.data.map((s) => s.name);
      names.sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      );
      setOfficers(names);
    });
  }, []);

  useIonViewDidEnter(() => {
    hideTabBar();
  });

  useIonViewDidLeave(() => {
    showTabBar();
  });

  const onLogin = async () => {
    if (selected === "") {
      present({
        message: "Please select an officer before logging in",
        duration: 1500,
        position: "bottom",
      });
      return;
    }
    try {
      const res = await login(pass);
      if (res.status === 200) {
        setScanner(selected);
        history.push("/home");
      }
    } catch (error) {
      console.log("ahsdfhaldsf");
      present({
        message: `${error.message}: Incorrect Password`,
        duration: 1500,
        position: "bottom",
      });
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="pass-page">
          <IonList>
            {!ping && (
              <IonSpinner
                name="circular"
                className="center-spinner"
              ></IonSpinner>
            )}
            {ping && (
              <IonItem>
                <IonSelect
                  placeholder="Select officer"
                  onIonChange={(e) => setSelected(e.target.value)}
                >
                  {officers.map((name, i) => (
                    <IonSelectOption key={i} value={name}>
                      {name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            )}
            <IonItem>
              <IonLabel position="fixed">Enter Password</IonLabel>
              <IonInput
                type="password"
                value={pass}
                onIonChange={(e) => setPass(e.target.value)}
              ></IonInput>
            </IonItem>
            <IonButton expand="block" onClick={onLogin}>
              Submit
            </IonButton>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}

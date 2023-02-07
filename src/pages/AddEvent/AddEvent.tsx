import {
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonLabel,
  IonSpinner,
} from "@ionic/react";

import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./AddEvent.css";

const baseUrl = "https://qrca-api.onrender.com";
// const baseUrl = "http://192.168.1.9:3001";

const AddEvent = () => {
  let history = useHistory();
  const [submitP, setSubmitP] = useState(false);
  const [in1, setIn1] = useState(null);
  const [inEnd1, setInEnd1] = useState(null);
  const [in2, setIn2] = useState(null);
  const [inEnd2, setInEnd2] = useState(null);
  const [out1, setOut1] = useState(null);
  const [outEnd1, setOutEnd1] = useState(null);
  const [out2, setOut2] = useState(null);
  const [outEnd2, setOutEnd2] = useState(null);
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");

  const onSubmit = async () => {
    setSubmitP(true);
    const data = {
      eventName,
      eventType,
      date: date + "T00:00",
      in1: in1 !== null ? date + "T" + in1 + ":00+08:00" : null,
      inEnd1: inEnd1 !== null ? date + "T" + inEnd1 + ":00+08:00" : null,
      in2: in2 !== null ? date + "T" + in2 + ":00+08:00" : null,
      inEnd2: inEnd2 !== null ? date + "T" + inEnd2 + ":00+08:00" : null,
      out1: out1 !== null ? date + "T" + out1 + ":00+08:00" : null,
      outEnd1: outEnd1 ? date + "T" + outEnd1 + ":00+08:00" : null,
      out2: out2 !== null ? date + "T" + out2 + ":00+08:00" : null,
      outEnd2: outEnd2 !== null ? date + "T" + outEnd2 + ":00+08:00" : null,
    };

    // console.log(data);

    await axios.post(`${baseUrl}/api/events`, data).then(() => {
      setSubmitP(false);
      history.push("/");
    });
  };

  return (
    <IonPage>
      <IonContent class="custom-add-event">
        <IonList class="custom-list">
          <h1>Add Event</h1>
          <IonItem>
            <IonSelect
              interface="action-sheet"
              placeholder="Select event type"
              onIonChange={(e: any) => setEventType(e.target.value)}
            >
              <IonSelectOption value="major">Major</IonSelectOption>
              <IonSelectOption value="minor">Minor</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Enter event name"
              onIonChange={(e: any) => setEventName(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Date:</IonLabel>
            <IonInput
              placeholder="Date"
              type="date"
              onIonChange={(e: any) => setDate(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>MLogin:</IonLabel>
            <IonInput
              placeholder="Start time"
              type="time"
              onIonChange={(e: any) => setIn1(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>MLogin End:</IonLabel>
            <IonInput
              placeholder="End time"
              type="time"
              onIonChange={(e: any) => setInEnd1(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>MLogout:</IonLabel>
            <IonInput
              placeholder="Start time"
              type="time"
              onIonChange={(e: any) => setOut1(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>MLogout End:</IonLabel>
            <IonInput
              placeholder="End time"
              type="time"
              onIonChange={(e: any) => setOutEnd1(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>ALogin:</IonLabel>
            <IonInput
              placeholder="Start time"
              type="time"
              onIonChange={(e: any) => setIn2(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>ALogin End:</IonLabel>
            <IonInput
              placeholder="End time"
              type="time"
              onIonChange={(e: any) => setInEnd2(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>ALogout:</IonLabel>
            <IonInput
              placeholder="Start time"
              type="time"
              onIonChange={(e: any) => setOut2(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>ALogout End:</IonLabel>
            <IonInput
              placeholder="End time"
              type="time"
              onIonChange={(e: any) => setOutEnd2(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem class="ion-add-custom-button">
            {!submitP && (
              <IonButton
                class="add-custom-button ion-padding ion-margin-bottom"
                onClick={onSubmit}
              >
                Submit
              </IonButton>
            )}
            {submitP && (
              <IonSpinner name="circular" class="center-spinner"></IonSpinner>
            )}
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEvent;

import {
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";

import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./AddEvent.css";

const baseUrl = "http://localhost:3001";

const AddEvent = () => {
  let history = useHistory();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");

  const onSubmit = async () => {
    const data = {
      eventName,
      eventType,
      date: date + "T00:00Z",
      startTime: date + "T" + startTime + "Z",
      endTime: date + "T" + endTime + "Z",
    };

    // console.log(data);

    await axios.post(`${baseUrl}/api/events`, data);
    history.push("/");
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
            <IonInput
              placeholder="Date"
              type="date"
              onIonChange={(e: any) => setDate(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Start time"
              type="time"
              onIonChange={(e: any) => setStartTime(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="End time"
              type="time"
              onIonChange={(e: any) => setEndTime(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem class="ion-add-custom-button">
            <IonButton class="add-custom-button" onClick={onSubmit}>
              Submit
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEvent;

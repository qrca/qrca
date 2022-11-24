import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonDatetime,
  IonModal,
} from "@ionic/react";
import { useState } from "react";

import Header from "../../components/Header/Header";
import "./AddEvent.css";

const AddEvent = () => {
  const getTime = (e: any) => {
    console.log(e.target.value);
  };

  const [isModalOneOpen, setIsModalOneOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
  const [isModalThreeOpen, setIsModalThreeOpen] = useState(false);
  // const d;

  return (
    <IonPage>
      <Header />
      <IonContent class="custom-add-event">
        <IonList class="custom-list">
          <IonItem>
            <IonLabel position="stacked">Event type</IonLabel>
            <IonSelect interface="action-sheet" placeholder="Select event type">
              <IonSelectOption value="Major">Major</IonSelectOption>
              <IonSelectOption value="Minor">Minor</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Event name</IonLabel>
            <IonInput class="custom" placeholder="Enter event name"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonInput
              placeholder="Date"
              onIonFocus={() => setIsModalOneOpen(true)}
            ></IonInput>
            <IonModal isOpen={isModalOneOpen}>
              <div className="datetime-picker">
                <IonButton
                  expand="block"
                  onClick={() => setIsModalOneOpen(false)}
                >
                  Close
                </IonButton>
                <IonDatetime
                  onIonChange={(e) => getTime(e)}
                  presentation="date"
                ></IonDatetime>
              </div>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Start time</IonLabel>
            <IonInput
              placeholder="Start time"
              onIonFocus={() => setIsModalTwoOpen(true)}
            ></IonInput>
            <IonModal isOpen={isModalTwoOpen}>
              <div className="datetime-picker">
                <IonButton
                  expand="block"
                  onClick={() => setIsModalTwoOpen(false)}
                >
                  Close
                </IonButton>
                <IonDatetime
                  onIonChange={(e) => getTime(e)}
                  presentation="time"
                ></IonDatetime>
              </div>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">End time</IonLabel>
            <IonInput
              placeholder="End time"
              onIonFocus={() => setIsModalThreeOpen(true)}
            ></IonInput>
            <IonModal isOpen={isModalThreeOpen}>
              <div className="datetime-picker">
                <IonButton
                  expand="block"
                  onClick={() => setIsModalThreeOpen(false)}
                >
                  Close
                </IonButton>
                <IonDatetime
                  onIonChange={(e) => getTime(e)}
                  presentation="time"
                ></IonDatetime>
              </div>
            </IonModal>
          </IonItem>
          <IonItem class="ion-add-custom-button">
            <IonButton class="add-custom-button">Submit</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEvent;

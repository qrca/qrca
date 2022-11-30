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

import "./AddEvent.css";

const AddEvent = () => {
  const getTime = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <IonPage>
      <IonContent class="custom-add-event">
        <IonList class="custom-list">
          <h1>Add Event</h1>
          <IonItem>
            <IonSelect interface="action-sheet" placeholder="Select event type">
              <IonSelectOption value="Major">Major</IonSelectOption>
              <IonSelectOption value="Minor">Minor</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Enter event name"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Date" type="date"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Start time" type="time"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="End time"
              type="time"
              onIonChange={(e) => getTime(e)}
            ></IonInput>
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

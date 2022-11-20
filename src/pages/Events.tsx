import {
  IonContent,
  IonPage,
  IonTitle,
  IonList,
  IonListHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFooter,
  IonToolbar,
} from "@ionic/react";
import Header from "../components/Header/Header";
import EventItem from "../components/EventItem/EventItem";
import { pencilOutline } from "ionicons/icons";

import "./Events.css";
const Events: React.FC = () => {
  const test_events: Array<string> = [
    "Event 1",
    "Event 2",
    "Event 3",
    "Event 4",
  ];
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen class="content-style">
        <IonList lines="none">
          <IonListHeader class="custom-background">
            <IonTitle>Major Events</IonTitle>
          </IonListHeader>
          {test_events.map((ename: string) => (
            <EventItem eventName={ename} />
          ))}
        </IonList>
        <IonList lines="none">
          <IonListHeader class="custom-background">
            <IonTitle>Minor Events</IonTitle>
          </IonListHeader>
          {test_events.map((ename: string) => (
            <EventItem eventName={ename} />
          ))}
        </IonList>
        <IonFab slot="fixed" horizontal="end" vertical="bottom" edge>
          <IonFabButton>
            <IonIcon icon={pencilOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar></IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Events;

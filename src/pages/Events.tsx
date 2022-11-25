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
  const test_date = new Date();
  const test_events = [
    {
      eventName: "Event 1",
      startTime: test_date.getHours() + ":" + test_date.getMinutes(),
    },
    {
      eventName: "Event 2",
      startTime: test_date.getHours() + ":" + test_date.getMinutes(),
    },
    {
      eventName: "Event 3",
      startTime: test_date.getHours() + ":" + test_date.getMinutes(),
    },
    {
      eventName: "Event 4",
      startTime: test_date.getHours() + ":" + test_date.getMinutes(),
    },
  ];
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen class="content-style">
        <IonList lines="none">
          <IonListHeader class="custom-background">
            <IonTitle>Major Events</IonTitle>
          </IonListHeader>
          {test_events.map(({ eventName }) => (
            <EventItem eventName={eventName} />
          ))}
        </IonList>
        <IonList lines="none">
          <IonListHeader class="custom-background">
            <IonTitle>Minor Events</IonTitle>
          </IonListHeader>
          {test_events.map(({ eventName }) => (
            <EventItem eventName={eventName} />
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

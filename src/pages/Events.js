import { Link } from "react-router-dom";
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
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";

import EventItem from "../components/EventItem/EventItem";
import { pencilOutline } from "ionicons/icons";
import axios from "axios";

import "./Events.css";

// const baseUrl = "http://localhost:3001";
const baseUrl = "http://192.168.1.9:3001";

const Events = ({ events, setEvents }) => {
  const onRefresh = (e) => {
    setTimeout(async () => {
      const serverEvents = await axios.get(`${baseUrl}/api/events`);
      setEvents(serverEvents.data);
      console.log(events);
      e.detail.complete();
    }, 1000);
  };

  return (
    <IonPage>
      <IonContent fullscreen class="content-style">
        <IonRefresher
          slot="fixed"
          pullFactor={0.5}
          pullMin={100}
          pullMax={200}
          onIonRefresh={onRefresh}
        >
          <IonRefresherContent
            refreshingSpinner={"bubbles"}
          ></IonRefresherContent>
        </IonRefresher>
        <div className="center-events">
          <IonList lines="none">
            <IonListHeader class="custom-background">
              <IonTitle>Major Events</IonTitle>
            </IonListHeader>
            {events
              .filter((e) => e.eventType === "major")
              .map((eventInfo, i) => {
                return <EventItem key={i} eventInfo={eventInfo} />;
              })}
          </IonList>
          <IonList lines="none">
            <IonListHeader class="custom-background">
              <IonTitle>Minor Events</IonTitle>
            </IonListHeader>
            {events
              .filter((e) => e.eventType === "minor")
              .map((eventInfo, i) => {
                return <EventItem key={i} eventInfo={eventInfo} />;
              })}
          </IonList>
        </div>
        <IonFab slot="fixed" horizontal="end" vertical="bottom" edge>
          <IonFabButton>
            <Link to={"/add-event"}>
              <IonIcon icon={pencilOutline}></IonIcon>
            </Link>
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

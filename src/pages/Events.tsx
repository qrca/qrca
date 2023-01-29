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
  RefresherEventDetail,
} from "@ionic/react";

import EventItem from "../components/EventItem/EventItem";
import { pencilOutline } from "ionicons/icons";
import axios from "axios";

import "./Events.css";
import { useEffect, useState } from "react";

const baseUrl = "http://localhost:3001";

const Events: React.FC = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const serverEvents = await axios.get(`${baseUrl}/api/events`);
      setEvents(serverEvents.data);
      console.log(serverEvents.data);
    };

    getEvents();
  }, []);

  const onRefresh = (e: CustomEvent<RefresherEventDetail>) => {
    setTimeout(async () => {
      const serverEvents = await axios.get(`${baseUrl}/api/events`);
      setEvents(serverEvents.data);
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
              .filter((e: any) => e.eventType === "major")
              .map((eventInfo, i) => (
                <EventItem key={i} eventInfo={eventInfo} />
              ))}
          </IonList>
          <IonList lines="none">
            <IonListHeader class="custom-background">
              <IonTitle>Minor Events</IonTitle>
            </IonListHeader>
            {events
              .filter((e: any) => e.eventType === "minor")
              .map((eventInfo, i) => (
                <EventItem key={i} eventInfo={eventInfo} />
              ))}
          </IonList>
        </div>

        <IonFab slot="fixed" horizontal="end" vertical="bottom" edge>
          <IonFabButton>
            <Link to="/add-event">
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

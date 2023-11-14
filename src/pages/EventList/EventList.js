import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { getEvents } from "../../services/event";
import useEventStore from "../../store/events";
import Moment from "react-moment";

import "./EventList.css";

export default function EventList() {
  /**
   * showEventType
   * Mainly for visual purposes, serves no purpose in data manipulation
   */
  const [showEventType, setEventType] = useState("major");

  /**
   * Set Scanner / Events state
   * Check "store" directory for implementation
   */
  const events = useEventStore((state) => state.events);
  const setEvents = useEventStore((state) => state.setEvents);

  const onRefresh = (e) => {
    setTimeout(async () => {
      const serverEvents = await getEvents();
      setEvents(serverEvents.data);
      console.log({ events, message: "EventsList.js" });
      e.detail.complete();
    }, 1000);
  };

  const test_func = (e) => {
    setEventType(e.target.value);
  };
  if (events.length === 0) {
    return (
      <IonPage className="custom-event-list">
        <IonContent>
          <IonText color="primary">
            <h1 className="ion-padding-start">
              There are currently no events added.
            </h1>
          </IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="custom-event-list">
      <IonContent>
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
        <IonSegment value={showEventType} onIonChange={(e) => test_func(e)}>
          <IonSegmentButton value="major">
            <IonLabel>Events</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <div className="ion-margin-top">
          {events.map((e, i) => (
            <div key={i}>
              <IonCard
                className="ion-margin-start ion-margin-end"
                routerLink={`/fines/${e.id}`}
              >
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center">
                    {e.eventName}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className="ion-text-center">
                    Date: <Moment format="MMM DD, YYYY">{e.date}</Moment>
                  </p>
                  {/* <IonButton id="fines-btn">Show fines</IonButton> */}
                </IonCardContent>
              </IonCard>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
}

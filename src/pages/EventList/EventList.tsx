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
} from "@ionic/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";

import "./EventList.css";

export default function EventList() {
  const [showEventType, setEventType] = useState("major");

  const [events, setEvents] = useState<any[]>([]);

  const baseUrl = "http://localhost:3001";

  useEffect(() => {
    const getEvents = async () => {
      const serverEvents = await axios.get(`${baseUrl}/api/events`);
      setEvents(serverEvents.data);
    };

    getEvents();
  }, []);
  console.log(events);

  const test_func = (e: any) => {
    setEventType(e.target.value);
  };
  if (events.length === 0) {
    return <></>;
  }

  return (
    <IonPage className="custom-event-list">
      <IonContent>
        <IonSegment value={showEventType} onIonChange={(e) => test_func(e)}>
          <IonSegmentButton value="major">
            <IonLabel>Major</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="minor">
            <IonLabel>Minor</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <div className="ion-margin-top">
          {events
            .filter((e) => e.eventType === showEventType)
            .map((e, i) => (
              <div key={i}>
                <IonCard className="ion-margin-start ion-margin-end">
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                      {e.eventName}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className="ion-text-center">
                      Date: <Moment format="MMM DD, YYYY">{e.date}</Moment>
                    </p>
                  </IonCardContent>
                </IonCard>
              </div>
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
}

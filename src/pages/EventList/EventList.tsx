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
} from "@ionic/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import "./EventList.css";

export default function EventList() {
  const [showEventType, setEventType] = useState("major");

  const [events, setEvents] = useState<any[]>([]);

  const baseUrl = "https://qrca-api.onrender.com";
  // const baseUrl = "http://192.168.1.9:3001";

  useEffect(() => {
    const getEvents = async () => {
      const serverEvents = await axios.get(`${baseUrl}/api/events`);
      setEvents(serverEvents.data);
    };

    getEvents();
  }, []);

  const onRefresh = (e: any) => {
    setTimeout(async () => {
      const serverEvents = await axios.get(baseUrl + "/api/events");
      setEvents(serverEvents.data);
      e.detail.complete();
    }, 1000);
  };

  const test_func = (e: any) => {
    setEventType(e.target.value);
  };
  if (events.length === 0) {
    return <></>;
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
                <Link to={`/fines/${e.id}`} className="link">
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
                      {/* <IonButton id="fines-btn">Show fines</IonButton> */}
                    </IonCardContent>
                  </IonCard>
                </Link>
              </div>
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
}

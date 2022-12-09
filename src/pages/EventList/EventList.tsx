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
import { useState } from "react";

import "./EventList.css";

export default function EventList() {
  const test_date = new Date();
  const [showEventType, setEventType] = useState("major");
  const test_events = [
    {
      eventName: "Event 1",
      startTime: test_date.getHours() + ":" + test_date.getMinutes(),
      endTime: test_date.getHours() + ":" + test_date.getMinutes(),
      date: "Nov 2, 1999",
      eventType: "major",
    },
    {
      eventName: "Event 2",
      startTime: test_date.getHours() + ":" + test_date.getMinutes(),
      endTime: test_date.getHours() + ":" + test_date.getMinutes(),
      date: "Nov 2, 1999",
      eventType: "major",
    },
    {
      eventName: "Event 3",
      startTime: test_date.getHours() + ":" + test_date.getMinutes(),
      endTime: test_date.getHours() + ":" + test_date.getMinutes(),
      date: "Nov 2, 1999",
      eventType: "minor",
    },
    {
      eventName: "Event 4",
      startTime: test_date.getHours() + ":" + test_date.getMinutes(),
      endTime: test_date.getHours() + ":" + test_date.getMinutes(),
      date: "Nov 2, 1999",
      eventType: "minor",
    },
  ];

  const test_func = (e: any) => {
    setEventType(e.target.value);
  };
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
          {test_events
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
                    <p className="ion-text-center">Date: {e.date}</p>
                    <p className="ion-text-center">
                      Time: {e.startTime} - {e.endTime}
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

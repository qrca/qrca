import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import "./EventList.css";

export default function EventList() {
  const test_date = new Date();
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
  return (
    <IonPage>
      <IonContent>
        <div className="cards">
          {test_events.map((e) => (
            <IonCard>
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
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
}

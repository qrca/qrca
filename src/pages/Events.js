import {
  IonContent,
  IonPage,
  IonTitle,
  IonList,
  IonListHeader,
  IonFooter,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
} from "@ionic/react";

import EventItem from "../components/EventItem/EventItem";
import { getEvents } from "../services/event";
import useEventStore from "../store/events";

import "./Events.css";

const Events = ({ progress }) => {
  const events = useEventStore((state) => state.events);
  const setEvents = useEventStore((state) => state.setEvents);
  const onRefresh = (e) => {
    setTimeout(async () => {
      const serverEvents = await getEvents();
      setEvents(serverEvents.data);
      console.log({ events, message: "Events.js" });
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
              <IonTitle>Events</IonTitle>
            </IonListHeader>
            {progress && (
              <div class="skel-text">
                <p>
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "60%" }}
                  ></IonSkeletonText>
                </p>
                <p>
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "30%" }}
                  ></IonSkeletonText>
                </p>
              </div>
            )}
            {events.map((eventInfo, i) => {
              return <EventItem key={i} eventInfo={eventInfo} />;
            })}
          </IonList>
          {/* <IonList lines="none">
            <IonListHeader class="custom-background">
              <IonTitle>Minor Events</IonTitle>
            </IonListHeader>
            {progress && (
              <div class="skel-text">
                <p>
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "60%" }}
                  ></IonSkeletonText>
                </p>
                <p>
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "30%" }}
                  ></IonSkeletonText>
                </p>
              </div>
            )}
            {events
              .filter((e) => e.eventType === "minor")
              .map((eventInfo, i) => {
                return <EventItem key={i} eventInfo={eventInfo} />;
              })}
          </IonList> */}
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar></IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Events;

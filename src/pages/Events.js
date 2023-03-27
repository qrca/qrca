import {
  IonContent,
  IonPage,
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
import { useState, useRef, useEffect } from "react";
import moment from "moment";

import "./Events.css";

const Events = ({ progress }) => {
  const events = useEventStore((state) => state.events);
  const setEvents = useEventStore((state) => state.setEvents);
  const [filterEvent, setFilterEvent] = useState("Incoming");
  const [isActive, setIsActive] = useState(false);
  const onRefresh = (e) => {
    setTimeout(async () => {
      const serverEvents = await getEvents();
      setEvents(serverEvents.data);
      console.log({ events, message: "Events.js" });
      e.detail.complete();
    }, 1000);
  };

  useEffect(() => {
    setIsActive(true);
  }, [filterEvent]);

  const incoming = useRef(null);
  const archive = useRef(null);

  const onIncomingClick = (e) => {
    e.target.classList.add("active");
    archive.current.classList.remove("active");
    setIsActive(false);
    setFilterEvent("Incoming");
  };

  const onArchiveClick = (e) => {
    e.target.classList.add("active");
    incoming.current.classList.remove("active");
    setIsActive(false);
    setFilterEvent("Archive");
  };

  const filterEvents = events.filter((event) => {
    if (filterEvent === "Incoming") {
      console.log(moment().isBefore(moment(event.date)));
      return moment().isBefore(moment(event.date));
    } else {
      console.log(moment(event.date).isBefore(moment()));
      return moment(event.date).isBefore(moment());
    }
  });

  console.log(filterEvents);

  return (
    <IonPage>
      <IonContent fullscreen className="content-style">
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
            <IonListHeader className="custom-background-event">
              <div className="title-event">Events</div>
              <div className="filter-buttons-container">
                <div
                  className="filter-button active"
                  onClick={onIncomingClick}
                  ref={incoming}
                >
                  Incoming
                </div>
                <div
                  className="filter-button"
                  onClick={onArchiveClick}
                  ref={archive}
                >
                  Archived
                </div>
              </div>
            </IonListHeader>
            {progress && (
              <div className="skel-text">
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
            {filterEvents.length !== 0 &&
              filterEvents.map((eventInfo, i) => {
                return <EventItem key={i} eventInfo={eventInfo} />;
              })}
            {!progress && filterEvents.length === 0 && (
              <div className="messageNoEvent">
                There are no events in this section.
              </div>
            )}
            <div className="some-margin"></div>
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

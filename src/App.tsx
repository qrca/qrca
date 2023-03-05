import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import axios from "axios";

import AddEvent from "./pages/AddEvent/AddEvent";
import Header from "./components/Header/Header";
import Events from "./pages/Events";
import Scan from "./pages/Scan/Scan";
import EventList from "./pages/EventList/EventList";
import Fines from "./pages/Fines/Fines";
import { calendar, cardOutline, addCircleOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

// /* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [progress, setProgress] = useState(true);

  // const baseUrl = "https://qrca-api.onrender.com";
  // const baseUrl = "http://192.168.1.9:3001";
  const baseUrl = "http://localhost:3001";

  useEffect(() => {
    const getEvents = async () => {
      await axios.get(`${baseUrl}/api/events`).then((res) => {
        setProgress(false);
        setEvents(res.data);
        console.log(res.data);
      });
    };

    getEvents();
  }, []);

  return (
    <IonApp>
      <Header />
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/fines/:id">
              <Fines events={events} />
            </Route>
            <Route path="/event-list">
              <EventList events={events} setEvents={setEvents} />
            </Route>
            <Route path="/scan/:id">
              <Scan eventInfo={events} />
            </Route>
            <Route exact path="/add-event">
              <AddEvent />
            </Route>
            <Route exact path="/">
              <Events
                events={events}
                setEvents={setEvents}
                progress={progress}
              />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" className="custom-background">
            <IonTabButton href="/" tab="events">
              <IonIcon icon={calendar} />
              <IonLabel>Events</IonLabel>
            </IonTabButton>

            <IonTabButton href="/event-list" tab="fines">
              <IonIcon icon={cardOutline} aria-hidden="true" />
              <IonLabel>Fines</IonLabel>
            </IonTabButton>

            <IonTabButton href="/add-event" tab="add">
              <IonIcon icon={addCircleOutline} aria-hidden="true" />
              <IonLabel>Add</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

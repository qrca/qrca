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
import { getEvents } from "./services/event";
import useEventStore from "./store/events";

import AddEvent from "./pages/AddEvent/AddEvent";
import Header from "./components/Header/Header";
import Events from "./pages/Events";
import Scan from "./pages/Scan/Scan";
import EventList from "./pages/EventList/EventList";
import Fines from "./pages/Fines/Fines";
import Password from "./pages/Password/Password";
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
import "./App.css";

setupIonicReact();

const App: React.FC = () => {
  const setEvents = useEventStore((state) => state.setEvents);
  // const [events, setEvents] = useState([]);
  const [progress, setProgress] = useState(true);

  useEffect(() => {
    getEvents().then((res) => {
      setProgress(false);
      setEvents(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonApp>
      <Header />
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/fines/:id">
              <Fines />
            </Route>
            <Route path="/event-list">
              <EventList />
            </Route>
            <Route path="/scan/:id">
              <Scan />
            </Route>
            <Route exact path="/add-event">
              <AddEvent />
            </Route>
            <Route exact path="/home">
              <Events progress={progress} />
            </Route>
            <Route path="/" exact>
              <Password />
            </Route>
          </IonRouterOutlet>

          <IonTabBar
            slot="bottom"
            className="custom-background"
            id="app-tab-bar"
          >
            <IonTabButton className="tab-bar-custom" href="/home" tab="events">
              <IonIcon icon={calendar} />
              <IonLabel>Events</IonLabel>
            </IonTabButton>

            <IonTabButton
              className="tab-bar-custom"
              href="/event-list"
              tab="fines"
            >
              <IonIcon icon={cardOutline} aria-hidden="true" />
              <IonLabel>Fines</IonLabel>
            </IonTabButton>

            <IonTabButton
              className="tab-bar-custom"
              href="/add-event"
              tab="add"
            >
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

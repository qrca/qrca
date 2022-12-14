import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import axios from "axios";
import Header from "./components/Header/Header";
// import { ellipse, square, triangle } from "ionicons/icons";
import Events from "./pages/Events";
import AddEvent from "./pages/AddEvent/AddEvent";
import Scan from "./pages/Scan/Scan";
import EventList from "./pages/EventList/EventList";
import Login from "./components/Login/Login";

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
  const [showLogin, setShowLogin] = useState(false);
  const [events, setEvents] = useState([]);

  const baseUrl = "http://localhost:3001";

  useEffect(() => {
    const getEvents = async () => {
      const serverEvents = await axios.get(`${baseUrl}/api/events`);
      setEvents(serverEvents.data);
      console.log(serverEvents.data);
    };

    getEvents();
  }, []);

  return (
    <IonApp>
      <Header setShowLogin={setShowLogin} />
      <Login show={showLogin} />
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/event-list">
            <EventList />
          </Route>
          <Route path="/scan/:id">
            <Scan eventInfo={events} />
          </Route>
          <Route exact path="/add-event">
            <AddEvent />
          </Route>
          <Route exact path="/">
            <Events />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Header from "./components/Header/Header";
// import { ellipse, square, triangle } from "ionicons/icons";
import Events from "./pages/Events";
import AddEvent from "./pages/AddEvent/AddEvent";
import Scan from "./pages/Scan/Scan";

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
  const test_date = new Date();
  return (
    <IonApp>
      <Header />
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/scan">
            <Scan
              eventName="Event 1"
              startTime={test_date.getHours() + ":" + test_date.getMinutes()}
              endTime={test_date.getHours() + ":" + test_date.getMinutes()}
            />
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

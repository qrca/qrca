import { IonText, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import "./EventItem.css";

const EventItem = ({ eventName }: { eventName: string }) => {
  return (
    <div className="item-style">
      <IonText>
        <span className="font-style light-font">{eventName}</span>
      </IonText>
      <div className="line"></div>
      <IonButton>
        <Link to="/scan">
          <span className="font-style">Scan</span>
        </Link>
      </IonButton>
    </div>
  );
};

export default EventItem;

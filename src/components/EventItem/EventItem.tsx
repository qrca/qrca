import { IonText, IonButton } from "@ionic/react";
import "./EventItem.css";

const EventItem = ({ eventName }: { eventName: string }) => {
  return (
    <div className="item-style">
      <IonText>
        <span className="font-style light-font">{eventName}</span>
      </IonText>
      <div className="line"></div>
      <IonButton>
        <span className="font-style">Scan</span>
      </IonButton>
    </div>
  );
};

export default EventItem;

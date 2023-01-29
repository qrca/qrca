import { IonText, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import "./EventItem.css";

const EventItem = ({ eventInfo }: { eventInfo: any }) => {
  return (
    <div className="item-style">
      <IonText>
        <div className="font-style light-font">{eventInfo.eventName}</div>
      </IonText>
      {/* <div className="line"></div> */}
      <IonButton class="custom-ion-btn">
        <Link to={`/scan/${eventInfo.id}`} className="link">
          <span className="font-style">Scan</span>
        </Link>
      </IonButton>
    </div>
  );
};

export default EventItem;

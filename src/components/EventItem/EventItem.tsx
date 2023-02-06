import { IonText, IonButton } from "@ionic/react";
import "./EventItem.css";

const EventItem = ({ eventInfo }: { eventInfo: any }) => {
  return (
    <div className="item-style">
      <IonText>
        <div className="font-style light-font">{eventInfo.eventName}</div>
      </IonText>
      {/* <div className="line"></div> */}
      <IonButton class="custom-ion-btn" routerLink={`/scan/${eventInfo.id}`}>
        <span className="font-style">Scan</span>
      </IonButton>
    </div>
  );
};

export default EventItem;

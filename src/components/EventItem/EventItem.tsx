import { IonText, IonButton } from "@ionic/react";
import "./EventItem.css";

/**
 * Note: `Used for rendering fines of students`
 * @component
 * @param eventInfo, a singular item in the array returned by the `event service`
 * Check `service` folder for implementation
 */

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

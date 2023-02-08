import { IonHeader, IonImg } from "@ionic/react";
import "./Header.css";
import logo from "../../assets/acs_logo.png";

const Header = () => {
  return (
    <IonHeader class="ion-padding-bottom ion-no-border">
      <IonImg
        src={logo}
        alt={"ACS Logo"}
        class="img-size ion-margin-top ion-margin-start"
      />
    </IonHeader>
  );
};

export default Header;

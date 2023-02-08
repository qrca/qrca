import { IonHeader, IonImg } from "@ionic/react";
import "./Header.css";
import logo from "../../assets/acs_logo.png";

const Header = () => {
  return (
    <IonHeader class="header-background ion-padding-bottom">
      <IonImg
        src={logo}
        alt={"ACS Logo"}
        class="img-size ion-no-border ion-margin-top ion-margin-start"
      />
    </IonHeader>
  );
};

export default Header;

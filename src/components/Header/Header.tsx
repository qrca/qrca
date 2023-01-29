import { IonHeader, IonImg } from "@ionic/react";
import "./Header.css";
import logo from "../../assets/acs_logo.png";

const Header = () => {
  return (
    <IonHeader class="ion-no-border ion-margin-top ion-margin-start">
      <IonImg src={logo} alt={"ACS Logo"} class="img-size" />
    </IonHeader>
  );
};

export default Header;

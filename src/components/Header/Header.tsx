import { IonHeader, IonImg } from "@ionic/react";
import "./Header.css";
import logo from "../../assets/acs_logo.png";

const Header = () => {
  return (
    <IonHeader className="ion-padding-bottom ion-no-border" id="header-icon">
      <IonImg
        src={logo}
        alt={"ACS Logo"}
        className="img-size ion-margin-top ion-margin-start"
      />
    </IonHeader>
  );
};

export default Header;

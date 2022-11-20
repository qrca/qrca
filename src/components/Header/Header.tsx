import { IonHeader, IonToolbar, IonImg } from "@ionic/react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Header.css";
import logo from "../../assets/acs_logo.png";

const Header: React.FC = () => {
  return (
    <IonHeader class="ion-no-border">
      <IonToolbar class="custom-toolbar">
        <div className="toolbar-container">
          <GiHamburgerMenu size={28} />
          <IonImg src={logo} alt={"ACS Logo"} class="img-size" />
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;

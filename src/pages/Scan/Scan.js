import { IonPage, IonContent, IonButton } from "@ionic/react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

import "./Scan.css";

export default function Scan({ eventName, startTime, endTime }) {
  const startScan = async () => {
    // Check camera permission
    await BarcodeScanner.checkPermission({ force: true });
    console.log("hi");

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="custom-scan">
          <h1>{eventName}</h1>
          <h3 className="custom-subtitle">
            Time: {startTime} - {endTime}
          </h3>
          <div className="btn-margin">
            <IonButton class="custom-ion-btn" onClick={startScan}>
              Scan
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

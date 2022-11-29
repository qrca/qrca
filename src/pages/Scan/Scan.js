import { IonPage, IonContent, IonButton } from "@ionic/react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

import "./Scan.css";
import { useEffect, useState } from "react";

export default function Scan({ eventName, startTime, endTime }) {
  const [hideBg, setHideBg] = useState("");
  const [hideBox, setHideBox] = useState("hideBox");
  useEffect(() => {
    const checkPermission = async () => {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        return true;
      }

      return false;
    };
    checkPermission();
  }, []);

  const startScan = async () => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });
    setHideBg("hideBg");
    setHideBox("");

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();
    document.querySelector("body").classList.add("scanner-active");

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    stopScan();
    setHideBox("hideBox");

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    setHideBg("");
    setHideBox("hideBox");
    document.querySelector("body").classList.remove("scanner-active");
  };

  return (
    <IonPage>
      <IonContent className="hideBg" hidden={!!hideBg}>
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
      <div hidden={!hideBg} className="scan-box"></div>
      <IonButton
        hidden={!hideBg}
        class="custom-ion-btn stop-btn"
        onClick={stopScan}
      >
        Stop
      </IonButton>
    </IonPage>
  );
}

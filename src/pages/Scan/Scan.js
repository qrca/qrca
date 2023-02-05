import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useParams } from "react-router";
import Moment from "react-moment";
import "moment-timezone";
import axios from "axios";

import "./Scan.css";
import { useEffect, useState } from "react";

const base_url = "http://localhost:3001/api/events/";

export default function Scan({ eventInfo }) {
  let { id } = useParams();
  const event = eventInfo.filter((e) => e.id === id)[0];
  console.log("eventinfo", eventInfo);

  const [hideBg, setHideBg] = useState("");
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

  // const updateStudent = async (student_id) => {
  //   await axios.put();
  // };

  const startScan = async () => {
    // Check camera permission
    await BarcodeScanner.checkPermission({ force: true });
    setHideBg("hideBg");

    // make background of WebView transparent
    BarcodeScanner.hideBackground();
    document.querySelector("body").classList.add("scanner-active");

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    stopScan();

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    setHideBg("");
    document.querySelector("body").classList.remove("scanner-active");
  };

  return (
    <IonPage>
      <IonContent className="hideBg" hidden={!!hideBg}>
        <div className="custom-scan">
          <h1>{event.eventName}</h1>
          <IonList>
            <IonItem>
              <IonSelect placeholder="Select time">
                <IonSelectOption value={event.in1}>
                  <Moment format="hh:mm a">{event.in1}</Moment> -{" "}
                  <Moment format="hh:mm a">{event.inEnd1}</Moment>
                </IonSelectOption>
                <IonSelectOption value={event.in2}>
                  <Moment format="hh:mm a">{event.in2}</Moment> -{" "}
                  <Moment format="hh:mm a">{event.inEnd2}</Moment>
                </IonSelectOption>
                <IonSelectOption value={event.out1}>
                  <Moment format="hh:mm a">{event.out1}</Moment> -{" "}
                  <Moment format="hh:mm a">{event.outEnd1}</Moment>
                </IonSelectOption>
                <IonSelectOption value={event.out2}>
                  <Moment format="hh:mm a">{event.out2}</Moment> -{" "}
                  <Moment format="hh:mm a">{event.outEnd2}</Moment>
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

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

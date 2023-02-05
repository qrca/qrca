import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  useIonToast,
} from "@ionic/react";
import {
  BarcodeScanner,
  SupportedFormat,
} from "@capacitor-community/barcode-scanner";
import { useParams } from "react-router";
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import axios from "axios";

import "./Scan.css";
import { useEffect, useState } from "react";

const baseUrl = "https://qrca-api.onrender.com/api/events/";
// const baseUrl = "http://192.168.1.9:3001/api/events/";

const logStudent = async (eventId, data) => {
  await axios.put(baseUrl + eventId, data);
};

export default function Scan({ eventInfo }) {
  let { id } = useParams();
  const event = eventInfo.filter((e) => e.id === id)[0];

  const [hideBg, setHideBg] = useState("");
  const [logCat, setLogCat] = useState("");
  const [present] = useIonToast();

  const presentToast = (
    student,
    message = "Please select a timeframe to log first."
  ) => {
    if (student === "") {
      present({
        message,
        duration: 1500,
        position: "bottom",
      });
    } else {
      present({
        message: `${student} has been logged.`,
        duration: 1500,
        position: "bottom",
      });
    }
  };

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
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.denied) {
      // the user denied permission for good
      // redirect user to app settings if they want to grant it anyway
      // eslint-disable-next-line no-restricted-globals
      const c = confirm(
        "If you want to grant permission for using your camera, enable it in the app settings."
      );
      if (c) {
        BarcodeScanner.openAppSettings();
      }
    }
    setHideBg("hideBg");

    // make background of WebView transparent
    BarcodeScanner.hideBackground();
    document.querySelector("body").classList.add("scanner-active");

    // const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    // // stopScan();

    // // if the result has content
    // if (result.hasContent) {
    //   console.log(result.content); // log the raw scanned content
    // }

    const test = await BarcodeScanner.startScanning(
      { targetedFormats: [SupportedFormat.QR_CODE] },
      (result) => {
        BarcodeScanner.pauseScanning();
        const name = result.content.split("~")[1];
        const studentId = result.content.split("~")[0].trim();
        const logTime = moment().toISOString();
        if (logCat === "") {
          presentToast("");
        } else if (logCat === "login1") {
          const data = {
            studentId,
            login1: logTime,
          };
          console.log(data);
          logStudent(id, data);

          presentToast(name);
        } else if (logCat === "login2") {
          const data = {
            studentId,
            login2: logTime,
          };
          console.log(data);
          logStudent(id, data);

          presentToast(name);
        } else if (logCat === "logout1") {
          const data = {
            studentId,
            logout1: logTime,
          };
          console.log(data);
          logStudent(id, data);

          presentToast(name);
        } else if (logCat === "logout2") {
          const data = {
            studentId,
            logout2: logTime,
          };
          console.log(data);
          logStudent(id, data);

          presentToast(name);
        }
        setTimeout(1500);
        BarcodeScanner.resumeScanning();
      }
    );
    console.log(test);
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
              <IonSelect
                placeholder="Select time"
                onIonChange={(e) => setLogCat(e.target.value)}
              >
                <IonSelectOption value="login1">
                  <Moment format="hh:mm a">{event.in1}</Moment> -{" "}
                  <Moment format="hh:mm a">{event.inEnd1}</Moment>
                </IonSelectOption>
                <IonSelectOption value="login2">
                  <Moment format="hh:mm a">{event.in2}</Moment> -{" "}
                  <Moment format="hh:mm a">{event.inEnd2}</Moment>
                </IonSelectOption>
                <IonSelectOption value="logout1">
                  <Moment format="hh:mm a">{event.out1}</Moment> -{" "}
                  <Moment format="hh:mm a">{event.outEnd1}</Moment>
                </IonSelectOption>
                <IonSelectOption value="logout2">
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

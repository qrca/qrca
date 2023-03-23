import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  useIonToast,
  IonSpinner,
  IonModal,
  IonInput,
  IonLabel,
  IonToolbar,
  IonHeader,
  IonButtons,
} from "@ionic/react";
import {
  BarcodeScanner,
  SupportedFormat,
} from "@capacitor-community/barcode-scanner";
import { useParams } from "react-router";
import Moment from "react-moment";
import moment from "moment-timezone";
import "moment-timezone";
import axios from "axios";

import "./Scan.css";
import { useEffect, useState, useRef } from "react";

// const baseUrl = "https://qrca-api.onrender.com/api/events/";
// const baseUrl = "http://192.168.1.9:3001/api/events/";
const baseUrl = "http://localhost:3001/api/events";

export default function Scan({ eventInfo }) {
  let { id } = useParams();
  const [isSending, setIsSending] = useState(false);
  const event = eventInfo.filter((e) => e.id === id)[0];

  const [hideBg, setHideBg] = useState("");
  const [logCat, setLogCat] = useState("");
  const [present] = useIonToast();

  const modal = useRef(null);
  const input = useRef(null);

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

  const manualLog = (sId) => {
    setIsSending(true);
    const student = event.studentLogs.filter((s) => s.student._id === sId);
    if (logCat === "") {
      setIsSending(false);
      presentToast("");
    } else if (student.length === 0) {
      setIsSending(false);
      presentToast("", `Student with ID ${sId} doesn't exist`);
    } else {
      const logTime = moment().tz("Asia/Manila").format();
      const name = student[0].student.name;

      if (logCat === "login1") {
        const data = {
          studentId: sId,
          login1: logTime,
        };

        axios.put(baseUrl + id, data).then(() => {
          setIsSending(false);
          presentToast(name);
        });
      } else if (logCat === "login2") {
        const data = {
          studentId: sId,
          login2: logTime,
        };
        axios
          .put(baseUrl + id, data)
          .then(() => {
            setIsSending(false);
            presentToast(name);
          })
          .catch((e) => {
            setIsSending(false);
            presentToast("", e.message);
          });
      } else if (logCat === "logout1") {
        const data = {
          studentId: sId,
          logout1: logTime,
        };
        axios
          .put(baseUrl + id, data)
          .then(() => {
            setIsSending(false);
            presentToast(name);
          })
          .catch((e) => {
            setIsSending(false);
            presentToast("", e.message);
          });
      } else if (logCat === "logout2") {
        const data = {
          studentId: sId,
          logout2: logTime,
        };
        axios
          .put(baseUrl + id, data)
          .then(() => {
            setIsSending(false);
            presentToast(name);
          })
          .catch((e) => {
            setIsSending(false);
            presentToast("", e.message);
          });
      }
    }
  };

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
        const logTime = moment().tz("Asia/Manila").format();

        setIsSending(true);
        if (logCat === "") {
          presentToast("");
        } else if (logCat === "login1") {
          const data = {
            studentId,
            login1: logTime,
          };
          console.log(baseUrl + id, data);
          axios.put(baseUrl + id, data).then(() => {
            setIsSending(false);
            setTimeout(BarcodeScanner.resumeScanning, 1500);
            presentToast(name);
          });
        } else if (logCat === "login2") {
          const data = {
            studentId,
            login2: logTime,
          };
          console.log("hihih");
          axios.put(baseUrl + id, data).then(() => {
            setIsSending(false);
            setTimeout(BarcodeScanner.resumeScanning, 1500);
            presentToast(name);
          });
        } else if (logCat === "logout1") {
          const data = {
            studentId,
            logout1: logTime,
          };
          console.log(data);
          axios.put(baseUrl + id, data).then(() => {
            setIsSending(false);
            setTimeout(BarcodeScanner.resumeScanning, 1500);
            presentToast(name);
          });
        } else if (logCat === "logout2") {
          const data = {
            studentId,
            logout2: logTime,
          };
          console.log(data);
          axios.put(baseUrl + id, data).then(() => {
            setIsSending(false);
            setTimeout(BarcodeScanner.resumeScanning, 1500);
            presentToast(name);
          });
        }
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
        <IonModal ref={modal} trigger="open-modal">
          <IonContent>
            <IonHeader className="ion-padding-bottom ion-padding-top">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton
                    className="ion-margin-start"
                    onClick={() => modal.current?.dismiss()}
                  >
                    Cancel
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonItem className="ion-margin-start ion-margin-end">
              <IonLabel position="stacked">Enter Student ID:</IonLabel>
              <IonInput ref={input} type="text" placeholder="XXXX-XX-XXXX" />
            </IonItem>
            <div className="center-input">
              {!isSending && (
                <IonButton
                  className="custom-ion-btn ion-margin-top"
                  onClick={() => manualLog(input.current?.value)}
                >
                  Submit
                </IonButton>
              )}
              {isSending && <IonSpinner name="circular"></IonSpinner>}
            </div>
          </IonContent>
        </IonModal>
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
                <IonSelectOption value="logout1">
                  <Moment format="hh:mm a">{event.out1}</Moment> -{" "}
                  <Moment format="hh:mm a">{event.outEnd1}</Moment>
                </IonSelectOption>
                <IonSelectOption value="login2">
                  <Moment format="hh:mm a">{event.in2}</Moment> -{" "}
                  <Moment format="hh:mm a">{event.inEnd2}</Moment>
                </IonSelectOption>
                <IonSelectOption value="logout2">
                  <Moment format="hh:mm a">{event.out2}</Moment> -{" "}
                  <Moment format="hh:mm a">{event.outEnd2}</Moment>
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <div className="btn-margin">
            <IonButton
              className="custom-ion-btn manual-input"
              id="open-modal"
              expand="block"
            >
              Manual Input
            </IonButton>
            <IonButton className="custom-ion-btn" onClick={startScan}>
              Scan
            </IonButton>
          </div>
        </div>
      </IonContent>
      <div hidden={!hideBg} className="scan-box">
        {isSending && (
          <div className="center-loading">
            <IonSpinner name="circular"></IonSpinner>
          </div>
        )}
      </div>
      <IonButton
        hidden={!hideBg}
        className="custom-ion-btn stop-btn"
        onClick={stopScan}
      >
        Stop
      </IonButton>
    </IonPage>
  );
}

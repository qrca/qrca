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
import useEventStore from "../../store/events";

import "./Scan.css";
import { useEffect, useState, useRef } from "react";

// const baseUrl = "http://192.168.1.6:3001/api/events/";
const baseUrl = "http://localhost:3001/api/events";

export default function Scan() {
  let { id } = useParams();

  /**
   * Mainly for visual purposes, no use in actual data manipulation
   */
  const [isSending, setIsSending] = useState(false);

  /**
   * Event store, check the "store" directory for implementation.
   * Returns different states inside the store
   */
  const events = useEventStore((state) => state.events);
  const scanner = useEventStore((state) => state.scanner);

  const event = events.filter((e) => e.id === id)[0];

  /**
   * Mainly for visual purposes (present, hideBg, logCat), no use in actual data manipulation
   */
  const [hideBg, setHideBg] = useState("");
  const [logCat, setLogCat] = useState("");
  const [present] = useIonToast();

  const modal = useRef(null);
  const input = useRef(null);

  /**
   * Used in input validation, reminds the user to select a timeframe for an event in the Scan page
   */
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

  /**
   * Checks for permission within the phone
   * If not permitted, QR Scanner will not be opened.
   */
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

  /**
   * Manual Login for students with no QR Code
   * Note: `should not be used in controller`
   * @param sId - Student ID (20XX-X-XXXX)
   * @returns none
   */
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
          scanIn1: scanner,
        };

        axios.put(baseUrl + id, data).then(() => {
          setIsSending(false);
          presentToast(name);
        });
      } else if (logCat === "login2") {
        const data = {
          studentId: sId,
          login2: logTime,
          scanIn2: scanner,
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
          scanOut1: scanner,
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
          scanOut2: scanner,
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
    /**
     * Dear future me:
     * I have spent lots of time tweaking the shit out of this abomination of a code
     * to make sure it works on "most" devices. The rabbit hole that I have dived deep
     * on left a scar in my heart that will never be healed, hence why I recommend you to
     * turn your back and leave immediately in order to save yourself from the trauma that
     * I have experienced. However, if you ever feel brave on tackling this problem that
     * the dumb past you has forsaken, please feel free to do so. In the event that you
     * are unable to fix it, please increment the counter below to remind the future us
     * that it will be an arduous task to try and cover all test cases. I wish you good luck
     * in your useless endeavors:
     * Hours wasted: 25
     */

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
            scanIn1: scanner,
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
            scanIn2: scanner,
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
            scanOut1: scanner,
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
            scanOut2: scanner,
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

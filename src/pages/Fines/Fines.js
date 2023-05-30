import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonCardContent,
  IonSearchbar,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonSpinner,
} from "@ionic/react";

import ExportAttendance from "../../components/Export/Export";

import useEventStore from "../../store/events";
import { useParams } from "react-router";
import "./Fines.css";
import Moment from "react-moment";
import { calculateFines } from "../../utils/utils";
import { excuseStudent } from "../../services/event";
import { getEvents } from "../../services/event";

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}

export default function Fines() {
  // const downloadUrl = "https://qrca-api.onrender.com/api/download";
  // const downloadUrl = "http://192.168.1.6:3001/api/events/";
  // const downloadUrl = "http://localhost:3001/api/events";
  let { id } = useParams();
  const events = useEventStore((state) => state.events);
  const event = events.filter((e) => e.id === id)[0];

  const [filter, setFilter] = useState("");
  const [count, setCount] = useState(10);
  const [excuseProgress, setExcuseProgress] = useState(false);
  const students = calculateFines(event);
  const setEvents = useEventStore((state) => state.setEvents);

  const generateItems = () => {
    setCount((c) => c + 10);
  };

  if (event.length === 0) {
    return <></>;
  }
  // console.log({ students });
  const filteredStudents = students
    .filter(
      (s) => s.student.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    )
    .slice(0, count);

  const onExcuse = async (studentId) => {
    setExcuseProgress(true);
    console.log("excuse");
    excuseStudent(studentId, id)
      .then((res) => {
        getEvents().then((res) => {
          setEvents(res.data);
        });
        setExcuseProgress(false);
        console.log(res);
      })
      .catch((err) => {
        setExcuseProgress(false);
        console.log(err);
      });
  };

  return (
    <IonPage>
      <IonContent>
        <IonSearchbar
          className="bar-style"
          showClearButton="focus"
          showCancelButton="focus"
          onIonChange={(e) => {
            setFilter(e.target.value);
          }}
        ></IonSearchbar>
        <div className="studentList">
          <IonList class="reposition-list">
            <ExportAttendance event={event} />
            {/* <IonButton
              href={`${downloadUrl}/${id}`}
              download=""
              target="_blank"
              className="excel-button fines-button"
              fill="clear"
            >
              Download Excel File
            </IonButton> */}
            {filteredStudents.map((s, i) => (
              <div key={i}>
                <IonCardContent>
                  <IonAccordionGroup className="ion-margin-bottom">
                    <IonAccordion>
                      <IonItem slot="header">
                        <IonLabel>
                          {truncateString(s.student.name, 20)} || Total Fines:{" "}
                          {s.fine}
                        </IonLabel>
                        <br />
                      </IonItem>

                      {!s.isExcused && (
                        <div className="ion-padding" slot="content">
                          <p>
                            Morning Login:{" "}
                            {event.in1 !== null
                              ? `Php ${s.fine1} - Log: `
                              : "N/A"}
                            {s.login1 !== null && (
                              <Moment format="hh:mm a">{s.login1}</Moment>
                            )}
                          </p>
                          <p>Scanned by: {s.scanIn1}</p>
                          <p>
                            Morning Logout:{" "}
                            {event.out1 !== null
                              ? `Php ${s.fine3} - Log: `
                              : "N/A"}
                            {s.logout1 !== null && (
                              <Moment format="hh:mm a">{s.logout1}</Moment>
                            )}
                          </p>
                          <p>Scanned by: {s.scanOut1}</p>

                          <p>
                            Afternoon Login:{" "}
                            {event.in2 !== null
                              ? `Php ${s.fine2} - Log: `
                              : "N/A"}
                            {s.login2 !== null && (
                              <Moment format="hh:mm a">{s.login2}</Moment>
                            )}
                          </p>
                          <p>Scanned by: {s.scanIn2}</p>

                          <p>
                            Afternoon Logout:{" "}
                            {event.out2 !== null
                              ? `Php ${s.fine4} - Log: `
                              : "N/A"}
                            {s.logout2 !== null && (
                              <Moment format="hh:mm a">{s.logout2}</Moment>
                            )}
                          </p>
                          <p>Scanned by: {s.scanOut2}</p>

                          {/* <p>Wholeday Absent fines:{s.wholeDay}</p> */}
                          {!excuseProgress && (
                            <IonButton
                              onClick={() => onExcuse(s.student._id)}
                              fill="clear"
                              className="fines-button"
                            >
                              Excuse student
                            </IonButton>
                          )}
                          {excuseProgress && (
                            <IonSpinner
                              name="circular"
                              className="center-spinner"
                            ></IonSpinner>
                          )}
                        </div>
                      )}
                      {s.isExcused && (
                        <div className="ion-padding" slot="content">
                          Student is excused
                        </div>
                      )}
                      {/* <p>Student is excused</p> */}
                    </IonAccordion>
                  </IonAccordionGroup>
                </IonCardContent>
              </div>
            ))}
          </IonList>
        </div>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            generateItems();
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
}

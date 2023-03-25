import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSearchbar,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonText,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
} from "@ionic/react";

import { useParams } from "react-router";
import "./Fines.css";
import Moment from "react-moment";
import { calculateFines } from "../../utils/utils";

// const baseUrl = "https://qrca-api.onrender.com/api/events/";
// const baseUrl = "http://192.168.1.9:3001/api/events/";
// const baseUrl = "http://localhost:3001/api/events/";

export default function Fines({ events }) {
  let { id } = useParams();
  const event = events.filter((e) => e.id === id)[0];

  const [filter, setFilter] = useState("");
  const [count, setCount] = useState(10);
  const students = calculateFines(event);

  const generateItems = () => {
    setCount((c) => c + 10);
  };

  if (event.length === 0) {
    return <></>;
  }
  console.log({ students });
  const filteredStudents = students
    .filter(
      (s) => s.student.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    )
    .slice(0, count);

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
            <IonButton
              href={`http://192.168.1.9:3001/api/download/${id}`}
              download=""
              target="_blank"
            >
              test
            </IonButton>
            {filteredStudents.map((s, i) => (
              <div key={i}>
                <IonCard className="ion-margin-start ion-margin-end">
                  <IonCardHeader>
                    <IonCardTitle className="">{s.student.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonAccordionGroup className="ion-margin-bottom">
                      <IonAccordion>
                        <IonItem slot="header">
                          <IonLabel>Fine Breakdown</IonLabel>
                        </IonItem>
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
                          <p>
                            Morning Logout:{" "}
                            {event.out1 !== null
                              ? `Php ${s.fine3} - Log: `
                              : "N/A"}
                            {s.logout1 !== null && (
                              <Moment format="hh:mm a">{s.logout1}</Moment>
                            )}
                          </p>
                          <p>
                            Afternoon Login:{" "}
                            {event.in2 !== null
                              ? `Php ${s.fine2} - Log: `
                              : "N/A"}
                            {s.login2 !== null && (
                              <Moment format="hh:mm a">{s.login2}</Moment>
                            )}
                          </p>
                          <p>
                            Afternoon Logout:{" "}
                            {event.out2 !== null
                              ? `Php ${s.fine4} - Log: `
                              : "N/A"}
                            {s.logout2 !== null && (
                              <Moment format="hh:mm a">{s.logout2}</Moment>
                            )}
                          </p>
                          <p>Wholeday Absent fines:{s.wholeDay}</p>
                        </div>
                      </IonAccordion>
                    </IonAccordionGroup>
                    <IonText>Total Fines: {s.fine}</IonText>
                  </IonCardContent>
                </IonCard>
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

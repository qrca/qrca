import React, { useEffect, useState } from "react";
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
} from "@ionic/react";
import { useParams } from "react-router";
import axios from "axios";
import "./Fines.css";
import moment from "moment";

// const baseUrl = "http://localhost:3001/api/events/";
const baseUrl = "http://192.168.1.9:3001/api/events/";

export default function Fines() {
  let { id } = useParams();
  const [event, setEvent] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getEvent() {
      const e = await axios.get(baseUrl + id);
      setEvent(e.data);
      console.log("===================");
      console.log(e.data);
    }

    getEvent();
  }, [id]);

  let students;
  if (event.length !== 0) {
    students = event.studentLogs.map((s) => {
      let fine = 0;
      let fine1 = 0;
      let fine2 = 0;
      let fine3 = 0;
      let fine4 = 0;

      if (s.isExcused) {
        return {
          ...s,
          fine,
          fine1: 0,
          fine2: 0,
          fine3: 0,
          fine4: 0,
        };
      }

      if (
        s.login1 === null &&
        s.login2 === null &&
        s.logout1 === null &&
        s.logout2 === null
      ) {
        if (s.student.isOfficer) {
          fine = 480;
          return {
            ...s,
            fine,
            fine1: 70,
            fine2: 70,
            fine3: 70,
            fine4: 70,
          };
        }

        fine = 350;

        return {
          ...s,
          fine,
          fine1: 50,
          fine2: 50,
          fine3: 50,
          fine4: 50,
        };
      }

      if (event.in1 === null) {
        fine1 = 0;
      } else if (s.login1 === null) {
        if (s.student.isOfficer) {
          fine1 += 70;
        }
        fine1 += 50;
      } else {
        const minutesLate = -moment
          .duration(moment(event.inEnd1).diff(moment(s.login1)))
          .asMinutes();
        if (minutesLate > 0) {
          fine1 += Math.ceil(minutesLate / 15) * 5;

          if (s.student.isOfficer && minutesLate > 45) {
            fine1 += 10;
          }
        }
      }
      if (event.in2 === null) {
        fine2 = 0;
      } else if (s.login2 === null) {
        if (s.student.isOfficer) {
          fine2 += 70;
        }
        fine2 += 50;
      } else {
        const minutesLate = -moment
          .duration(moment(event.inEnd2).diff(moment(s.login2)))
          .asMinutes();
        if (minutesLate > 0) {
          fine2 += Math.ceil(minutesLate / 15) * 5;
          if (s.student.isOfficer && minutesLate > 45) {
            fine2 += 10;
          }
        }
      }

      if (event.out1 === null) {
        fine3 = 0;
      } else if (s.logout1 === null) {
        if (s.student.isOfficer) {
          fine3 += 70;
        }
        fine3 += 50;
      } else {
        const minutesLate = -moment
          .duration(moment(event.outEnd1).diff(moment(s.logout1)))
          .asMinutes();
        if (minutesLate > 0) {
          fine3 += Math.ceil(minutesLate / 15) * 5;
          if (s.student.isOfficer && minutesLate > 45) {
            fine3 += 10;
          }
        }
      }

      if (event.out2 === null) {
        fine4 = 0;
      } else if (s.logout2 === null) {
        if (s.student.isOfficer) {
          fine4 += 70;
        }
        fine4 += 50;
      } else {
        const minutesLate = -moment
          .duration(moment(event.outEnd2).diff(moment(s.logout2)))
          .asMinutes();
        if (minutesLate > 0) {
          fine4 += Math.ceil(minutesLate / 15) * 5;
          if (s.student.isOfficer && minutesLate > 45) {
            fine4 += 10;
          }
        }
      }

      // console.log(moment(event.inEnd1), moment(s.login1));
      // console.log(
      //   -moment.duration(moment(s.login1).diff(moment(event.inEnd1)))._data
      //     .minutes
      // );

      fine += fine1 + fine2 + fine3 + fine4;

      return {
        ...s,
        fine,
        fine1,
        fine2,
        fine3,
        fine4,
      };
    });
    console.log(students);
  }

  if (event.length === 0) {
    return <></>;
  }

  // const t1 = event.in1 === null : "N/A" ? s.fine1;

  return (
    <IonPage>
      <IonContent>
        <IonSearchbar
          class="bar-style"
          showClearButton="focus"
          showCancelButton="focus"
          onIonChange={(e) => {
            setFilter(e.target.value);
          }}
        ></IonSearchbar>
        <div className="studentList">
          {students
            .filter(
              (s) =>
                s.student.name.toLowerCase().indexOf(filter.toLowerCase()) !==
                -1
            )
            .map((s, i) => (
              <div key={i}>
                <IonCard className="ion-margin-start ion-margin-end">
                  <IonCardHeader>
                    <IonCardTitle className="">{s.student.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonAccordionGroup class="ion-margin-bottom">
                      <IonAccordion>
                        <IonItem slot="header">
                          <IonLabel>Fine Breakdown</IonLabel>
                        </IonItem>
                        <div className="ion-padding" slot="content">
                          <p>Login 1: {event.in1 !== null ? s.fine1 : "N/A"}</p>
                          <p>Login 2: {event.in2 !== null ? s.fine1 : "N/A"}</p>
                          <p>
                            Logout 1: {event.out1 !== null ? s.fine1 : "N/A"}
                          </p>
                          <p>
                            Logout 2: {event.out2 !== null ? s.fine1 : "N/A"}
                          </p>
                        </div>
                      </IonAccordion>
                    </IonAccordionGroup>
                    <IonText>Total Fines: {s.fine}</IonText>
                  </IonCardContent>
                </IonCard>
              </div>
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
}

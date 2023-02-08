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
} from "@ionic/react";
import { useParams } from "react-router";
import "./Fines.css";
import moment from "moment";

// const baseUrl = "https://qrca-api.onrender.com/api/events/";
// const baseUrl = "http://192.168.1.9:3001/api/events/";

export default function Fines({ events }) {
  let { id } = useParams();
  const event = events.filter((e) => e.id === id)[0];

  const [filter, setFilter] = useState("");
  const [count, setCount] = useState(10);
  let students;

  // useEffect(() => {
  //   async function getEvent() {
  //     const e = await axios.get(baseUrl + id);
  //     setEvent(e.data);
  //     console.log("===================");
  //     console.log(e.data);
  //   }

  //   getEvent();
  // }, [id]);

  if (event.length !== 0) {
    students = event.studentLogs.map((s) => {
      let fine = 0;
      let fine1 = 0;
      let fine2 = 0;
      let fine3 = 0;
      let fine4 = 0;
      let wholeDay = 0;

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
          fine1 =
            event.in1 === null ? 0 : event.eventType === "minor" ? 50 : 70;
          fine2 =
            event.in2 === null ? 0 : event.eventType === "minor" ? 50 : 70;
          fine3 =
            event.out1 === null ? 0 : event.eventType === "minor" ? 50 : 70;
          fine4 =
            event.out2 === null ? 0 : event.eventType === "minor" ? 50 : 70;
          wholeDay = event.eventType === "minor" ? 100 : 200;
          fine = fine1 + fine2 + fine3 + fine4 + wholeDay;
          return {
            ...s,
            fine,
            fine1,
            fine2,
            fine3,
            fine4,
            wholeDay,
          };
        }

        fine1 = event.in1 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        fine2 = event.in2 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        fine3 = event.out1 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        fine4 = event.out2 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        wholeDay = event.eventType === "minor" ? 50 : 150;
        fine = fine1 + fine2 + fine3 + fine4 + wholeDay;

        return {
          ...s,
          fine,
          fine1,
          fine2,
          fine3,
          fine4,
          wholeDay,
        };
      }

      if (event.eventType === "major") {
        if (event.in1 === null) {
          fine1 = 0;
        } else if (s.login1 === null) {
          if (s.student.isOfficer) {
            fine1 += 70;
          } else {
            fine1 += 50;
          }
        } else {
          const minutesLate = -moment
            .duration(moment(event.inEnd1).diff(moment(s.login1)))
            .asMinutes();
          if (minutesLate > 0) {
            fine1 += Math.min(
              Math.ceil(minutesLate / 15) * 5,
              s.student.isOfficer ? 60 : 50
            );

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
          } else {
            fine2 += 50;
          }
        } else {
          const minutesLate = -moment
            .duration(moment(event.inEnd2).diff(moment(s.login2)))
            .asMinutes();
          if (minutesLate > 0) {
            fine2 += Math.min(
              Math.ceil(minutesLate / 15) * 5,
              s.student.isOfficer ? 60 : 50
            );
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
          } else {
            fine3 += 50;
          }
        }

        if (event.out2 === null) {
          fine4 = 0;
        } else if (s.logout2 === null) {
          if (s.student.isOfficer) {
            fine4 += 70;
          } else {
            fine4 += 50;
          }
        }
      } else {
        if (event.in1 === null) {
          fine1 = 0;
        } else if (s.login1 === null) {
          if (s.student.isOfficer) {
            fine1 += 50;
          } else {
            fine1 += 20;
          }
        } else {
          const minutesLate = -moment
            .duration(moment(event.inEnd1).diff(moment(s.login1)))
            .asMinutes();
          if (minutesLate > 0) {
            fine1 += Math.min(
              Math.ceil(minutesLate / 12) * 2,
              s.student.isOfficer ? 40 : 20
            );
            if (s.student.isOfficer && minutesLate > 45) {
              fine1 += 10;
            }
          }
        }
        if (event.in2 === null) {
          fine2 = 0;
        } else if (s.login2 === null) {
          if (s.student.isOfficer) {
            fine2 += 50;
          } else {
            fine2 += 20;
          }
        } else {
          const minutesLate = -moment
            .duration(moment(event.inEnd2).diff(moment(s.login2)))
            .asMinutes();
          if (minutesLate > 0) {
            fine2 += Math.min(
              Math.ceil(minutesLate / 12) * 2,
              s.student.isOfficer ? 40 : 20
            );
            if (s.student.isOfficer && minutesLate > 45) {
              fine2 += 10;
            }
          }
        }

        if (event.out1 === null) {
          fine3 = 0;
        } else if (s.logout1 === null) {
          if (s.student.isOfficer) {
            fine3 += 50;
          } else {
            fine3 += 20;
          }
        }

        if (event.out2 === null) {
          fine4 = 0;
        } else if (s.logout2 === null) {
          if (s.student.isOfficer) {
            fine4 += 50;
          } else {
            fine4 += 20;
          }
        }
      }

      if (s.student._id === "2020-8-0207") {
        console.log({
          ...s,
          fine,
          fine1,
          fine2,
          fine3,
          fine4,
          wholeDay: 0,
        });
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
        wholeDay: 0,
      };
    });
  }

  const generateItems = () => {
    setCount((c) => c + 10);
  };

  if (event.length === 0) {
    return <></>;
  }

  const filteredStudents = students
    .filter(
      (s) => s.student.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    )
    .slice(0, count);

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
          <IonList class="reposition-list">
            {filteredStudents.map((s, i) => (
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
                          <p>
                            Morning Login:{" "}
                            {event.in1 !== null ? s.fine1 : "N/A"}
                          </p>
                          <p>
                            Morning Logout:{" "}
                            {event.out1 !== null ? s.fine3 : "N/A"}
                          </p>
                          <p>
                            Afternoon Login:{" "}
                            {event.in2 !== null ? s.fine2 : "N/A"}
                          </p>
                          <p>
                            Afternoon Logout:{" "}
                            {event.out2 !== null ? s.fine4 : "N/A"}
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

import moment from "moment";

/**
 * Fn: Calculates Fines
 * Note: `should not be used in controller`
 * @param event, an array type from the server API returned by the `event service`
 * @returns Student object with additional attributes for fines
 */

const calculateFines = (event) => {
  let students;
  if (event.eventName === "CS GENERAL ASSEMBLY ") {
    const prevOfficers = [
      "2022-8-0030",
      "2022-8-0009",
      "2022-8-0018",
      "2022-8-0011",
      "2022-8-0310",
      "2022-8-0045",
      "2022-8-0017",
      "2022-8-0218",
      "2022-8-0056",
      "2022-8-0131",
      "2022-8-0080",
      "2022-8-0328",
      "2022-8-0148",
      "2022-8-0193",
      "2022-8-0149",
      "2022-8-0293",
      "2022-8-0299",
      "2022-8-0271",
      "2022-8-0241",
      "2022-8-0125",
      "2020-8-0155",
      "2022-8-0027",
      "2022-8-0234",
      "2022-8-0113",
      "2022-8-0108",
      "2022-8-0214",
      "2021-8-0235",
      "2021-8-0251",
      "2021-8-0220",
      "2021-8-0418",
      "2021-8-0009",
      "2021-8-0010",
      "2021-8-0136",
      "2021-8-0012",
      "2021-8-0232",
      "2021-8-0157",
      "2021-8-0159",
      "2021-8-0224",
      "2021-8-0267",
      "2021-8-0187",
      "2021-8-0167",
      "2021-8-0280",
      "2021-8-0195",
      "2021-8-0383",
      "2021-8-0165",
      "2019-2-0289",
      "2021-8-0371",
      "2019-8-0341",
      "2021-10-0222N",
      "2020-8-0521",
      "2021-8-0219",
      "2020-8-0432",
      "2020-8-0135",
      "2020-8-0147",
      "2020-8-0461",
      "2020-8-0152",
      "2020-8-0161",
      "2020-8-0164",
      "2020-8-0468",
      "2020-8-0168",
      "2020-8-0177",
      "2020-8-0187",
      "2020-8-0191",
      "2020-8-0194",
      "2020-8-0480",
      "2019-8-0338",
      "2020-8-0485",
      "2020-8-0207",
      "2020-8-0209",
      "2019-8-0062",
      "2019-8-0161",
      "2018-4-0375",
      "2019-8-0003",
      "2019-8-0335",
      "2019-8-0283",
      "2018-4-0722",
      "2019-8-0016",
      "2019-8-0029",
      "2018-4-0111",
    ];
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
          wholeDay,
        };
      }

      if (
        s.login1 === null &&
        s.login2 === null &&
        s.logout1 === null &&
        s.logout2 === null
      ) {
        if (s.student.isOfficer || prevOfficers.includes(s.student._id)) {
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
          if (s.student.isOfficer || prevOfficers.includes(s.student._id)) {
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
              s.student.isOfficer || prevOfficers.includes(s.student._id)
                ? 60
                : 50
            );

            if (
              (s.student.isOfficer || prevOfficers.includes(s.student._id)) &&
              minutesLate > 45
            ) {
              fine1 += 10;
            }
          }
        }
        if (event.in2 === null) {
          fine2 = 0;
        } else if (s.login2 === null) {
          if (s.student.isOfficer || prevOfficers.includes(s.student._id)) {
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
              s.student.isOfficer || prevOfficers.includes(s.student._id)
                ? 60
                : 50
            );
            if (
              (s.student.isOfficer || prevOfficers.includes(s.student._id)) &&
              minutesLate > 45
            ) {
              fine2 += 10;
            }
          }
        }

        if (event.out1 === null) {
          fine3 = 0;
        } else if (s.logout1 === null) {
          if (s.student.isOfficer || prevOfficers.includes(s.student._id)) {
            fine3 += 70;
          } else {
            fine3 += 50;
          }
        }

        if (event.out2 === null) {
          fine4 = 0;
        } else if (s.logout2 === null) {
          if (s.student.isOfficer || prevOfficers.includes(s.student._id)) {
            fine4 += 70;
          } else {
            fine4 += 50;
          }
        }
      } else {
        if (event.in1 === null) {
          fine1 = 0;
        } else if (s.login1 === null) {
          if (s.student.isOfficer || prevOfficers.includes(s.student._id)) {
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
              s.student.isOfficer || prevOfficers.includes(s.student._id)
                ? 40
                : 20
            );
            if (
              (s.student.isOfficer || prevOfficers.includes(s.student._id)) &&
              minutesLate > 45
            ) {
              fine1 += 10;
            }
          }
        }
        if (event.in2 === null) {
          fine2 = 0;
        } else if (s.login2 === null) {
          if (s.student.isOfficer || prevOfficers.includes(s.student._id)) {
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
              s.student.isOfficer || prevOfficers.includes(s.student._id)
                ? 40
                : 20
            );
            if (
              (s.student.isOfficer || prevOfficers.includes(s.student._id)) &&
              minutesLate > 45
            ) {
              fine2 += 10;
            }
          }
        }

        if (event.out1 === null) {
          fine3 = 0;
        } else if (s.logout1 === null) {
          if (s.student.isOfficer || prevOfficers.includes(s.student._id)) {
            fine3 += 50;
          } else {
            fine3 += 20;
          }
        }

        if (event.out2 === null) {
          fine4 = 0;
        } else if (s.logout2 === null) {
          if (s.student.isOfficer || prevOfficers.includes(s.student._id)) {
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
    // console.log({ students, message: "utils.js" });
    return students;
  }

  const hets = ["2020-8-0461", "2020-8-0209", "2020-8-0194"];
  students = event.studentLogs.map((s) => {
    if (
      event.hasNoFines === true ||
      s.isExcused ||
      hets.includes(s.student._id)
    ) {
      return {
        ...s,
        fine: 0,
        fine1: 0,
        fine2: 0,
        fine3: 0,
        fine4: 0,
      };
    }
    const fine1 =
      event.in1 !== null && s.login1 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;
    const fine2 =
      event.in2 !== null && s.login2 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;
    const fine3 =
      event.out1 !== null && s.logout1 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;
    const fine4 =
      event.out2 !== null && s.logout2 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;

    const fine = fine1 + fine2 + fine3 + fine4;

    return {
      ...s,
      fine,
      fine1,
      fine2,
      fine3,
      fine4,
    };
  });

  // console.log({ students, message: "utils.js" });
  return students;
};

/**
 * Fn: Export times
 * Note: `should not be used in controller`
 * @param event, an array type from the server API returned by the `event service`
 * @returns response object from server, status 401 is unauthorized, status 200 implies correct credentials
 */

const exportTimes = (event) => {
  let students;
  if (event.eventName === "CS GENERAL ASSEMBLY ") {
    students = event.studentLogs.map((s) => {
      let fine = 0;
      let fine1 = 0;
      let fine2 = 0;
      let fine3 = 0;
      let fine4 = 0;
      let wholeDay = 0;

      const name = s.student.name;
      const studentNumber = s.student._id;
      const morningLogin =
        event.in1 !== null
          ? s.login1 !== null
            ? moment(s.login1).format("h:mm:ss a")
            : "Absent"
          : "N/A";
      const morningLogout =
        event.out1 !== null
          ? s.logout1 !== null
            ? moment(s.logout1).format("h:mm:ss a")
            : "Absent"
          : "N/A";
      const afternoonLogin =
        event.in2 !== null
          ? s.login2 !== null
            ? moment(s.login2).format("h:mm:ss a")
            : "Absent"
          : "N/A";
      const afternoonLogout =
        event.out2 !== null
          ? s.logout2 !== null
            ? moment(s.logout2).format("h:mm:ss a")
            : "Absent"
          : "N/A";

      if (s.isExcused) {
        return [
          studentNumber,
          name,
          morningLogin,
          morningLogout,
          afternoonLogin,
          afternoonLogout,
          fine,
        ];
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
          return [
            studentNumber,
            name,
            morningLogin,
            morningLogout,
            afternoonLogin,
            afternoonLogout,
            fine,
          ];
        }

        fine1 = event.in1 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        fine2 = event.in2 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        fine3 = event.out1 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        fine4 = event.out2 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        wholeDay = event.eventType === "minor" ? 50 : 150;
        fine = fine1 + fine2 + fine3 + fine4 + wholeDay;

        return [
          studentNumber,
          name,
          morningLogin,
          morningLogout,
          afternoonLogin,
          afternoonLogout,
          fine,
        ];
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

      fine = fine1 + fine2 + fine3 + fine4 + wholeDay;

      return [
        studentNumber,
        name,
        morningLogin,
        morningLogout,
        afternoonLogin,
        afternoonLogout,
        fine,
      ];
    });
    return students;
  }

  students = event.studentLogs.map((s) => {
    const name = s.student.name;
    const studentNumber = s.student._id;
    const morningLogin =
      event.in1 !== null
        ? s.login1 !== null
          ? moment(s.login1).format("h:mm:ss a")
          : "Absent"
        : "N/A";
    const morningLogout =
      event.out1 !== null
        ? s.logout1 !== null
          ? moment(s.logout1).format("h:mm:ss a")
          : "Absent"
        : "N/A";
    const afternoonLogin =
      event.in2 !== null
        ? s.login2 !== null
          ? moment(s.login2).format("h:mm:ss a")
          : "Absent"
        : "N/A";
    const afternoonLogout =
      event.out2 !== null
        ? s.logout2 !== null
          ? moment(s.logout2).format("h:mm:ss a")
          : "Absent"
        : "N/A";
    if (event.hasNoFines === true || s.isExcused) {
      return [
        studentNumber,
        name,
        morningLogin,
        morningLogout,
        afternoonLogin,
        afternoonLogout,
        0,
      ];
    }
    const fine1 =
      event.in1 !== null && s.login1 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;
    const fine2 =
      event.in2 !== null && s.login2 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;
    const fine3 =
      event.out1 !== null && s.logout1 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;
    const fine4 =
      event.out2 !== null && s.logout2 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;

    const fine = fine1 + fine2 + fine3 + fine4;

    console.log({ morningLogin, login1: s.login1 });
    return [
      studentNumber,
      name,
      morningLogin,
      morningLogout,
      afternoonLogin,
      afternoonLogout,
      fine,
    ];
  });

  // console.log({ students: students.slice(0, 5), message: "utils.js" });
  return students;
};
export { calculateFines, exportTimes };

import React from "react";
import * as XLSX from "xlsx";
import write_blob from "capacitor-blob-writer";

import { exportTimes } from "../../utils/utils";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const ExportAttendance = ({ event }) => {
  const data = [
    {},
    {
      "Student number": 1,
      Name: "John Doe",
      "Morning login": "8:00 AM",
      "Morning logout": "12:00 PM",
      "Afternoon login": "1:00 PM",
      "Afternoon logout": "5:00 PM",
    },
    // Add more rows as needed
  ];
  const test = [
    ["Association of Computer Scientists \n ATTENDANCE \n Event"],
    [
      "Student Number",
      "Name",
      "Morning Login",
      "Morning Logout",
      "Afternoon Login",
      "Afternoon Logout",
      "Fines",
    ],
    [1, "John Doe", "8:00 AM", "12:00 PM", "1:00 PM", "5:00 PM", "250"],
    [2, "John Does", "8:00 AM", "12:00 PM", "1:00 PM", "5:00 PM", "250"],
  ];

  const exportToExcel = async () => {
    console.log("hiadhif");
    const headers = [
      ["Association of Computer Scientists \n ATTENDANCE \n Event"],
      [
        "Student Number",
        "Name",
        "Morning Login",
        "Morning Logout",
        "Afternoon Login",
        "Afternoon Logout",
        "Fines",
      ],
    ];
    // const ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
    // const ws = XLSX.workbook.sheets["Attendance"];
    const times = exportTimes(event);
    const data = headers.concat(times);
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Merge cells and set custom header
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
    ws["A1"] = {
      v: "Association of Computer Scientists \n ATTENDANCE \n Event",
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },
        font: { bold: true },
      },
    };

    // // Add headers to second row
    ws["A2"] = { v: "Student number", t: "s" };
    ws["B2"] = { v: "Name", t: "s" };
    ws["C2"] = { v: "Morning login", t: "s" };
    ws["D2"] = { v: "Morning logout", t: "s" };
    ws["E2"] = { v: "Afternoon login", t: "s" };
    ws["F2"] = { v: "Afternoon logout", t: "s" };

    // Create workbook and write worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    const EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    // Export the workbook to a Blob and use FileSaver to download
    const wbOut = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbOut], {
      type: EXCEL_TYPE,
    });

    const fileName = `backup/${event.eventName}.xlsx`;
    const fileDirectory = Directory.Documents;

    write_blob({
      path: fileName,
      directory: fileDirectory,
      blob: blob,
      recursive: true,
      on_fallback(error) {
        console.error(error);
      },
    }).then(function () {
      console.log("file written.");
    });
  };
  const writeSecretFile = async () => {
    const headers = [
      ["Association of Computer Scientists \n ATTENDANCE \n Event"],
      [
        "Student Number",
        "Name",
        "Morning Login",
        "Morning Logout",
        "Afternoon Login",
        "Afternoon Logout",
        "Fines",
      ],
    ];
    // const ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
    // const ws = XLSX.workbook.sheets["Attendance"];
    const times = exportTimes(event);
    const data = headers.concat(times);
    const ws = XLSX.utils.aoa_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    const EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    // Export the workbook to a Blob and use FileSaver to download
    const wbOut = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbOut], {
      type: EXCEL_TYPE,
    });

    const fileName = "backup/attendance.xlsx";
    await Filesystem.writeFile({
      path: fileName,
      data: blob,
      directory: Directory.Documents,
      // encoding: Encoding.UTF8,
    });
  };

  const writeSecretFile2 = async () => {
    await Filesystem.writeFile({
      path: "text.txt",
      data: "This is a test",
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };

  return (
    <div>
      <button
        onClick={exportToExcel}
        className="excel-button fines-button export"
      >
        Export Attendance to Excel
      </button>
    </div>
  );
};

export default ExportAttendance;

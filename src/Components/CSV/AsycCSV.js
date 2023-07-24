// import React from "react";
// import { CSVLink } from "react-csv";
// import { useSelector } from "react-redux";
// import "./AsycCSV.css";

// const header = [
//   { label: "Amount", key: "amount" },
//   { label: "Category", key: "category" },
//   { label: "Date", key: "date" },
//   { label: "Description", key: "description" },
// ];

// const AsycCSV = () => {
//   const data = useSelector((state) => state.expense.expense);
//   const ExpenseData = data && data.map((item) => item.exprenseData);

//   //make sure the data come with this format [{},{},{}]
//   const csvReport = {
//     data: ExpenseData,
//     headers: header,
//     filename: "Expense_Report.csv",
//   };
//   return (
//     <div>
//       <button className="btn btn-outline border bg-white border-primary btn-sm buttonCSV mt-4 ml-3 ">
//         <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
//           <i class="fa fa-download" aria-hidden="true"></i> Download CSV
//         </CSVLink>
//       </button>
//     </div>
//   );
// };

// export default AsycCSV;


import React from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import "./AsycCSV.css";

const header = [
  { label: "Amount", key: "amount" },
  { label: "Category", key: "category" },
  { label: "Date", key: "date" },
  { label: "Description", key: "description" },
];

const AsyncCSV = () => {
  const data = useSelector((state) => state.expense.expense);

  // Make sure the data is an array of objects with keys "amount", "category", "date", and "description"
  const isValidData =
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      (item) =>
        typeof item === "object" &&
        "amount" in item &&
        "category" in item &&
        "date" in item &&
        "description" in item
    );

  // If data is not in the correct format, show an error message or handle it as needed
  if (!isValidData) {
    return <div>Error: Data is not in the correct format.</div>;
  }

  const csvReport = {
    data: data,
    headers: header,
    filename: "Expense_Report.csv",
  };

  return (
    <div>
      <button className="btn btn-outline border bg-white border-primary btn-sm buttonCSV mt-4 ml-3">
        <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
          <i className="fa fa-download" aria-hidden="true"></i> Download CSV
        </CSVLink>
      </button>
    </div>
  );
};

export default AsyncCSV;


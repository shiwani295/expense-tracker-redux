import React from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import "../CSV/AsycCSV.css";

const header = [
  { label: "Amount", key: "amount" },
  { label: "Category", key: "category" },
  { label: "Date", key: "date" },
  { label: "Description", key: "description" },
];
//make sure the data come with this formate [{},{},{}]

const AsycCSV = () => {
  const data = useSelector((state) => state.expense.expense);
  const exp = data.map((items) => items.exprenseData);
  const csvReport = {
    data: exp,
    headers: header,
    filename: "Expense_Report.csv",
  };
  return (
    <div>
      {/* type="button"
        className="btn btn-outline-primary btn-sm buttonCSV mt-4 ml-3" */}
      <button className="btn btn-outline border bg-white border-primary btn-sm buttonCSV mt-4 ml-3 ">
        <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
          <i class="fa fa-download" aria-hidden="true"></i> Download CSV
        </CSVLink>
      </button>
    </div>
  );
};

export default AsycCSV;

import React, { useRef } from "react";
import "../Pages/MyExpense.css";
import { useDispatch } from "react-redux";
import { MyExpenseAction } from "../../Store/MyExpenseSlice";
import TableExpense from "./TableExpense";

const MyExpense = () => {
  const InputDescriptionRef = useRef();
  const InputDateRef = useRef();
  const InputExpenseRef = useRef();
  const InputCategoryRef = useRef();
  const dispatch = useDispatch();
  const emailID = localStorage.getItem("email");
  const replaceEmailid = emailID.replace("@", "").replace(".", "");

  const MyExpenseSubmitHandler = (event) => {
    event.preventDefault();
    const exprenseData = {
      description: InputDescriptionRef.current.value,
      date: InputDateRef.current.value,
      category: InputCategoryRef.current.value,
      amount: InputExpenseRef.current.value,
      id: Math.random().toString(),
    };
    dispatch(MyExpenseAction.addExpense(exprenseData));

    if (
      !exprenseData.description ||
      !exprenseData.date ||
      !exprenseData.category ||
      !exprenseData.amount
    ) {
      window.confirm("please provide each input feild value ");
    } else {
      fetch(
        `https://expensetrackernew-86302-default-rtdb.firebaseio.com/expense/${replaceEmailid}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            expense: exprenseData,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          InputDescriptionRef.current.value = "";
          InputDateRef.current.value = "";
          InputCategoryRef.current.value = "";
          InputExpenseRef.current.value = "";
        });
    }
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-4 ">
          <div className="card ">
            <div className="card-body bg-primary border border-primary rounded cardExpenseBtn">
              <button
                className=" btn bg-white border border-primary font-weight-bold"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
        {/* model */}
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-primary">
              <div className="modal-header">
                <h4
                  className="modal-title text-primary"
                  id="exampleModalCenterTitle"
                >
                  Add Expense
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={MyExpenseSubmitHandler}>
                <div className="modal-body">
                  <div className="form-group font-weight-bold">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      className="form-control "
                      id="date"
                      aria-describedby="emailHelp"
                      placeholder="Enter Expenses.."
                      ref={InputDateRef}
                    />
                  </div>
                  <div className="form-group font-weight-bold">
                    <label htmlFor="expense">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="expense"
                      aria-describedby="emailHelp"
                      placeholder="Enter Expenses.."
                      ref={InputExpenseRef}
                    />
                  </div>
                  <div className="form-group font-weight-bold">
                    <label htmlFor="des">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="des"
                      placeholder=" Enter Description.."
                      ref={InputDescriptionRef}
                    />
                  </div>
                  <div classhtml="form-group">
                    <label htmlFor="category " className="font-weight-bold">
                      Category
                    </label>
                    <select
                      className="form-select form-select-sm form-control"
                      id="category"
                      placeholder="Confirm Password"
                      aria-label=".form-select-sm example"
                      ref={InputCategoryRef}
                    >
                      <option selected>Category</option>
                      <option value="Food">Food</option>
                      <option value="Salary">Salary</option>
                      <option value="Petrol">Petrol</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn bg-white border border-primary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <TableExpense />
      </div>
    </div>
  );
};

export default MyExpense;

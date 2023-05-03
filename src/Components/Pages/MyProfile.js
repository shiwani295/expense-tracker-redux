import React, { useRef, useEffect, useState } from "react";

const MyProfile = () => {
  const InputusernameRef = useRef();
  const InputProfilePhotoRef = useRef();
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const token = localStorage.getItem("token");

  //get the data

  useEffect(() => {
    // console.log('useEffect ran');
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCrcYRZkoGff_xTDV5VTk2q4SfWwRFNVB8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          console.log(data.users[0].displayName);
          setName(() => data.users[0].displayName);
          setImgUrl(() => data.users[0].photoUrl);
        });
      } else {
        const errorMsg = "Something Went Wrong while getting data";
        alert(errorMsg);
      }
    });
  }, [token]);

  //post the data
  const updateProfileHandler = (e) => {
    e.preventDefault();
    const username = InputusernameRef.current.value;
    const ProPhoto = InputProfilePhotoRef.current.value;

    if (username.length === 0 || ProPhoto.length === 0) {
      alert("Fill the details please!");
      return;
    } else {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrcYRZkoGff_xTDV5VTk2q4SfWwRFNVB8`;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          displayName: username,
          photoUrl: ProPhoto,
          idToken: token,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log(data);
            // setImgState(data.photoUrl)
          });
        } else {
          const errormsg = "Oops, Something went wrong! Try again.";
          alert(errormsg);
        }
      });
    }
  };
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-4">
          <p className="font-weight-bold mt-5">
            Winner never quite , Quitters never win
          </p>
        </div>
        <div className="col-md-8 " style={{ textAlign: "end" }}>
          <div>
            <i>
              Your Profile 65% completed
              <p>A Complete Profile has higher change of landing a job</p>
            </i>{" "}
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              data-whatever="@getbootstrap"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>
      <hr></hr>

      <div className="row">
        <div className="col-md-12 mt-5">
          <h4>Contact Details</h4>
          <form
            onSubmit={updateProfileHandler}
            className=" mt-5 border rounded p-3 bg-white "
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            }}
          >
            <div className="form-group">
              <label htmlFor="name" className="font-weight-bold">
                <i className="fa fa-user  fa-fw" aria-hidden="true"></i> Full
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name ..."
                ref={InputusernameRef}
                defaultValue={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="photourl" className="font-weight-bold">
                <i className="fa fa-cloud-upload" aria-hidden="true"></i>{" "}
                Profile Photo URL
              </label>
              <input
                type="text"
                id="photourl"
                className="form-control"
                placeholder="Profile Photo Url ..."
                ref={InputProfilePhotoRef}
                defaultValue={imgUrl}
              />
            </div>

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

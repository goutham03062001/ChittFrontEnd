/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField, Button } from "@mui/material";
import "./ChitsUI.css";
import { BASE_URL } from "./Helper";
import axios from "axios";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

//ToDo
/*
    1. Grab the userId
    2. Point to otherDetails array
    3. We know index => month
    4. loop through otherDetails array until we find index === month
    5. print those properties here
*/
const ChitsUI = ({ index, userId, currentUser }) => {
  // console.log("otherDetails"+otherDetails);
  for (let i = 0; i < index; i++) {
    if (currentUser.otherDetails[i] !== undefined) {
      console.log(currentUser.otherDetails.map((item) => item));
    }
  }

  const [isEditing, setIsEditing] = useState(false);
  //fileds
  const [Status, setStatus] = useState("");
  const [Mode, setMode] = useState("");
  const [Date, setDate] = useState("");
  const month = index;
  
  const editChitDetails = () => {
    setIsEditing(true);
    const response = axios
      .get(BASE_URL + `/users/get/${currentUser._id}/month/${month}`)
      .then((data) => {
        console.log(data.data);
        console.log(response);
        // setCurrentMonthDate(data.Date);
        // setCurrentMonthMode(data.Mode);
        // setCurrentMonthStatus(data.Status);
        console.log("Status : "+data.data.Status);
       
        console.log("Mode : "+data.data.Mode);
        console.log("Date : "+data.data.Date);
        
        
        setStatus(data.data.Status);
        setDate(data.data.Date);
        setMode(data.data.Mode);
      })
      .catch((error) => {
        console.log(error.message);
      });

    // setPreviousPaymentMode()
  };
  //update chits month
  const[isUpdated,setIsUpdated] = useState(false);
  const[isUpdateBtnClicked,setIsUpdateBtnClicked] = useState(false);
  const updateDetails = (indexValue) => {
    setIsUpdateBtnClicked(true);
    console.log("Index value is : " + indexValue);
    //keep track of db

    if (Status === "") {
      setStatus("Not Paid ");
    } else {
      console.log("Status -" + Status);
    }
    // console.log("Status -"+Status);
    {
      Mode === "" ? (
        <>{setMode("Hand Cash")}</>
      ) : (
        <>{console.log("Mode -" + Mode)}</>
      );
    }
    {
      Date === "" ? (
        <>{setDate("")}</>
      ) : (
        <>
          {
            <>
              {console.log("Date -" + Date)}
              {console.log(typeof Date)}
            </>
          }
        </>
      );
    }
    const body = { month, Mode, Status, Date };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //backend
    const response = axios
      .put(BASE_URL + "/users/update/" + userId, body, config)
      .then((data) => {
        console.log("After Updating");
        console.log(data);
        console.log(response);
        setIsUpdated(true);
        setIsUpdateBtnClicked(false);
        toast.success(`${currentUser.userName}'s ${month} details updated successfully`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="card my-3 p-3 chitsUICard">
      <div className="my-3">
        {isEditing ? (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
            {isUpdated&&!isUpdateBtnClicked ? <ToastContainer autoClose={2000}/>:<></>}
              <TextField
                label={Status!==""||Status!==null || Status!==undefined?<>Status</>:<>Status</>}
                value={Status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                
              />
              <br />
              <br />
              <TextField
                label="Payment Mode"
                value={Mode}
                onChange={(e) => {
                  setMode(e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                label="Date"
                type="Date"
                value={Date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <br />
              <Button
                variant="contained"
                color={!isUpdateBtnClicked &&isUpdated ? "success":"primary"}
                className="my-3"
                type="submit"
                onClick={() => {
                  updateDetails(index);
                }}
              >
                {!isUpdateBtnClicked && !isUpdated ? "Update Details":<>{isUpdateBtnClicked && !isUpdated ? "Loading .... ":<>{isUpdateBtnClicked && isUpdated ? "Updated Details":<>Details Updated &nbsp; <CheckCircleOutlineIcon/></>}</>}</>}
              </Button>
            </form>
          </>
        ) : (
          <>
            <p>Month - {index}</p>
            <p>
              Status -{" "}
              {currentUser.otherDetails.map((item) =>
                item.month === index ? <>{item.Status} </> : <></>
              )}
            </p>
            <p>
              Mode -{" "}
              {currentUser.otherDetails.map((item) =>
                item.month === index ? <>{item.Mode}</> : <></>
              )}
            </p>
            <p>
              Date -{" "}
              {currentUser.otherDetails.map((item) =>
                item.month === index ? <>{item.Date}</> : <></>
              )}
            </p>
          </>
        )}
      </div>
      <div className="moreIcon">
        <MoreVertIcon
          onClick={(e) => {
            editChitDetails();
          }}
        />
      </div>
    </div>
  );
};

export default ChitsUI;

import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  Alert,
  IconButton,
  
} from "@mui/material";
import "./ViewSingleUserDetails.css";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import ChitsUI from "./ChitsUI";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import "./ChitsUI.css";
import { BASE_URL } from "./Helper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {Empty} from "antd";
const DisplayChittiUsers = () => {
  //allUsersData
  const [users, setUsers] = useState(null);
  const [userId, setUserId] = useState(null);

  //singleUserData
  const [currentUser, setCurrentUser] = useState(null);
  //userAddedMessage
  const [successMessae, setSuccessMessage] = useState(null);
  useEffect(() => {
    function loadUsers() {
      const response =  axios
        .get(BASE_URL + "/users/getAllUsers")
        .then((data) => {
          console.log(data);
          setUsers(data.data);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadUsers();
  }, []);
  const [userName, setUserName] = useState(null);
  const [openModal, handleOpenModal] = useState(false);

  const [addNewUserDetails, setAddNewUserDetails] = useState(false);

  //userInputs
  const [inputUserName, setInputUserName] = useState("");
  const [inputUserMobile, setInputUserMobile] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  //custom Functions
  function addNewUser() {
    console.log("Adding New User");
    setAddNewUserDetails(true);
  }
  function addUserToChitti() {
    setIsBtnClicked(true);
    setLoading(true);
    console.log("User name : " + inputUserName);
    console.log("user mobile : " + inputUserMobile);

    //axios part
    const body = { inputUserName, inputUserMobile };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = axios
      .post(BASE_URL + "/users/addNew", body, config)
      .then((data) => {
        console.log(data);
        console.log(response);

        setSuccessMessage(data.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //viewSingleUserDetails
  function ViewSingleUserDetails(user) {
    setUserId(user._id);
    let id = user._id;
    const response = axios
      .get(BASE_URL + "/users/getUser/" + id)
      .then((data) => {
        console.log("User details with id : " + id);
        console.log(data);
        console.log(response);

        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //show user actions
  const[showMenuActions,setShowMenuActions] = useState(false);
  const[menuUserId,setMenuUserId] = useState(null);
  function handleMenuActions(user){
    setShowMenuActions(!showMenuActions);
    setMenuUserId(user._id)
  }
  

  // const deleteUserById = (user) => {
  //   console.log("User Name : " + user);
  // };
  const[isDltBtnClicked,setIsDltBtnClicked] = useState(false);
const deleteUserById = (user)=>{  

  setIsDltBtnClicked(true);
  console.log('Name : '+user.userName);
  const response = axios.delete(BASE_URL+`/users/delete/${user._id}`).then((data)=>{
    console.log(data);
    console.log(response);
    console.log(data);
    toast.success("User removed, please refresh the page!!");
  }).catch((error)=>{console.log(error.message)})

}
  const chitsArray = Array.from({ length: 20 }, (_, index) => (
    <ChitsUI index={index + 1} userId={userId} currentUser={currentUser} />
  ));
  return (
    <div className="container">
      <div
        className="card-body text text-center"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h3>Chitti Users</h3>
        <Button
          variant="contained"
          color="success"
          onClick={(e) => {
            addNewUser();
          }}
        >
          Add New User <AddIcon />
        </Button>
      </div>
      <div className="row">
      {isDltBtnClicked ?<><ToastContainer position="top-center" className="mt-5"/></>:<></>}
        {users && users.length>1 ? <>
          {users !== null &&
          users.map((user) => (
            <div className="card user-card col-lg-4 col-12 col-sm-12 my-3">
              <div className="card-body">
                <p>Name : {user.userName}</p>
                <p>Mobile : {user.userMobile}</p>
                <div className="user-more-icon">
                  
                 <MoreVertIcon 
                 onClick={()=>{handleMenuActions(user)}}
                  className="moreVertIcon"
                 />

                  {(showMenuActions) &&(user._id === menuUserId)&&(<>
                    <div className="card menuActionCard">
                      {/* <CloseIcon/> */}
                      {/* <p>Update Details <ModeEditOutlineIcon/></p>
                     <p>Remove Details <DeleteOutlineIcon/></p>
                     <p>Modify <AutoFixHighIcon/></p> */}
                     <table>
                      <tr>
                        <td>Update Details </td>
                        
                        <td>
                          <IconButton>
                        <ModeEditOutlineIcon/> </IconButton></td>
                      </tr>

                      <tr>
                        <td>Remove Details </td>
                        <td>
                          <IconButton>
                          <DeleteOutlineIcon onClick={()=>{deleteUserById(user)}}/>
                          </IconButton>
                        </td>
                      </tr>

                      <tr>
                        <td>Update Details </td>
                        <td>
                        <IconButton>
                        <AutoFixHighIcon/>


                        </IconButton>
                        </td>
                      </tr>
                     </table>
                    </div>
                  </>)}      
                    
                </div>

              
                <Button
                  variant="contained"
                  onClick={() => {
                    setUserName(user.userName);

                    ViewSingleUserDetails(user);
                    handleOpenModal(true);
                  }}
                >
                  View User {user.userName}
                </Button>
              </div>
            </div>
          ))}
        </>:<>
          <div className="empty">
          <h3 className="text text-center">No Users Found</h3>
          <p>Create Users to see them here.</p>
          <Empty description= {false}/>
          </div>
        </>}
      </div>
      {openModal && currentUser ? (
        <>
          <Modal open={openModal} className="userDetails">
            <>
              <div className="card userCardDetails">
                <div className="card-body">
                  <Typography> {userName}'s Chitti Payment Details</Typography>

                  {chitsArray}

                  <Button
                    variant="contained"
                    onClick={(e) => {
                      handleOpenModal(false);
                    }}
                  >
                    Close User Details
                  </Button>
                </div>
              </div>
            </>
          </Modal>
        </>
      ) : (
        <></>
      )}

      {/* user details */}
      {addNewUserDetails && (
        <Modal open={addNewUserDetails}>
          <div className="new_userDetails">
            {successMessae !== null && isBtnClicked && !isLoading ? (
              <>
                <Alert severity="success">
                  <div className="d-flex flex-row justify-content-around">
                    <div>{successMessae}</div>
                    <div>
                      <CancelIcon
                        onClick={(e) => {
                          setSuccessMessage(null);
                        }}
                      />
                    </div>
                  </div>
                </Alert>
              </>
            ) : (
              <>
                {isBtnClicked && isLoading ? (
                  <>
                    <RotateLeftIcon className="LoadingIcon" />
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
            <div className="card new_userDetails_card ">
              <Button
                variant=""
                className="my-2 new_userDetails_closeBtn"
                onClick={(e) => {
                  setAddNewUserDetails(false);
                  setSuccessMessage(null);
                }}
              >
                <CancelIcon />
              </Button>
              <TextField
                label="Enter new User name"
                className="my-3"
                onChange={(e) => {
                  setInputUserName(e.target.value);
                }}
              />
              <TextField
                label="Enter new User mobile number"
                className="my-3"
                onChange={(e) => {
                  setInputUserMobile(e.target.value);
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  addUserToChitti();
                }}
              >
                Add this user
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DisplayChittiUsers;

import React,{useState,useEffect} from 'react'
import {Button,Modal,TextField,Typography,Alert} from "@mui/material";
import "./ViewSingleUserDetails.css";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import ChitsUI from './ChitsUI';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { BASE_URL } from './Helper';
const DisplayChittiUsers = () => {
    
    //allUsersData
    const[users,setUsers] = useState(null);
    const[userId,setUserId] = useState(null);

    //singleUserData
    const[currentUser,setCurrentUser] = useState(null);
    //userAddedMessage
    const[successMessae,setSuccessMessage] = useState(null);
    useEffect(()=>{
        
        function loadUsers(){
            const response = axios.get(BASE_URL+"/users/getAllUsers").then((data)=>{
                console.log(data);
                setUsers(data.data);
                console.log(response);

            }).catch((err)=>{console.log(err)});
        }
        loadUsers();
    },[])
    const[userName,setUserName] = useState(null);
    const[openModal,handleOpenModal] = useState(false);
    
    const[addNewUserDetails,setAddNewUserDetails] = useState(false);

    //userInputs
    const[inputUserName,setInputUserName] = useState('');
    const[inputUserMobile,setInputUserMobile] = useState('');

    const[isLoading,setLoading] = useState(false);
    const[isBtnClicked,setIsBtnClicked] = useState(false);
    //custom Functions
    function addNewUser(){
        console.log("Adding New User");
        setAddNewUserDetails(true);
    }
    function addUserToChitti(){
        setIsBtnClicked(true);
        setLoading(true);
        console.log('User name : '+inputUserName);
        console.log('user mobile : '+inputUserMobile);

        //axios part
        const body = {inputUserName,inputUserMobile};
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };
        const response = axios.post(BASE_URL+"/users/addNew",body,config).then((data)=>{
            console.log(data);
            console.log(response);

            setSuccessMessage(data.data.message);
            setLoading(false);
        }).catch((err)=>{console.log(err)});
    }

    //viewSingleUserDetails
    function ViewSingleUserDetails(user){
        setUserId(user._id);
        let id = user._id;
        const response = axios.get(BASE_URL+"/users/getUser/"+id).then((data)=>{
            console.log('User details with id : '+id);
            console.log(data);
            console.log(response);

            setCurrentUser(data.data);
        }).catch((err)=>{console.log(err)})
    }
    
    const chitsArray = Array.from({length:20},(_,index)=><ChitsUI index={index+1} userId={userId} currentUser = {currentUser}/>);
  return (
    <div className='container'>
    <div className='card-body text text-center'
    style={{display:'flex', justifyContent:"space-evenly", alignItems:"center"}}>
            <h3>Chitti Users</h3>
            <Button variant='contained' color="success"
            onClick={(e)=>{addNewUser()}}>Add New User <AddIcon/></Button>
        </div>
        <div className='row'>
        {users!==null&&(
            
          
                
                    users.map((user)=>(
                        <div className='card col-lg-4 col-12 col-sm-12 my-3'>
                        <div className='card-body'>
                        <p>Name : {user.userName}</p>
                        <p>Mobile : {user.userMobile}</p>
                        {/* <div className='col-lg-6 col-sm-6 my-2'>
                    <Button variant='contained'
                        onClick={(e)=>{setUserName("Srinivas"); handleOpenModal(true)}}>View User</Button>
                        </div> */}
                        <Button variant="contained"
                        onClick={()=>{setUserName(user.userName); 
                        
                        ViewSingleUserDetails(user); handleOpenModal(true);  }}>View User</Button>
                        </div>
                        
                        </div>
                        
                    ))
        
        )} 
        </div>
            {
                openModal&&currentUser?<>
                    <Modal
                    open={openModal}
                    className="userDetails">
                        <>
                        <div className="card userCardDetails">
                            <div className='card-body'>
                            <Typography> {userName}'s Chitti Payment Details</Typography>
                            
                            {chitsArray}


                        <Button variant="contained"
                        onClick={(e)=>{handleOpenModal(false)}}
                        >Close User Details</Button>
                            </div>
                        </div>
                        </>
                    </Modal>
                </>:<></>
            }


            {/* user details */}
{
    addNewUserDetails&&(
        <Modal
        open={addNewUserDetails}>
            <div className='new_userDetails'>
            {
                successMessae!==null&& isBtnClicked&&!isLoading ? <>
                <Alert
                severity='success'>
                    <div className="d-flex flex-row justify-content-around">
                        <div>{successMessae}</div>
                        <div><CancelIcon onClick={(e)=>{setSuccessMessage(null)}}/></div>
                    </div>
                </Alert>
                </>:<>
                    {isBtnClicked&&isLoading ? <>
                        <RotateLeftIcon className="LoadingIcon"/>
                    </> : <></>}
                </>
            }
                <div className="card new_userDetails_card ">
                <Button variant="" className="my-2 new_userDetails_closeBtn"
                onClick={(e)=>{setAddNewUserDetails(false);setSuccessMessage(null)}}>
                    <CancelIcon/>
                </Button>
                <TextField label="Enter new User name" className="my-3"
                    onChange = { (e)=>{setInputUserName(e.target.value)}}
                />
                <TextField label="Enter new User mobile number" className="my-3"
                    onChange = {(e)=>{setInputUserMobile(e.target.value)}}
                />
                <Button variant="contained" color="secondary"
                onClick={(e)=>{addUserToChitti()}}>Add this user</Button>
                
                </div>
            </div>
        </Modal>
    )
}
       
    </div>
  )
}

export default DisplayChittiUsers
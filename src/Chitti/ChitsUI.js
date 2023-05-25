/* eslint-disable no-lone-blocks */
import React,{useState} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TextField,Button } from '@mui/material';
import "./ChitsUI.css";
import { BASE_URL } from './Helper';
import axios from 'axios';

//ToDo
/*
    1. Grab the userId
    2. Point to otherDetails array
    3. We know index => month
    4. loop through otherDetails array until we find index === month
    5. print those properties here
*/
const ChitsUI = ({index, userId,currentUser}) => {
    // console.log("otherDetails"+otherDetails);
    for(let i=0;i<index;i++){
        if(currentUser.otherDetails[i]!==undefined){
        
            console.log((currentUser.otherDetails.map((item)=>(item)))); 
        }
    }

    const[isEditing,setIsEditing] = useState(false);
    //fileds
    const[Status,setStatus] = useState("");
    const[Mode,setMode] = useState("");
    const[Date,setDate] = useState("");
    const month = index;

    // currentUser.otherDetails.filter()

    // const[currentUserStatus,SetCurrentUserStatus] = useState("");
    const editChitDetails = ()=>{
        setIsEditing(true);
    }
    //update chits month
    const updateDetails = (indexValue)=>{
            console.log("Index value is : "+indexValue);
            //keep track of db
            
            if(Status===""){
                setStatus("Not Paid ");   
            }
            else{
                console.log("Status -"+Status);
            }
                // console.log("Status -"+Status);
            {Mode===""? <>{setMode("Hand Cash")}</> :<>{
                console.log("Mode -"+Mode)

            }</>}
            {Date===""? <>{setDate("")}</> :<>
                {
                <>
                {console.log("Date -"+Date)}
                {console.log(typeof(Date))}
                </>
                }
            </>}
            const body = {month,Mode,Status,Date};
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            //backend 
            const response = axios.put(BASE_URL+"/users/update/"+userId,body,config)
            .then((data)=>{
                console.log('After Updating');
                console.log(data);
                console.log(response);
            }).catch((err)=>{console.log(err.message)});
            
    }
  return (
    <div className='card my-3 p-3 chitsUICard'>
         <div className="my-3">
         {isEditing ? <>
           <form onSubmit={(e)=>{e.preventDefault()}}>
           <TextField label="Status" 
           defaultValue="Enter Payment Status"
                onChange={(e)=>{setStatus(e.target.value)}}
            />
            <br/><br/>
            <TextField label="Payment Mode" defaultValue="Enter the payment mode"
                onChange = {(e)=>{setMode(e.target.value)}}
            />
            <br/><br/>
            <TextField label="Date" type="Date" onChange={(e)=>{setDate(e.target.value)}}/>
            <br/>
            <Button variant="contained" className='my-3' type="submit"
            onClick={()=>{updateDetails(index)}}>Update Details</Button>
           </form>
         </> :<>
            
            <p>Month - {index}</p>
            <p>Status - {currentUser.otherDetails.map((item)=>(item.month===index ? <>{
               item.Status 
               
                } </> :<></>))}</p>
            <p>Mode - {currentUser.otherDetails.map((item)=>(item.month===index ? <>{item.Mode}</>:<></>))}</p>
            <p>Date - {currentUser.otherDetails.map((item)=>(item.month===index?<>{item.Date}</>:<></>))}</p>
         </>}
         </div>
         <div className="moreIcon">
            <MoreVertIcon onClick={(e)=>{editChitDetails()}}/>
         </div>
    </div>
  )
}

export default ChitsUI
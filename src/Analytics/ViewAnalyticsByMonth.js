import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from '../Chitti/Helper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import { Box ,Modal,TextField} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
const ViewAnalyticsByMonth = () => {
    const[state,setState] = useState([]);
    const[loaded,setLoaded] = useState(false);
    const[editingLoaded,setEditingLoaded] = useState(false);
    const[editUserDetails,setEditUserDetails] = useState({});
    const[userName,setUserName] = useState();
    const[userAmount,setUserAmount] = useState();
    const[userMode,setUserMode] = useState();
    const[userDate,setUserDate] = useState();

    const[isWantToDelete,setIsWantToDelete] = useState(false);
    const {month} = useParams();

    useEffect(()=>{
    const loadData = async()=>{

        const res = await axios.get(BASE_URL+"/users/analytics/month/"+month+"/viewMore").then((data)=>{
            setState(data.data);
            setLoaded(true);
            console.log(data); console.log(res);
            
          }).catch((err)=>{console.log(err)});
    }

    loadData();
    
    },[month]);
    var totalAmount = 0;
    state.forEach((item)=>{
        totalAmount = totalAmount+item.Amount;
    })
    const EditThisUserDetails = async (userName) =>{
        console.log("You are editing : "+userName);
        const res = await axios.get(BASE_URL+'/users/getuserName/'+userName+"/monthId/"+month).then((data)=>{
            console.log(data.data);
            setEditingLoaded(true); 
            setEditUserDetails(data.data);
            setUserName(data.data.userName);
            setUserAmount(data.data.Amount);
            setUserDate(data.data.Date);
            setUserMode(data.data.Mode);
            console.log(res);
        }).catch((err)=>{console.log(err)})
    }
    const RemoveThisUserDetails = (userName) =>{
        console.log("You are deleting : "+userName);
        setIsWantToDelete(true);
        console.log(isWantToDelete);
    }

   

  return (
    <div className="container">
        <div className="row">
            <h5 className='my-3 text-center'>You are viewing : {month}th month Chit Details </h5>

            <br/><br/><br/>
           {
            loaded ? <>

            <TableContainer  style={{border:"0.7px solid black",overFlowX:"scroll"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{minWidth:"100px",fontWeight:"bold",color:"#993399"}}>S.No</TableCell>
                            <TableCell sx={{minWidth:"150px",fontWeight:"bold",color:"#993399"}}>Date</TableCell>
                            <TableCell sx={{minWidth:"150px",fontWeight:"bold",color:"#993399"}}>Name</TableCell>
                            <TableCell sx={{minWidth:"100px" ,fontWeight:"bold",color:"#993399"}}>Amount</TableCell>
                            <TableCell sx={{minWidth:"150px",fontWeight:"bold",color:"#993399"}}>Mode</TableCell>
                            <TableCell sx={{minWidth:"50px",fontWeight:"bold",color:"#993399"}}>More Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state && state.map((item)=>(
                            <>
                                <TableRow
                                key={item.userName}>
                                    <TableCell>{state.indexOf(item)+1}</TableCell>
                                    <TableCell style={{color:"brown"}}>{item.Date}</TableCell>
                                    <TableCell style={{color:"green"}}>{item.userName}</TableCell>
                                    <TableCell style={{color:"blue"}}> &#8377; {item.Amount}</TableCell>
                                    <TableCell style={{color:"red"}}>{item.Mode}</TableCell>
                                    <TableCell style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                            {/* <EditIcon sx={{color:"green"}}/>
                                            <DeleteForeverIcon sx={{color:"red"}}/> */}
                                            <button className="btn btn-sm btn-success" onClick={(e)=>{EditThisUserDetails(item.userName)}}>Edit &nbsp; <EditIcon sx={{color:"white",fontSize:"14px"}}/></button>
                                            <button className="btn btn-sm btn-danger" onClick={(e)=>{RemoveThisUserDetails(item.userName)}}>Remove &nbsp; <DeleteForeverIcon sx={{color:"white",fontSize:"14px"}}/></button>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{minWidth:"120px"}}>
                            <h6 style={{color:"blue"}}>Grand Total</h6>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell style={{color:"blue"}}> <h6>&#8377;{totalAmount}</h6></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
           </> : <>
           <Box sx={{ display: 'flex' , flexDirection:"column", width:'100%',height:'100%',justifyContent:'center',alignItems: 'center'}}>
      <CircularProgress />
      <br/><br/>
        <p>Loading .... Please Wait.</p>
    </Box>
           </>}


           {editingLoaded && editUserDetails? <>
            <Modal
            open={editingLoaded}
            aria-labelledby="modal-modal-title"
            style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}
  aria-describedby="modal-modal-description">
                <Box 
                style={{
                    width:"90%",
                    height:"70%",
                    backgroundColor:"white",
                    position:"relative",
                    borderRadius:"10px"}}
                >
                    <div className="p-3">
                        
                        <button 
                        className="btn btn-md"
                        style={{position:"absolute",top:"10px",right:"10px"}}
                        onClick = {()=>{return setEditingLoaded(false)}}
                        >Close &nbsp; <CloseIcon sx={{fontSize:"18px"}}/></button>

                        <div className="my-5 d-flex flex-column justify-content-around align-center">
                        
                        <label>Name </label>
                        <TextField
                            placeholder='Enter user name here'
                            value={userName}
                            onChange = {(e)=>{setUserName(e.target.value)}}
                        />
                        <br/>
                        <label>Amount </label>
                        <TextField
                            placeholder='Amount'
                            className="my-1"
                            value={userAmount}
                            onChange = {(e)=>{setUserAmount(e.target.value)}}

                        />
                        <br/>

                        <label>Date </label>
                        <TextField
                            placeholder='Date'
                            className="my-1"
                            type="Date"
                            value={userDate}
                            onChange = {(e)=>{setUserDate(e.target.value)}}

                        />
                        <br/>

                        <label>Mode </label>
                        <TextField
                            placeholder='Mode'
                            className="my-1"    
                            value={userMode}
                            onChange = {(e)=>{setUserMode(e.target.value)}}

                        />
                        <button className="btn btn-md btn-warning mt-3">Update Details</button>
                        </div>
                    </div>
                </Box>
            </Modal>
           </> :<></>}
        </div>
    </div>
  )
}

export default ViewAnalyticsByMonth
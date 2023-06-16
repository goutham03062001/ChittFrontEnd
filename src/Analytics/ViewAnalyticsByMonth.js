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
import { Box } from '@mui/material';

const ViewAnalyticsByMonth = () => {
    const[state,setState] = useState([]);
    const[loaded,setLoaded] = useState(false);
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
                            <TableCell sx={{minWidth:"150px",fontWeight:"bold"}}>Name</TableCell>
                            <TableCell sx={{minWidth:"100px" ,fontWeight:"bold"}}>Amount</TableCell>
                            <TableCell sx={{minWidth:"150px",fontWeight:"bold"}}>Date</TableCell>
                            <TableCell sx={{minWidth:"150px",fontWeight:"bold"}}>Mode</TableCell>
                            <TableCell sx={{minWidth:"100px",fontWeight:"bold"}}>S.No</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state && state.map((item)=>(
                            <>
                                <TableRow
                                key={item.userName}>
                                    <TableCell>{item.userName}</TableCell>
                                    <TableCell> &#8377; {item.Amount}</TableCell>
                                    <TableCell>{item.Date}</TableCell>
                                    <TableCell>{item.Mode}</TableCell>
                                    <TableCell>{state.indexOf(item)+1}</TableCell>
                                </TableRow>
                            </>
                        ))}
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
        </div>
    </div>
  )
}

export default ViewAnalyticsByMonth
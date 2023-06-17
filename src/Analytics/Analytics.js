/* eslint-disable array-callback-return */
import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import { BASE_URL } from '../Chitti/Helper';
import axios from "axios";
import { Box } from '@mui/material';
import "../Chitti/ChitsUI.css";
import CircularProgress from '@mui/material/CircularProgress';
const Analytics = () => {
  const map = new Map();

  const[response,setResponse] = useState([]);
  const[isLoaded,setIsLoaded] = useState(false);
  // var responseArr = [];
  useEffect(()=>{
    const loadAnalytics = async() =>{
      let month = 11;
      const res = await axios
      .get(BASE_URL+"/users/analytics/month/"+month).then((data) => {
        console.log(data);setResponse(data.data);
         setIsLoaded(true);
        console.log(res);
       
        })
      .catch((err) => {
        console.log(err);
      });
    }
    loadAnalytics();
    // printMonths();
  },[]);

  
const entryMap = new Map();

  response.map((user)=>{
    user.map((index)=>{
      if(map.has(index.month)){
        map.get(index.month).push(index.Amount);
        entryMap.set(index.month,entryMap.get(index.month)+1);
      }else{
        map.set(index.month,[parseInt(index.Amount)]);
        entryMap.set(index.month,1);
      }
    });
  });
  for (let [key, values] of map.entries()) {
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    map.set(key, sum);
  }

  const sortedKeys = Array.from(map.keys()).sort(); //now all keys are sorted
  const sortedMap = new Map(sortedKeys.map(key=>[key,map.get(key)]));
console.log("your entry map is : "+entryMap.keys());
// entryMap.forEach((key,value)=>{
//   // console.log();
//   console.log("Month - "+value + "entries - "+key);
// });

  return (
    <div>
    <p className="text text-center text-info h5 my-3">  View Chit's Amount by Month   </p>
      <br/>

      {isLoaded ? <>
        <Box className = "chitsUICard" style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems : "center"}}>
    {Array.from(sortedMap.entries()).map(([month, amount]) => (
        <>
        <div key={month} className="card  my-3" style={{width:"90%"}}>
          <div className="px-3 card-header">
            <div className="d-flex flex-row justify-content-between">
            <p className="text text-success">Month - {month}</p>
            <p className="text text-info">Total Entries - {entryMap.get(month)}</p>
            </div>
          </div>
            <div className="card-body">
              <p className="text-primary">Total Amount : &#8377;{amount}</p>
            </div>
          <div className="mx-2 my-2  d-flex justify-content-start align-center">
            {/* <button className="btn btn-sm btn-warning"
            onClick={(e)=>{viewThisMonthAnalytics(month)}}>View More</button> */}
            <Link to={`/viewAnalyticsByMonth/${month}`}> 
            <button className="btn btn-sm btn-info text-white">View {entryMap.get(month)} Entries</button>
            
            </Link>
          </div>
          </div>
        </>
      ))}
    </Box>
      </> :
        <>
        <Box sx={{ display: 'flex' , flexDirection:"column", width:'100%',height:'100vh',justifyContent:'center',alignItems: 'center'}}>
      <CircularProgress />
      <br/><br/>
        <p>Loading .... Please Wait.</p>
    </Box>
        </>
      }
    </div>
  )
}

export default Analytics
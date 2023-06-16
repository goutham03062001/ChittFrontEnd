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
        console.log(data);setResponse(data.data);console.log(res);
       
        })
      .catch((err) => {
        console.log(err);
      });
    }
    loadAnalytics();
    setIsLoaded(true);
    // printMonths();
  },[]);

  
  response.map((user)=>{
    user.map((index)=>{
      if(map.has(index.month)){
        map.get(index.month).push(index.Amount);
      }else{
        map.set(index.month,[parseInt(index.Amount)]);
      }
    });
  });
  for (let [key, values] of map.entries()) {
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    map.set(key, sum);
  }

  const sortedKeys = Array.from(map.keys()).sort(); //now all keys are sorted
  const sortedMap = new Map(sortedKeys.map(key=>[key,map.get(key)]));
  //const sortedKeys = Array.from(yourMap.keys()).sort();

  // Create a new sorted map based on the sorted keys
  // const sortedMap = new Map(sortedKeys.map(key => [key, yourMap.get(key)]));


  return (
    <div>
    <h4 className="text text-center my-3">  View Chit's Amount by Month   </h4>
      <br/>

      {isLoaded ? <>
        <Box className = "chitsUICard" style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems : "center"}}>
    {Array.from(sortedMap.entries()).map(([month, amount]) => (
        <>
        <div key={month} className="card  my-3" style={{width:"90%"}}>
          <div className="card-header">
            <div className="d-flex flex-row">
            <p>Month - </p>
            <p>{month}</p>
            </div>
          </div>
            <div className="card-body">
              <p>Total Amount : &#8377;{amount}</p>
            </div>
          <div className="mx-2 my-2  d-flex justify-content-end align-center">
            {/* <button className="btn btn-sm btn-warning"
            onClick={(e)=>{viewThisMonthAnalytics(month)}}>View More</button> */}
            <Link to={`/viewAnalyticsByMonth/${month}`}> 
            <button className="btn btn-sm btn-warning">View More</button>
            
            </Link>
          </div>
          </div>
        </>
      ))}
    </Box>
      </> :
        <Box sx={{ display: 'flex' , flexDirection:"column", width:'100%',height:'100%',justifyContent:'center',alignItems: 'center'}}>
      <CircularProgress />
      <br/><br/>
        <p>Loading .... Please Wait.</p>
    </Box>
      }
    </div>
  )
}

export default Analytics
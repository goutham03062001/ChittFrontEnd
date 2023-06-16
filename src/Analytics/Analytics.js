/* eslint-disable array-callback-return */
import React,{useState,useEffect} from 'react';
import { BASE_URL } from '../Chitti/Helper';
import axios from "axios";
import { Box } from '@mui/material';
import "../Chitti/ChitsUI.css";
const Analytics = () => {
  const map = new Map();
  // const[allUsers,setAllUsers] = useState([]);
  // const[sortedMonths,setSortedMonths] = useState([]);
  const[response,setResponse] = useState([]);
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

  return (
    <div>
    <p>  View Chit's Amount by Month   </p>
      <br/>

    <Box className = "chitsUICard">
    {Array.from(map.entries()).map(([month, amount]) => (
        <>
        <div key={month} className="card my-3">
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
            <button className="btn btn-sm btn-warning">View More</button>
          </div>
          </div>
        </>
      ))}
    </Box>
    </div>
  )
}

export default Analytics
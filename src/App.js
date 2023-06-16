import React from 'react'
import DisplayChittiUsers from './Chitti/DisplayChittiUsers';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Analytics from './Analytics/Analytics';
import ViewAnalyticsByMonth from "./Analytics/ViewAnalyticsByMonth.js";
const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route exact path="/" element={<DisplayChittiUsers/>}/>
        <Route exact path="/viewAnalytics" element={<Analytics/>}/>
        <Route exact path="/viewAnalyticsByMonth/:month" element={<ViewAnalyticsByMonth/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
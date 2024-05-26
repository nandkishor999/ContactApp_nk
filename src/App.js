import React from 'react';
import Navbar from './Components/navbar';
import Create from './Components/Create';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ViewData from './Components/ViewData';
import Update from './Components/Update';
import Charts from './Components/Charts';

// import './app.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
         
          <Routes>
         <Route path="/" element={<Create/>}/>
          <Route path="/view" element={<ViewData/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          <Route path="/charts" element={<Charts/>}/>

          </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import Quiz  from './component/Quiz';
import Result  from './component/Result';
import Login from './component/Login';
import Authenticate from './component/Authenticate';
import './app.css'
import Layout from './component/Layout';

function App() {
  return (
  <div className='bgimg'>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Route>
        </Route>
      </Routes>
      <div className='worldcup'>
    <CardMedia
          component="img"
          sx={{ width: 120 }}
          image="http://localhost:5079/images/worldcup.svg"
        />
        </div>
    </BrowserRouter >
    
    </div>
  )
}

export default App

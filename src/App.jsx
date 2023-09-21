import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom';
import '../src/index.css';
import Login from './Components/Login'
import Create from './Components/Create'
import Gallery from './Gallery/Gallery'
import ImageList from './Gallery/Images'
import { useState } from 'react';
import ayanfe from "./assets/images/ayanfe.png";
import dami from "./assets/images/dami.jpg";
import black from "./assets/images/baby3.png";
import americanBaby from "./assets/images/baby4.png";
import buffalo from "./assets/images/buffalo.png";
import idowu from "./assets/images/idowu.jpg";
import deer from "./assets/images/deer.png";
import elephant from "./assets/images/elephant.png";
import girralf from "./assets/images/girralf.png";
import lion from "./assets/images/lion.png";
import monkey from "./assets/images/monkey.png";
import sheep from "./assets/images/sheep.png";
import snake from "./assets/images/snake.png";
import tiger from "./assets/images/tiger.png";
import wolf from "./assets/images/wolf.png";
import zebra from "./assets/images/zebra.png";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true'
  );
  
  const ProtectedRoutes = ({children}) =>{
    
    
    if(isAuthenticated ){
      return children
    }else{
      return <Navigate to={"/"} replace={true}/>
    }
  }

  const images = [
    { src: dami, tag: "dami", id: 1 },
    { src: ayanfe, tag: "ayanfe", id: 2 },
    { src: idowu, tag: "idowu", id: 3 },
    { src: americanBaby, tag: "whitebaby", id: 4 },
    { src: black, tag: "blackBaby", id: 5 },
    { src: buffalo, tag: "buffalo", id: 6 },
    { src: deer, tag: "deer", id: 7 },
    { src: elephant, tag: "elephant", id: 8 },
    { src: girralf, tag: "girralf", id: 9 },
    { src: lion, tag: "lion", id: 10 },
    { src: monkey, tag: "monkey", id: 11 },
    { src: sheep, tag: "sheep", id: 12 },
    { src: snake, tag: "snake", id: 13 },
    { src: tiger, tag: "tiger", id: 14 },
    { src: wolf, tag: "wolf", id: 15 },
    { src: zebra, tag: "zebra", id: 16 },
  ];
  return (
    <Routes>
      <Route path='/' element={<Login  setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path='/create' element={<Create  />} />
      <Route path='/gallery' element={
          <ProtectedRoutes><Gallery  images={images}/></ProtectedRoutes>
          } />
      <Route path='/imagelist' element={
          <ProtectedRoutes><ImageList images={images}/></ProtectedRoutes>
          } />
    </Routes>
  )
}

export default App


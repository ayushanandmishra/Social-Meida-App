
import LoginPage from './Components/LoginPage/LoginPage'
import HomePage from './Components/HomePage/HomePage'
import SignUpPage from './Components/SignUpPage/Signup'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import UserPage from './Components/UserPage/UserPage'
import { ChatPage } from './Components/ChatApp/ChatPage'

import './App.css'


function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div>
      <BrowserRouter>

        <Routes>


          <Route path='/'  element={isAuth? <HomePage/>:<LoginPage/>}/>
          <Route path='/signup'  element={isAuth?<HomePage/> :<SignUpPage />} />
          <Route path='/user/:userId' element={isAuth?<UserPage/>:<Navigate to="/"/>}/>
          <Route path='/chat' element={isAuth?<ChatPage/>:<Navigate to="/"/>}/>


        </Routes>

        

      </BrowserRouter>

    </div>


  )
}

export default App

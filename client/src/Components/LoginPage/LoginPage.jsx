import { useState } from "react";
import Navbar from "../NavBar/Navbar1";
import LoginForm from "./LoginForm/LoginForm.jsx"
import SignIn from "./LoginForm/LoginForm2";
import './LoginPage.css'

export default function LoginPage()
{
    

    return(
       <div className="LoginPageContainer">
         <Navbar/>
         <div className="formContainer">
            <LoginForm/>
         </div>
       </div>
    )
}
import { useEffect, useState } from "react"
import UserService from "../../infrastructure/UserService"
import { Outlet, useNavigate } from "react-router-dom"


export default function MonthlyParkingPass() {
    const navigate = useNavigate();


const isUser = ()=>{
    if(UserService.isUser()){
        navigate("my-monthly-pass")
    }
    else{
        navigate("monthly-pass-management")
    }
}

useEffect(isUser,[])
    return (
        <div className="">
        <Outlet/>
        </div>

    )
}

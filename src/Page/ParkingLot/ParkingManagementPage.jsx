import { useEffect, useState } from "react"
import {Outlet, useNavigate} from "react-router-dom"
import UserService from "../../infrastructure/UserService";


export default function ParkingLotManagerPage() {
  const navigate = useNavigate()
  const isAdmin = () => {
    if (UserService.isAdmin()) {
    }
    else (
        navigate('..')
    )
}

useEffect(isAdmin, [])
    return (
        <div className="xl:px-[200px]">
          <Outlet/>
        </div>
    )
}

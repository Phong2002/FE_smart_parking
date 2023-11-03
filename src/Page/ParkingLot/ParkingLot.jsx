import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import UserService from "../../infrastructure/UserService";
import { ButtonGroup,Button } from "@material-tailwind/react";


export default function ParkingLot() {
    const [isManage,setManage]=useState(false)
    
    const navigate = useNavigate();
    return (
        <div className="">
            {UserService.isAdmin() ?
                <div className="grid place-items-center m-2">
                    <ButtonGroup variant="outlined" color="deep-orange">
                        <Button onClick={()=>{navigate('/parkinglot');setManage(false)}} className={!isManage?"bg-blue-phenikaa":"" }>Xem bãi đỗ xe</Button>
                        <Button onClick={()=>{navigate('/parkinglot/management');setManage(true)}} className={isManage?"bg-blue-phenikaa":"" }>Quản lý bãi đỗ xe</Button>
                    </ButtonGroup>
                </div>
                :
                <div />
            }
            <Outlet />
        </div>

    )
}

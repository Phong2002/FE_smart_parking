import { useEffect, useState } from "react"
import UserService from "../../infrastructure/UserService"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@material-tailwind/react";


export default function MonthlyParkingPass() {
    const navigate = useNavigate();
    const location = useLocation();
    const parts = location.pathname.split('/');
    const management = parts[parts.indexOf('parking-pass') + 1];
    const [isManage, setManage] = useState(management)
    const handleChangePath = () => {
        if (management == "management") {
            setManage(true)
        }
        else {
            setManage(false)
        }
    }
    useEffect(handleChangePath, [management])

    const isUser = () => {
        if (UserService.isUser()) {
            navigate("my-monthly-pass")
        }
        else {
            navigate("management")
        }
    }

    useEffect(isUser, [])
    return (
        <div className="">
            {!UserService.isUser() ?
                <div className="flex justify-center m-3">
                    {isManage ?
                        <Button onClick={() => { navigate('monthly-pass-management') }} variant="outlined" color="cyan" className="rounded-full">Quản lý vé tháng</Button> :
                        <Button onClick={() => { navigate('management') }} variant="outlined" color="indigo" className="rounded-full">Quản lý vé </Button>
                    }

                </div>
                :
                <div />
            }

            <Outlet />
        </div>

    )
}

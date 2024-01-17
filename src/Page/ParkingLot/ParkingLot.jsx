import {useEffect, useState} from "react"
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {io} from "socket.io-client";
import UserService from "../../infrastructure/UserService";
import {ButtonGroup, Button, Tabs, TabsHeader, Tab} from "@material-tailwind/react";


export default function ParkingLot() {

    const location = useLocation();
    const parts = location.pathname.split('/');
    const management = parts[parts.indexOf('parkinglot') + 1];
    const [isManage, setManage] = useState(management ? 1 : 0)
    const handleChangePath = () => {
        if (management == "management") {
            setManage(true)
        } else {
            setManage(false)
        }
    }
    useEffect(handleChangePath, [management])
    const navigate = useNavigate();
    return (
        <div className="">

            {UserService.isAdmin() ?
                <div className="grid place-items-center m-2">
                    <Tabs value={isManage} className="w-full md:w-[500px]">
                        <TabsHeader className="bg-transparent"
                                    indicatorProps={{
                                        className: "bg-orange-phenikaa !text-blue-phenikaa",
                                    }}>
                            <Tab key={1} value={0} onClick={() => {
                                navigate('/parkinglot')
                            }}
                            className="text-blue-phenikaa font-bold !z-2"
                            >
                                Xem bãi đỗ xe
                            </Tab>
                            <Tab key={2} value={1} onClick={() => {
                                navigate('/parkinglot/management')
                            }}
                            className="text-blue-phenikaa font-bold"
                            >
                                Quản lý bãi đỗ xe
                            </Tab>
                        </TabsHeader>
                    </Tabs>
                </div>
                :
                <div/>
            }
            <Outlet/>
        </div>

    )
}

import { useState } from "react"
import { io } from "socket.io-client";

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Tooltip,
} from "@material-tailwind/react";

export default function ParkingSpot(props) {

    let spot = <div></div>

    if (props.demo) {

       return <div className=" border-gray-200 my-[2px] border-[2px]">
            <div className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-green-600">
                {props.index}
            </div>
        </div>
    }


    if (props.edit) {

        switch (props.location.state) {
            case "EMPTY":
                spot = <div className=" border-gray-200 my-[2px] border-[2px]">
                    <div className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-green-600">
                        {props.location.location}
                    </div>
                </div>
                break
            case "HAS_VEHICLE":
                spot = <div className=" border-gray-200 my-[2px] border-[2px]">
                    <div className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-red-600">
                        {props.location.location}
                    </div>
                </div>
                break
            case "ROAD":
                spot = <div className=" border-yellow-600 border-dashed my-[2px] border-[2px] ">
                    <div className="flex justify-center text-center items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-blue-gray-500">
                        ĐƯỜNG ĐI
                    </div>
                </div>
                break
            case "BLOCKED":
                spot = <div className=" border-yellow-600 border-dashed my-[2px] border-[2px]">
                    <div className="flex justify-center  items-center text-yellow-600 font-bold rounded-xl w-[80px] h-[50px] bg-red-600">
                        BLOCK
                    </div>
                </div>
                break
        }
    }

    else {

        switch (props.location.state) {
            case "EMPTY":
                spot = <div className=" border-gray-200 my-[2px] border-[2px]">
                    <div className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-green-600">
                        {props.location.location}
                    </div>
                </div>
                break
            case "HAS_VEHICLE":
                spot = <div className=" border-gray-200 my-[2px] border-[2px]">
                    <div className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-red-600">
                        {props.location.location}
                    </div>
                </div>
                break
            case "ROAD":
                spot = <div className=" my-[2px] p-[1.6px] ">
                    <div className="flex justify-center   items-center text-white font-bold rounded-lg w-[80px] h-[50px] ">
                    </div>
                </div>
                break
            case "BLOCKED":
                spot = <div className=" border-yellow-600 border-dashed my-[2px] border-[2px]">
                    <div className="flex justify-center  items-center text-yellow-600 font-bold rounded-xl w-[80px] h-[50px] bg-red-600">
                        BLOCK
                    </div>
                </div>
                break
        }
    }

    if (props.edit) {
        return <div className="cursor-pointer select-none">
            {(props.location.state !== "HAS_VEHICLE")
                ?
                <Menu className="z-[9999999]">
                    <MenuHandler>
                        {spot}
                    </MenuHandler>
                    <MenuList className="z-[9999999]">
                        <MenuItem onClick={() => props.handleChangeState( "EMPTY", props.location.id)}>Có thể đỗ</MenuItem>
                        <MenuItem onClick={() => props.handleChangeState( "ROAD", props.location.id)}>Đường đi</MenuItem>
                        <MenuItem onClick={() => props.handleChangeState( "BLOCKED",props.location.id)}>Block</MenuItem>
                    </MenuList>
                </Menu>
                :
                <Tooltip content="Hiện tại đang có xe đỗ" className="z-[9999999]">
                    {spot}
                </Tooltip>
            }
        </div>
    }

    return spot
}

import { useState } from "react"
import { io } from "socket.io-client";

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Tooltip, Dialog, DialogHeader, DialogBody, DialogFooter, Typography,
} from "@material-tailwind/react";

import UserService from "../../infrastructure/UserService";
import requester from "../../infrastructure/requester.js";

export default function ParkingSpot(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    function formatVietnameseDate(dateString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('vi-VN', options);
        return formattedDate;
    }

    function formatTimeDifference(startTime) {
        const startDate = new Date(startTime);
        const endDate = new Date();
        const timeDifference = endDate - startDate;

        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const currentDate = new Date();

        const formattedDifference = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
        const formattedCurrentDate = `Ngày ${currentDate.getDate()} Tháng ${currentDate.getMonth() + 1} Năm ${currentDate.getFullYear()}, ${currentDate.getHours()} giờ ${currentDate.getMinutes()} phút ${currentDate.getSeconds()} giây`;

        return {
            difference: formattedDifference,
            currentDate: formattedCurrentDate,
        };
    }

    let spot = <div></div>

    if (props.demo) {

        return <div className=" border-gray-200 my-[2px] border-[2px]">
            <div
                className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-green-600">
                {props.index}
            </div>
        </div>
    }

    if (props.edit) {

        switch (props.location.state) {
            case "EMPTY":
                spot = <div className=" border-gray-200 my-[2px] border-[2px]">
                    <div
                        className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-green-600">
                        {props.location.location}
                    </div>
                </div>
                break
            case "HAS_VEHICLE":
                spot = <div className=" border-gray-200 my-[2px] border-[2px]">
                    <div
                        className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-red-600">
                        {props.location.location}
                    </div>
                </div>
                break
            case "ROAD":
                spot = <div className=" border-yellow-600 border-dashed my-[2px] border-[2px] ">
                    <div
                        className="flex justify-center text-center items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-blue-gray-500">
                        ĐƯỜNG ĐI
                    </div>
                </div>
                break
            case "BLOCKED":
                spot = <div className=" border-yellow-600 border-dashed my-[2px] border-[2px]">
                    <div
                        className="flex justify-center  items-center text-yellow-600 font-bold rounded-xl w-[80px] h-[50px] bg-red-600">
                        BLOCKED
                    </div>
                </div>
                break
        }
    } else {

        switch (props.location.state) {
            case "EMPTY":
                spot = <div className=" border-gray-200 my-[2px] border-[2px]">
                    <div
                        className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-green-600">
                        {props.location.location}
                    </div>
                </div>
                break
            case "HAS_VEHICLE":
                if(props.findVehicle==props.location.id){
                    spot = <div className=" border-gray-200 my-[2px] border-[2px]">
                    <div
                        className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-blue-600">
                        {props.location.location}
                    </div>
                </div>
                }
                else{
                    spot = <div className=" border-gray-200 my-[2px] border-[2px]">
                    <div
                        className="flex justify-center  items-center text-white font-bold rounded-lg w-[80px] h-[50px] bg-red-600">
                        {props.location.location}
                    </div>
                </div>
                }
                break
            case "ROAD":
                spot = <div className=" my-[2px] p-[1.6px] ">
                    <div
                        className="flex justify-center   items-center text-white font-bold rounded-lg w-[80px] h-[50px] ">
                    </div>
                </div>
                break
            case "BLOCKED":
                spot = <div className=" border-yellow-600 border-dashed my-[2px] border-[2px]">
                    <div
                        className="flex justify-center  items-center text-yellow-600 font-bold rounded-xl w-[80px] h-[50px] bg-red-600">
                        BLOCKED
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
                        <MenuItem onClick={() => props.handleChangeState("EMPTY", props.location.id)}>Có thể
                            đỗ</MenuItem>
                        <MenuItem onClick={() => props.handleChangeState("ROAD", props.location.id)}>Đường đi</MenuItem>
                        <MenuItem onClick={() => props.handleChangeState("BLOCKED", props.location.id)}>Block</MenuItem>
                    </MenuList>
                </Menu>
                :
                <Tooltip content="Hiện tại đang có xe đỗ" className="z-[9999999]">
                    {spot}
                </Tooltip>
            }
        </div>
    } else if (UserService.getRole() != "User") {
        switch (props.location.state) {
            case "HAS_VEHICLE":
                return (
                    <div>
                        <div onClick={handleOpen}>
                            <div className="cursor-pointer select-none">
                                {spot}
                            </div>
                        </div>

                        <Dialog open={open} handler={handleOpen}>
                            <DialogHeader>Chi tiết vị trí số {props.location.location}</DialogHeader>
                            <DialogBody>
                                <Typography><span className="font-bold">Biển số xe :</span>{props.location.vehicleManagement.licensePlates}</Typography>
                                <Typography><span className="font-bold">Thời gian vào:</span>{formatVietnameseDate(props.location.vehicleManagement.timeIn)}</Typography>
                                <Typography><span className="font-bold">Thời gian đỗ :</span>{formatTimeDifference(props.location.vehicleManagement.timeIn).difference}</Typography>
                                <div>
                                    <img className="max-w-[456px] max-h-[456px]" src={requester.getImage(props.location.vehicleManagement.licensePlatesImageUrl)}/>
                                </div>
                                <div>
                                    
                                </div>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpen}
                                    className="mr-1"
                                >
                                    <span>Thoát</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </div>
                )
            case "EMPTY":
                return (
                    <Tooltip content="Vị trí này chưa có xe đỗ" className="z-[9999999]">
                        <div className="cursor-pointer select-none">
                            {spot}
                        </div>
                    </Tooltip>
                )
            case "BLOCKED":
                return (
                    <Tooltip content="Vị trí này đã bị chặn" className="z-[9999999]">
                        <div className="cursor-pointer select-none">
                            {spot}
                        </div>
                    </Tooltip>
                )
            case "ROAD":
                return (
                    <Tooltip content="Khu vực đường đi lại" className="z-[9999999]">
                        <div className="cursor-pointer select-none">
                            {spot}
                        </div>
                    </Tooltip>
                )
        }

    }

    return (<div className="cursor-pointer select-none">
        {spot}
    </div>)
}

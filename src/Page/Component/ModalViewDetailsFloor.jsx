import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import UserService from "../../infrastructure/UserService";
import { ButtonGroup, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography, Switch } from "@material-tailwind/react";
import ParkingSimulation from "./ParkingSimulation";
import { ToastContainer, toast } from "react-toastify";
import requester from "../../infrastructure/requester";


export default function ModalViewDetailsFloor(props) {

    const [nameFloorDetails, setNameFloorDetails] = useState(props.floor.name)
    const [rowFloorDetails, setRowFloorDetails] = useState(props.floor.row)
    const [totalSlot, setTotalSlot] = useState(100)
    const [messAdd, setMessAdd] = useState('')
    const [demo, setDemo] = useState(false)
    const [listParkingLocation, setListParkingLocation] = useState([])


    const [listBlocked, setListBlocked] = useState([]);
    const [listEmpty, setListEmpty] = useState([]);
    const [listRoad, setListRoad] = useState([]);

    const handleTurnOffDemo = () => {
        setDemo(false)
        clearListState()
    }

    const clearListState = () => {
        setListBlocked([])
        setListEmpty([])
        setListRoad([])
    }


    const handleChangeState = (status, id) => {
        let x = 1
        let newListParkingLocation = [...listParkingLocation]

        for (let i = 0; i < newListParkingLocation.length; i++) {
            if ((newListParkingLocation[i].id == id) && (status != "EMPTY")) {
                newListParkingLocation[i].state = status;
                continue
            }
            else if ((newListParkingLocation[i].id == id) && (status == "EMPTY")) {
                newListParkingLocation[i].state = "EMPTY";
                newListParkingLocation[i].location = x;
                x++;
                continue;
            }
            else if (newListParkingLocation[i].state == "BLOCKED" || newListParkingLocation[i].state == "ROAD") {
                continue
            }
            else {
                newListParkingLocation[i].location = x;
                x++;
                continue
            }
        }

        setListParkingLocation(newListParkingLocation)

        if (listBlocked.includes(id)) {
            setListBlocked(listBlocked.filter(item => item !== id)); 
        }
        if (listEmpty.includes(id)) {
            setListEmpty(listEmpty.filter(item => item !== id)); 
        }
        if (listRoad.includes(id)) {
            setListRoad(listRoad.filter(item => item !== id)); 
        }

        if (status === 'BLOCKED') {
            setListBlocked([...listBlocked, id]);
        } else if (status === 'EMPTY') {
            setListEmpty([...listEmpty, id]);
        } else if (status === 'ROAD') {
            setListRoad([...listRoad, id]);
        }

    }


    const onChangeRowFloorDetails = (e) => {
        setMessAdd("")
        setRowFloorDetails(e.target.value)
        if (e.target.value <= 0) {
            setMessAdd("Số hàng phải lớn hơn 0")
        }
        if (Number(e.target.value) > Number(totalSlot)) {
            setMessAdd("Số hàng không được lớn hơn số lượng chỗ để xe")
        }
    }

    const onChangeTotalSlotsFloorDetails = (e) => {
        setMessAdd("")
        setTotalSlot(e.target.value)
        if (e.target.value <= 0) {
            setMessAdd("Số lượng chỗ để xe phải lớn hơn 0")
        }
        if (Number(rowFloorDetails) > Number(e.target.value)) {
            setMessAdd("Số hàng không được lớn hơn số lượng chỗ để xe")
        }
    }

    const syncData = () => {
        setNameFloorDetails(props.floor.name)
        setRowFloorDetails(props.floor.row)
    }

    useEffect(syncData, [props.floor])

    const handleGetAllParkingLocation = () => {
        if (props.floor.id) {
            const endpoint = "api/v1/parking-location/all/" + props.floor.id;
            const getAllParkingLocation = (response) => {
                setListParkingLocation(response.data);
                handleCountTotalParkingLocation(response.data);
            }
            requester.get(endpoint, getAllParkingLocation)
        }
    }

    const handleCountTotalParkingLocation = (listParkingLocationx) => {
        setTotalSlot(listParkingLocationx.length)
    }

    const handleUpdateState = ()=>{
       const endpoint = "api/v1/parking-location"

      const  data={
            listblocked:listBlocked,
            listRoad:listRoad,
            listEmpty:listEmpty,
            floorId:props.floor.id,
        }
        const id = toast.loading("Vui lòng đợi ...")

        const handle = (data) => {
            if (data.statusCode == 200) {
                toast.update(id, { render: "Cập nhật thành công", type: "success", isLoading: false, autoClose: 3000 });
                clearListState()
                handleGetAllParkingLocation()

            }
            else {
                toast.update(id, { render: "Cập nhật thất bại", type: "error", isLoading: false, autoClose: 3000 });
            }
        }

        requester.put(endpoint,data,handle)
    }

    useEffect(handleGetAllParkingLocation, [props.openModalFloorDetails])

    return (
        <Dialog open={props.openModalFloorDetails} className={"z-[100]"} handler={() => props.handleOpenModalFloorDetails(handleTurnOffDemo)} size={demo ? "xl" : "sm"}>
            <DialogHeader>Xem chi tiết khu vực {props.floor.name}</DialogHeader>
            <DialogBody >
                <div className="flex flex-col xl:flex-row">
                    <div className={demo ? "w-[369px]" : "w-full"}>
                        <Input variant="standard" label="Tên khu vực đỗ xe" value={nameFloorDetails} onChange={e => setNameFloorDetails(e.target.value)} />
                        <div className="h-6" />
                        <Input variant="standard" label="Số lượng chỗ đỗ xe" type='number' min={1} value={totalSlot} onChange={onChangeTotalSlotsFloorDetails} />
                        <div className="h-6" />
                        <Input variant="standard" label="Số cột" type='number' min={1} value={rowFloorDetails} onChange={onChangeRowFloorDetails} />
                        <Typography className="h-[15px] text-red-600 text-[13px]">
                            {messAdd}
                        </Typography>
                        <Switch label="Mô phỏng" ripple={demo} onChange={e => setDemo(e.target.checked)} />
                    </div>
                    {demo ?
                        <div className="h-[500px] flex overflow-auto">
                            {!messAdd ? <ParkingSimulation demo={false} rows={rowFloorDetails} handleChangeState={handleChangeState} listLocation={listParkingLocation} total={totalSlot} /> : <div />}
                        </div>
                        :
                        <div />
                    }
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => props.handleOpenModalFloorDetails(handleTurnOffDemo)}
                    className="mr-1"
                >
                    <span>Thoát</span>
                </Button>
                <Button variant="gradient" color="green" disabled={messAdd} onClick={handleUpdateState}>
                    <span>Cập nhật</span>
                </Button>
            </DialogFooter>
            <ToastContainer />
        </Dialog>
    )
}

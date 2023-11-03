import { useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import requester from "../../infrastructure/requester";
import {
    Accordion, AccordionBody, AccordionHeader, Button, Typography, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Switch,
} from "@material-tailwind/react";
import ParkingSimulation from "../Component/ParkingSimulation";
import { ToastContainer, toast } from "react-toastify";
import ModalViewDetailsFloor from "../Component/ModalViewDetailsFloor";

export default function ParkingLotDetails() {
    const { id } = useParams();
    const [parkingLot, setParkingLot] = useState({})
    const navigate = useNavigate();

    const [listFloor, setListFloor] = useState([])

    const [currentFloor, setCurrentFloor] = useState({})

    const [nameFloorAdd, setNameFloorAdd] = useState('')
    const [rowFloorAdd, setRowFloorAdd] = useState(1)
    const [totalSlotAdd, setTotalSlotAdd] = useState(1)
    const [messAdd, setMessAdd] = useState('')

    const [openModalFloorDetails,setOpenModalFloorDetails] = useState(false)

    const handleOpenModalFloorDetails=(demo) => {

        setOpenModalFloorDetails(!openModalFloorDetails)
        if(openModalFloorDetails){
            demo()
        }
    }

    const [demo, setDemo] = useState(false)

    const [openModalAddFloor, setOpenModalAddFloor] = useState(false);

    const handleOpenModalAddFloor = () => {
        if (openModalAddFloor) {
            setMessAdd('');
            setDemo(false);
            setRowFloorAdd(1);
            setTotalSlotAdd(1);
            setNameFloorAdd('')
        }
        setOpenModalAddFloor(!openModalAddFloor);
    }

    const [accordion, setAccordion] = useState(false)

    const handleGetParkingLot = () => {
        const endpoint = "api/v1/parkinglot/" + id;

        const getParkingLot = (data) => {
            if (data.statusCode == 200) {
                setParkingLot(data.Data)
            }

            else {
                navigate('..')
            }
        }
        requester.get(endpoint, getParkingLot)
    }

    const onChangeRowFloorAdd = (e) => {
        setMessAdd("")
        setRowFloorAdd(e.target.value)
        if (e.target.value <= 0) {
            setMessAdd("Số hàng phải lớn hơn 0")
        }
        if (Number(e.target.value) > Number(totalSlotAdd)) {
            setMessAdd("Số hàng không được lớn hơn số lượng chỗ để xe")
        }
    }

    const onChangeTotalSlotsFloorAdd = (e) => {
        setMessAdd("")
        setTotalSlotAdd(e.target.value)
        if (e.target.value <= 0) {
            setMessAdd("Số lượng chỗ để xe phải lớn hơn 0")
        }
        if (Number(rowFloorAdd) > Number(e.target.value)) {
            setMessAdd("Số hàng không được lớn hơn số lượng chỗ để xe")
        }
    }


    const handleGetAllFloor = () => {
        const endpoint = "api/v1/floor/" + id;
        const getAllFloor = (response) => {
            setListFloor([...response.data]);
        }
        requester.get(endpoint, getAllFloor)
    }

    const handleCreateFloor = () => {
        const endpoint = "api/v1/floor"
        const data = {
            name: nameFloorAdd,
            quantity: totalSlotAdd,
            row: rowFloorAdd,
            parkingLotId: parkingLot.id,
        }
        const id = toast.loading("Vui lòng đợi ...")
        const handle = (data) => {
            if (data.statusCode == 200) {
                toast.update(id, { render: "Thêm khu vực đỗ xe thành công", type: "success", isLoading: false, autoClose: 3000 });
                handleOpenModalAddFloor()
                handleGetAllFloor()
            }
            else {
                toast.update(id, { render: "Thêm khu vực đỗ xe thất bại", type: "error", isLoading: false, autoClose: 3000 });
            }
        }

        requester.post(endpoint, data, handle)

    }

    const handleClickFloor =(floor)=>{
        setCurrentFloor(floor);
        handleOpenModalFloorDetails();
    }

    useEffect(handleGetParkingLot, [])
    useEffect(handleGetAllFloor, [])

    return (
        <div>
            <div className="flex flex-row">
                <div className="bg-blue-gray-50 rounded-xl p-2 w-full">
                    <Accordion open={accordion}>
                        <AccordionHeader onClick={() => setAccordion(!accordion)}>
                            <Typography
                                className="text-blue-phenikaa font-bold text-[20px]"
                            >
                                {parkingLot.name}
                            </Typography>
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography
                                className="text-orange-phenikaa text-[14px]"
                            >
                                Địa chỉ : {parkingLot.address}
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </div>

                <div>
                    <Button className=" m-5" color="green" onClick={handleOpenModalAddFloor}>
                        Thêm khu vực đỗ xe
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap">

                {listFloor.map(floor => {
                    return <div key={floor.id} onClick={()=>handleClickFloor(floor)} className="text-[20px] select-none cursor-pointer m-5 rounded-md bg-blue-gray-50  hover:bg-blue-gray-100 p-10 shadow-xl">{floor.name}</div>
                })}





            </div>
            {/* =======================================MODAL ADD FLOOR============================================= */}
            <Dialog open={openModalAddFloor} handler={handleOpenModalAddFloor} size={demo ? "xl" : "sm"}>
                <DialogHeader>Thêm khu vực đỗ xe mới tại {parkingLot.name}</DialogHeader>
                <DialogBody >
                    <div className="flex flex-col xl:flex-row">
                        <div className={demo ? "w-[369px]" : "w-full"}>
                            <Input variant="standard" label="Tên khu vực đỗ xe" value={nameFloorAdd} onChange={e => setNameFloorAdd(e.target.value)} />
                            <div className="h-6" />
                            <Input variant="standard" label="Số lượng chỗ đỗ xe" type='number' min={1} value={totalSlotAdd} onChange={onChangeTotalSlotsFloorAdd} />
                            <div className="h-6" />
                            <Input variant="standard" label="Số cột" type='number' min={1} value={rowFloorAdd} onChange={onChangeRowFloorAdd} />
                            <Typography className="h-[15px] text-red-600 text-[13px]">
                                {messAdd}
                            </Typography>
                            <Switch label="Mô phỏng" ripple={demo} onChange={e => setDemo(e.target.checked)} />

                        </div>

                        {demo ?
                            <div className="h-[500px] flex overflow-auto">
                                {!messAdd ? <ParkingSimulation demo={true} rows={rowFloorAdd} total={totalSlotAdd} /> : <div />}

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
                        onClick={handleOpenModalAddFloor}
                        className="mr-1"
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button variant="gradient" color="green" disabled={messAdd} onClick={handleCreateFloor}>
                        <span>Thêm</span>
                    </Button>
                </DialogFooter>
                <ToastContainer />
            </Dialog>
            <ToastContainer />
            <ModalViewDetailsFloor floor={currentFloor} openModalFloorDetails={openModalFloorDetails} handleOpenModalFloorDetails={handleOpenModalFloorDetails}/>
        </div>
    )
}

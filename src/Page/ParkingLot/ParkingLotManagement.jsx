import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import requester from "../../infrastructure/requester"
import { ToastContainer, toast } from "react-toastify"
import parkingSVG from "../../assets/images/parking.svg"
export default function ParkingLotManager() {
    const navigate = useNavigate();

    const [nameParkingLot, setNameParkingLot] = useState('')
    const [addressParkingLot, setAddressParkingLot] = useState('')
    const [listOfParkingLot, setListOfParkingLot] = useState([])
    const [open, setOpen] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [deleteParkinglot, setDeleteParkingLot] = useState({})
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [editParkinglot, setEditParkingLot] = useState({})
    const handleOpenModalDelete = () => {
        if (openModalDelete) {
            setDeleteParkingLot('')
        }
        setOpenModalDelete(!openModalDelete)
    };

    const handleOpenModalEdit = () => {
        if (openModalEdit) {
            setEditParkingLot('')
        }
        setOpenModalEdit(!openModalEdit)
    };


    const handleOpen = () => {
        if (open) {
            setNameParkingLot('')
            setAddressParkingLot('')
        }
        setOpen(!open)
    };

    const handleCreateParkingLot = () => {
        const endpoint = 'api/v1/parkinglot'
        const data = {
            "name": nameParkingLot,
            "address": addressParkingLot
        }

        const id = toast.loading("Vui lòng đợi ...")

        const handle = (data) => {
            if (data.statusCode == 200) {
                toast.update(id, { render: "Thêm bãi đỗ xe mới thành công", type: "success", isLoading: false, autoClose: 3000 });
                handleOpen()
                setListOfParkingLot([...listOfParkingLot, data.Data])
            }
            else {
                toast.update(id, { render: "Thêm bãi đỗ xe mới thất bại", type: "error", isLoading: false, autoClose: 3000 });
            }
        }
        requester.post(endpoint, data, handle)
    }

    const handleGetAllParkingLot = () => {
        const endpoint = "api/v1/parkinglot/all/1/100"
        const getAllParkingLot = (response) => {
            setListOfParkingLot(response.Data);
        }
        requester.get(endpoint, getAllParkingLot)
    }

    const handleViewDetails = (id, parkinglot) => {
        navigate("" + id)
    }

    const handleDeleteParkinglot = (e, parking) => {
        e.stopPropagation();
        setDeleteParkingLot(parking)
        handleOpenModalDelete()
    }


    const handleEditParkinglot = (e, parking) => {
        e.stopPropagation();
        setEditParkingLot(parking)
        handleOpenModalEdit()
    }

    const handleChangeNameEdit=(e)=>{
        const parking = {...editParkinglot}
        parking.name = e.target.value;
        setEditParkingLot(parking)
    }

    const handleChangeAddressEdit=(e)=>{
        const parking = {...editParkinglot}
        parking.address = e.target.value;
        setEditParkingLot(parking)
    }

    const handleDeleteEditParkingLot = ()=>{
        const endpoint = "api/v1/parkinglot/"+deleteParkinglot.id

        const id = toast.loading("Vui lòng đợi ...")

        const handle = (data) => {
            if (data.statusCode == 200) {
                toast.update(id, { render: "Xóa bãi đỗ xe thành công", type: "success", isLoading: false, autoClose: 3000 });
                handleOpenModalDelete()
                handleGetAllParkingLot()
            }
            else {
                toast.update(id, { render: "Xóa bãi đỗ xe thất bại", type: "error", isLoading: false, autoClose: 3000 });
            }
        }

        requester.delete(endpoint,handle)
    }

    const handleUpdateParkinglot = ()=>{
        const endpoint = "api/v1/parkinglot/"+editParkinglot.id

        const data = {
            name : editParkinglot.name,
            address : editParkinglot.address
        }

        const id = toast.loading("Vui lòng đợi ...")

        const handle = (data) => {
            if (data.statusCode == 200) {
                toast.update(id, { render: "Cập nhật thông tin thành công", type: "success", isLoading: false, autoClose: 3000 });
                handleOpenModalEdit()
                handleGetAllParkingLot()
            }
            else {
                toast.update(id, { render: "Cập nhật thông tin thất bại", type: "error", isLoading: false, autoClose: 3000 });
            }
        }

        requester.put(endpoint,data,handle)

    }

    useEffect(handleGetAllParkingLot, [])

    return (
        <div className="">
            <div className="flex flex-wrap justify-start ">
                <Button className="flex items-center gap-3" onClick={handleOpen} color="green">
                    <i className="fas fa-plus text-lg leading-none"></i>
                    Thêm bãi đỗ xe
                </Button>
            </div>

            <div className="flex flex-wrap justify-center">
                {listOfParkingLot.toReversed().map((parkinglot) => {
                    return <Card className="m-3 w-80 cursor-pointer hover:bg-blue-gray-50 " onClick={() => { handleViewDetails(parkinglot.id) }} key={parkinglot.id}>
                        <CardBody>
                            <div className="flex flex-row justify-between relative">
                                <img src={parkingSVG} alt="SVG Image" className="w-8 h-8" />
                                <Menu placement="bottom-start" className=" ">
                                    <MenuHandler className="flex items-center absolute right-[-20px] top-[-20px] h-12 w-15 bg-white justify-center hover:shadow-none shadow-none text-gray hover:text-black hover:bg-gray-100 text-center text-[5px]">
                                        <Button >
                                        ⬤ ⬤ ⬤
                                        </Button>
                                    </MenuHandler>
                                    <MenuList className="max-h-[20rem] max-w-[18rem]">
                                        <MenuItem onClick={e => handleDeleteParkinglot(e, parkinglot)} >
                                            Xóa
                                        </MenuItem>
                                        <MenuItem onClick={e => handleEditParkinglot(e, parkinglot)}>
                                            Sửa
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>

                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {parkinglot?parkinglot.name:''}
                            </Typography>
                            <Typography>
                                {parkinglot?parkinglot.address:''}
                            </Typography>
                        </CardBody>

                    </Card>
                })}
            </div>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Thêm bãi đỗ xe</DialogHeader>
                <DialogBody>
                    <div className="">
                        <Input variant="standard" label="Tên bãi đỗ xe" value={nameParkingLot} onChange={e => setNameParkingLot(e.target.value)} />
                        <div className="h-[20px]" />
                        <Input variant="standard" label="Địa chỉ" value={addressParkingLot} onChange={e => setAddressParkingLot(e.target.value)} />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleCreateParkingLot}>
                        <span>Tạo</span>
                    </Button>
                </DialogFooter>
                <ToastContainer />
            </Dialog>


            {/* ================================ MODAL DELTE PARKING LOT=================================== */}
            <Dialog open={openModalDelete} handler={handleOpenModalDelete}>
                <DialogHeader>Xóa bãi đỗ xe</DialogHeader>
                <DialogBody>
                    <Typography>Bạn có chắc chắn muốn xóa {deleteParkinglot.name}</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="orange"
                        onClick={handleOpenModalDelete}
                        className="mr-1"
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button variant="gradient" color="red" onClick={handleDeleteEditParkingLot}>
                        <span>Xóa</span>
                    </Button>
                </DialogFooter>
                <ToastContainer />
            </Dialog>
            {/* ================================ MODAL DELTE PARKING LOT=================================== */}


            {/* ================================ MODAL EDIT PARKING LOT=================================== */}
            <Dialog open={openModalEdit} handler={handleOpenModalEdit}>
                <DialogHeader>Cập nhật bãi đỗ xe</DialogHeader>
                <DialogBody>
                    <div>
                        <Input label="Tên bãi đỗ xe" value={editParkinglot.name} onChange={handleChangeNameEdit}/>
                        <div className="h-5" />
                        <Input label="Địa chỉ" value={editParkinglot.address} onChange={handleChangeAddressEdit}/>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={handleOpenModalEdit}
                        className="mr-1"
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleUpdateParkinglot}>
                        <span>Cập nhật</span>
                    </Button>
                </DialogFooter>
                <ToastContainer />
            </Dialog>
            {/* ================================ MODAL EDIT PARKING LOT=================================== */}

            <ToastContainer />
        </div>

    )
}

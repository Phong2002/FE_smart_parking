import backgroundPhenikaaPark from "../../assets/images/logo_with_name.png"
import {
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton, Input, Textarea,
    Typography
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import requester from "../../infrastructure/requester.js";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid/index.js";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

export default function MonthlyPassManagement() {
    const TABLE_HEAD = ["Mã thẻ", "Biển số xe", "Ngày tạo", "Trạng thái", "Ngày đăng ký", "Hạn sử dụng", ""];
    const [listParkingPass, setListParkingPass] = useState([]);
    const [listParkingPassNormal, setListParkingPassNormal] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [openModalAddParkingPass, setOpenModalAddParkingPass] = useState(false);
    const [registrationDate, setRegistrationDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [licensePlates, setLicensePlates] = useState('');

    const currentDate = new Date();
    const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const [currentTicket, setCurrentTicket] = useState()

    const [openModalUpdateLicensePlate, setOpenModalUpdateLicensePlate] = useState(false)
    const [openModalRenewCard, setOpenModalRenewCard] = useState(false)

    const [updateLicensePlates, setUpdateLicensePlates] = useState()

    const [registrationDateUpdate, setRegistrationDateUpdate] = useState('');
    const [expirationDateUpdate, setExpirationDateUpdate] = useState('');

    const handleOpenModalUpdateLicensePlate = () => {
        setOpenModalUpdateLicensePlate(!openModalUpdateLicensePlate)
    }
    const handleOpenModalRenewCard = () => {
        if (openModalRenewCard) {
            setRegistrationDateUpdate('')
            setExpirationDateUpdate('')
        }
        setOpenModalRenewCard(!openModalRenewCard)
    }

    const handleClickRenewCard = (e) => {
        setCurrentTicket(e)
        handleOpenModalRenewCard()
    }

    const handleOpenUpdateLicensePlates = (e) => {
        setCurrentTicket(e)
        setUpdateLicensePlates(e.licensePlates)
        handleOpenModalUpdateLicensePlate()
    }

    const handleOpenModalAddParkingPass = () => {

        if (openModalAddParkingPass) {
            setLicensePlates('')
        }

        setOpenModalAddParkingPass(!openModalAddParkingPass)
    };

    const handleUpdateLicensePlates = () => {

        const endpoint = "api/v1/monthly-ticket"

        const data = {
            "ticketId": currentTicket.id,
            "licensePlates": updateLicensePlates
        }

        const id = toast.loading("Vui lòng đợi ...")

        const handle = (data) => {
            if (data.statusCode == 200) {
                toast.update(id, { render: "Cập nhật thành công", type: "success", isLoading: false, autoClose: 3000 });
                handleGetAllParkingPass()
                handleOpenModalUpdateLicensePlate()
            }
            else {
                toast.update(id, { render: "Cập nhật thất bại", type: "error", isLoading: false, autoClose: 3000 });
            }
        }
        requester.patch(endpoint, data, handle)

    }

    const handleRenewTicket = () => {

        const endpoint = "api/v1/monthly-ticket"

        const data = {
            "ticketId": currentTicket.id,
            "registrationDate": registrationDateUpdate,
            "expirationDate": expirationDateUpdate
        }

        const id = toast.loading("Vui lòng đợi ...")

        const handle = (data) => {
            if (data.statusCode == 200) {
                toast.update(id, { render: "Cập nhật thành công", type: "success", isLoading: false, autoClose: 3000 });
                handleGetAllParkingPass()
                handleOpenModalRenewCard()
            }
            else {
                toast.update(id, { render: "Cập nhật thất bại", type: "error", isLoading: false, autoClose: 3000 });
            }
        }
        requester.put(endpoint, data, handle)

    }

    const getItemProps = (index) =>
    ({
        variant: currentPage === index ? "filled" : "text",
        color: "blue",
        onClick: () => setCurrentPage(index),
        className: "rounded-full",
    });

    const next = () => {
        if (currentPage === totalPage) return;

        setCurrentPage(currentPage + 1);
    };

    const prev = () => {
        if (currentPage === 1) return;

        setCurrentPage(currentPage - 1);
    };

    const renderButtonPaging = () => {
        const buttons = [];
        for (let i = 1; i <= totalPage; i++) {
            buttons.push(
                <IconButton key={i} {...getItemProps(i)}>
                    {i}
                </IconButton>
            );
        }

        return <div>{buttons}</div>;
    }



    function formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('vi-VN');
        const formattedTime = date.toLocaleTimeString('vi-VN');

        return `${formattedDate} ${formattedTime}`;
    }

    const handleGetAllParkingPass = () => {
        const endpoint = `api/v1/monthly-ticket/all/${currentPage}/10`
        const getAllParkingLot = (response) => {
            if (response.statusCode == 200) {
                setListParkingPass(response.data);
                setTotalPage(Math.ceil(response.count / 10))
            }
        }
        requester.get(endpoint, getAllParkingLot)
    }

    const handleCreateMonthlyPass = () => {
        const endpoint = "api/v1/monthly-ticket"
        const data = {
            "licensePlates": licensePlates,
            "cardId": selectedOption.label,
            "registrationDate": registrationDate,
            "expirationDate": expirationDate
        }

        const id = toast.loading("Vui lòng đợi ...")

        const handle = (data) => {
            if (data.statusCode == 200) {
                toast.update(id, {
                    render: "Thêm mới các thẻ thành công",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000
                });
                clearDate()
                handleGetAllParkingPass()
                handleOpenModalAddParkingPass()
            } else {
                toast.update(id, {
                    render: "Thêm mới các thẻ thất bại",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                });
            }
        }

        console.log("==============data", data)
        requester.post(endpoint, data, handle)
    }


    const handleGetAllParkingPassNormal = () => {
        const endpoint = `api/v1/card/all/1/200`
        const getAllParkingLot = (response) => {
            if (response.statusCode == 200) {
                const listOptions = response.Data.filter(parkingPass => !parkingPass.isMonthlyTicket).map(parkingPass => { return { value: parkingPass.id, label: parkingPass.cardId } })
                setListParkingPassNormal(listOptions);
            }
        }
        requester.get(endpoint, getAllParkingLot)
    }


    const [selectedOption, setSelectedOption] = useState(null);

    const handleChangeRegistrationDate = (e) => {
        const currentDate = new Date(e.target.value);
        setRegistrationDate(formatDate(currentDate));
        setExpirationDate(formatDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1))))
    }

    const handleChangeRegistrationDateUpdate = (e) => {
        const currentDate = new Date(e.target.value);
        setRegistrationDateUpdate(formatDate(currentDate));
        setExpirationDateUpdate(formatDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1))))
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const clearDate = () => {
        const currentDate = new Date();
        setRegistrationDate(formatDate(currentDate));
        setExpirationDate(formatDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1))))
    }


    useEffect(clearDate, [])

    useEffect(handleGetAllParkingPass, [])
    useEffect(handleGetAllParkingPassNormal, [])
    useEffect(handleGetAllParkingPass, [currentPage])

    return (
        <div className={" my-[30px]"}>
            <div className="lg:pl-[210px] my-2">
                <Button onClick={handleOpenModalAddParkingPass} variant="gradient">
                    Tạo vé tháng mới
                </Button>
            </div>
            <div className="flex items-center justify-center ">
                <Card className="h-[450px] w-[1100px] overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {listParkingPass.map((card, index) => {
                                const classes = "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={card.id}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {card.cardId}
                                            </Typography>
                                        </td>
                                        <td className={classes + "cursor-pointer"} onClick={() => handleOpenUpdateLicensePlates(card)} >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal cursor-pointer"
                                            >
                                                {card.licensePlates}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {formatDateTime(card.created_at)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {(new Date(card.expirationDate) >= currentDateWithoutTime) ? "Còn hạn sử dụng" : "Hết hạn sử dụng"}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium cursor-pointer"
                                            >
                                                {card.registrationDate}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium cursor-pointer"
                                            >
                                                {card.expirationDate}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Button variant="outlined" className="m-1 p-2" onClick={() => handleOpenUpdateLicensePlates(card)}>Cập nhật biển số</Button>
                                            <Button variant="outlined" className="m-1 p-2" onClick={() => handleClickRenewCard(card)}>Gia hạn thẻ</Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </div>

            <div className="flex justify-center my-5">

                <div className="flex items-center gap-4">
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full"
                        onClick={prev}
                        disabled={currentPage === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {renderButtonPaging()}
                    </div>
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full"
                        onClick={next}
                        disabled={currentPage === totalPage}
                    >
                        Next
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Dialog open={openModalAddParkingPass} handler={handleOpenModalAddParkingPass}>
                <DialogHeader>Thêm thẻ</DialogHeader>
                <DialogBody>
                    <Input variant="outlined" label="Biển số" value={licensePlates} onChange={e => setLicensePlates(e.target.value)} />
                    <div className="m-3" />
                    <Select
                        placeholder="Mã thẻ"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={listParkingPassNormal}
                    />
                    <div className="my-3">
                        <Input variant="outlined" type="date" label="Ngày đăng ký" value={registrationDate}
                            onChange={e => handleChangeRegistrationDate(e)} />
                    </div>
                    <div className="my-3">
                        <Input variant="outlined" type="date" label="Ngày hết hạn" readOnly value={expirationDate} />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpenModalAddParkingPass}
                        className="mr-1"
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleCreateMonthlyPass}>
                        <span>Thêm</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <Dialog open={openModalUpdateLicensePlate} handler={handleOpenModalUpdateLicensePlate}>
                <DialogHeader>Cập nhật biển số</DialogHeader>
                <DialogBody>
                    <Typography className="my-2">Mã thẻ : {currentTicket?currentTicket.cardId:''}</Typography>
                    <Input label="Biển số xe" value={updateLicensePlates} onChange={e => setUpdateLicensePlates(e.target.value)} />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpenModalUpdateLicensePlate}
                        className="mr-1"
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleUpdateLicensePlates}>
                        <span>Cập nhật</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <Dialog open={openModalRenewCard} handler={handleOpenModalRenewCard}>
                <DialogHeader>Gia hạn thẻ</DialogHeader>
                <DialogBody>
                <Typography className="my-2">Mã thẻ : {currentTicket?currentTicket.cardId:''}</Typography>
                    <div className="my-3">
                        <Input variant="outlined" type="date" label="Ngày đăng ký" value={registrationDateUpdate}
                            onChange={e => handleChangeRegistrationDateUpdate(e)} />
                    </div>
                    <div className="my-3">
                        <Input variant="outlined" type="date" label="Ngày hết hạn" readOnly value={expirationDateUpdate} />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpenModalRenewCard}
                        className="mr-1"
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button variant="gradient" color="green" disabled={!registrationDateUpdate} onClick={handleRenewTicket}>
                        <span>Gia hạn</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <ToastContainer />
        </div>
    )
}

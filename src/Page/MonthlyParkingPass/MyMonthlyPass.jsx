import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography} from "@material-tailwind/react"
import backgroundPhenikaaPark from "../../assets/images/logo_without_name.png"
import UserService from "../../infrastructure/UserService"
import { useEffect, useState } from "react";
import {ToastContainer, toast} from "react-toastify";
import requester from "../../infrastructure/requester.js";

export default function MyMonthlyPass() {
    const [openModalCreateRequest, setOpenModalCreateRequest] = useState(false);
    const [openModalRequestDetails, setOpenModalRequestDetails] = useState(false);
    const [request,setRequest] = useState()
    const [licensePlates,setLicensePaltes] = useState('');
    const [isValid,setIsValid] = useState(true)
    const [card,setCard] = useState([])
    const regexLicensePlates = /^[A-Za-z0-9]{3,10}$/;

    const handleInputLicensePlatesChange = (event) => {
        setIsValid(true)
        const inputValue = event.target.value;
        setLicensePaltes(inputValue);
        setIsValid(regexLicensePlates.test(inputValue));
    };

    const handleOpenModalCreateRequest = () => {
        if(openModalCreateRequest){
            setLicensePaltes('')
        }
        setOpenModalCreateRequest(!openModalCreateRequest)
    
    };
    const handleOpenModalRequestDetails = () => {
        setOpenModalRequestDetails(!openModalRequestDetails)
    
    };

    const handleCreateRequest = ()=>{
        const endpoint = 'api/v1/ticket-request'
        const data = {
            "licensePlates": licensePlates,
            "userId": UserService.getUserId()
        }
        const id = toast.loading("Vui lòng đợi ...")

        const handle = (data) => {
            if (data.statusCode == 200) {
                toast.update(id, { render: "Thêm mới các thẻ thành công", type: "success", isLoading: false, autoClose: 3000 });
                setRequest(data.data)
                handleOpenModalCreateRequest()
            }
            else {
                toast.update(id, { render: "Thêm mới các thẻ thất bại", type: "error", isLoading: false, autoClose: 3000 });
            }
        }
        requester.post(endpoint, data, handle)
    }

    const handleGetRequest = ()=>{
        const endpoint = `api/v1/ticket-request/${UserService.getUserId()}`
        const getAllParkingLot = (response) => {
            if (response.statusCode == 200) {
                setRequest(response.data)
            }
        }
        requester.get(endpoint, getAllParkingLot)
    }

    const handleGetCard = ()=>{
        const endpoint = `api/v1/monthly-ticket/${UserService.getUserId()}`
        const getAllParkingLot = (response) => {
            if (response.statusCode == 200) {
                setCard(response.data)
            }
        }
        requester.get(endpoint, getAllParkingLot)
    }

    useEffect(handleGetRequest,[])
    useEffect(handleGetCard,[])


    return (
        <div className="flex flex-col items-center m-20 justify-center">
            {!request?
            <div className="flex flex-col items-center">
            <Typography>
                Hiện tại bạn chưa có thẻ gửi xe tháng , gửi 
                <Typography className="inline mx-1 cursor-pointer text-blue-500" onClick={handleOpenModalCreateRequest} >yêu cầu làm vé tháng</Typography>
                ngay !
            </Typography>
            <div className="my-2">
                <Button onClick={handleOpenModalCreateRequest}>Làm thẻ tháng</Button>
            </div>
        </div>
        :
        (!request.isAccept?
            
            <div>
            <Typography>Bạn đã gửi yêu cầu làm vé tháng , 
                vui lòng đến phòng quản lý PhenikaaPark để xác nhận làm vé tháng và nhận thẻ vật lý !
                <Typography className="inline mx-1 cursor-pointer text-blue-500 select-none" onClick={handleOpenModalRequestDetails}>Xem chi tiết yêu cầu</Typography>
                </Typography>
        </div>

        :

        <div className="bg-white rounded-lg shadow-xl cursor-pointer border select-none border-gray-200 p-4 flex">
        <div className="w-[186px] pr-4">
            <img
                src={backgroundPhenikaaPark}
                alt="Hình ảnh"
                className="w-full h-auto rounded"
            />
        </div>
        <div className="w-3/4">
            <Typography className="text-xl font-bold mb-2">Thẻ gửi xe  
            <Typography className="text-xl font-bold mb-2 text-blue-phenikaa inline ml-1">Phenikaa</Typography>
            <Typography className="text-xl font-bold mb-2 text-orange-phenikaa inline">Park</Typography>
            </Typography>
            <div className="pt-5">
            <Typography className="text-md font-bold mb-2 text-blue-phenikaa ">Mã thẻ : {card.cardId}</Typography>
            </div>
            <div className="">
            <Typography className="text-md font-bold mb-2 text-blue-phenikaa ">Biển số xe : {card.licensePlates}</Typography>
            </div>
            <div><Typography className="text-sm italic text-gray-600 text-right">HSD: {card.expirationDate}</Typography></div>
        </div>
    </div>
            )
        }
            





            <Dialog open={openModalCreateRequest} handler={handleOpenModalCreateRequest}>
        <DialogHeader>Yêu cầu làm vé tháng</DialogHeader>
        <DialogBody>
            <Typography>Vui lòng cung cấp đúng biển số xe (không bao gồm các dấu gạch ngang '-' và dấu chấm '.'), biển số này sẽ gắn liền với thẻ tháng của bạn </Typography>
            <Typography className="italic">Ví dụ : 29A66688</Typography>
            <div className="my-3">
                <Input size="lg" label="Biển số xe" error={!isValid} value={licensePlates} onChange={e=>handleInputLicensePlatesChange(e)}/>
            </div>
            <Typography className="text-[10px] text-red-600">{isValid?"":"Biển số không đúng định dạng"}</Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenModalCreateRequest}
            className="mr-1"
          >
            <span>Hủy</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleCreateRequest}>
            <span>Tạo yêu cầu</span>
          </Button>
        </DialogFooter>
      </Dialog>


      <Dialog open={openModalRequestDetails} handler={handleOpenModalRequestDetails}>
        <DialogBody>
            <Typography> Vui lòng đến phòng quản lý PhenikaaPark để xác nhận làm vé tháng và nhận thẻ vật lý !</Typography>
            <Typography> Biển số xe : {request?request.licensePlates:''}</Typography>
            <Typography> Trạng thái : Đang chờ</Typography>
            
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenModalRequestDetails}
            className="mr-1"
          >
            <span>Thoát</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
        </div>
    )
}

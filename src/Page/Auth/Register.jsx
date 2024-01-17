import {Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Input,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,} from "@material-tailwind/react";
import logo from "../../assets/images/logo_with_name.png";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import { RegisterAction } from "../../infrastructure/AuthAPI";
import { emailRegex ,phoneNumberRegex} from "../../ultis/regex";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const navigate = useNavigate();

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [mess,setMessages] = useState('');
    const [openDialogTerm,setOpenDialogTerm] = useState(false);
    const [confirmTerm,setConfirmTerm] = useState(false)
    const handleOpenDialogTerm =()=>{
        setOpenDialogTerm(!openDialogTerm);
    }

    const validate = ()=>{
        setMessages("")
        if(!firstName || !lastName || !email ||  !password 
            || !confirmPassword || !phoneNumber || !username){
            setMessages("Cần điền đầy đủ các trường thông tin")
            return false;
        }

        if(!emailRegex.test(email)){
            setMessages("Email không đúng định dạng")
            return false;
        }

        if(!phoneNumberRegex.test(phoneNumber)){
            setMessages("Số điện thoại không đúng định dạng")
            return false;
        }
        return true
    }

    const clearData=() => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhoneNumber('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
    }


    const handleRegister = ()=>{
        if(!validate()){
            return
        }

       const data = {
            "firstName": firstName,
            "lastName":lastName,
            "userName":username,
            "email":email,
            "phoneNumber":phoneNumber,
            "password":password,
            "urlImage":""
        }
        
        const id = toast.loading("Vui lòng đợi ...")

        const action = {
            success: function(){
                toast.update(id, { render: "Tạo tài khoản thành công", type: "success", isLoading: false ,autoClose:3000});
                clearData()
            },
            error: function(){
                toast.update(id, { render: "Tạo tài khoản thất bại", type: "error", isLoading: false ,autoClose:3000});
            }
        }
        RegisterAction(data,action);
    }

    document.title = 'Đăng ký tài khoản'
    return (
        <div className="grid place-items-center h-[100vh]
        bg-no-repeat bg-center bg-cover	 bg-[url('https://blog.getmyparking.com/wp-content/uploads/2018/09/parking-lighting.jpg')] ">
            <Card className="w-[680px] mt-[118px] opacity-95 relative">
                <CardHeader
                    variant="rounded"
                    color="white"
                    className="absolute  left-[234px] top-[-68px]  grid grid-cols-1 h-[180px] w-[180px] rounded-full content-center place-items-center"
                >
                    <img src={logo} className="w-[80%] h-[100%]"/>
                </CardHeader>
                <Typography variant="h3" color="deep-orange" className="pt-[100px] text-center">
                    Đăng ký tài khoản
                </Typography>
                <div className="grid grid-cols-2 gap-1">
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Họ và tên đệm" size="lg" value={lastName} onChange={e=>setLastName(e.target.value)} />
                        <Input label="Email" size="lg" value={email} onChange={e=>setEmail(e.target.value)} />
                        <Input label="Tài khoản" size="lg" value={username} onChange={e=>setUsername(e.target.value)}/>
                        <Input label="Nhập lại mật khẩu" size="lg" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
                    </CardBody>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Tên" size="lg" value={firstName} onChange={e=>setFirstName(e.target.value)}/>
                        <Input label="Số điện thoại" size="lg" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)}/>
                        <Input label="Mật khẩu" size="lg" value={password} onChange={e=>setPassword(e.target.value)}/>
                        <div className="-ml-2.5 grid grid-row-2">
                            <Checkbox
                                defaultChecked={confirmTerm}
                                onChange={(e)=>{setConfirmTerm(e.target.checked)}}
                                label={
                                    <Typography color="blue-gray" className="flex font-medium">
                                        Tôi đồng ý
                                        <Typography
                                            as="a"
                                            href="#"
                                            color="blue"
                                            className="font-medium transition-colors hover:text-blue-700"
                                            onClick={handleOpenDialogTerm}
                                        >
                                            &nbsp;Điều khoản và điều kiện
                                        </Typography>
                                        .
                                    </Typography>
                                }
                            />

                        </div>
                    </CardBody>
                </div>
                {mess?
             <div className="grid place-items-center">
             <Typography
             color="red"
             className="text-[15px]"
             >
                 {mess}
             </Typography>
         </div>
         :
         <div className="h-[22.5px]"></div>    
            }
               
                <CardFooter className="pt-0">
                    <Button variant="gradient " fullWidth disabled={!confirmTerm} onClick={handleRegister}>
                        Đăng ký tài khoản
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                       Bạn đã có tài khoản !
                        <Typography
                            variant="small"
                            color="blue"
                            className="ml-1 font-bold cursor-pointer"
                            onClick={()=>navigate("/login")}
                        >
                                Đăng nhập ngay
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>

            <Dialog open={openDialogTerm} handler={handleOpenDialogTerm}>
                <DialogHeader>Các điều khoản và điều kiện</DialogHeader>
                <DialogBody className="overflow-auto h-[386px]">
                    <Typography>
                        1.Quyền sở hữu và Giấy phép:
                        Ứng dụng quản lý bãi đỗ thông minh này là tài sản của PhenikaaPark.
                        Người dùng được cấp một giấy phép có thời hạn để sử dụng ứng dụng.
                    </Typography>
                    <Typography> 2.Chấp nhận sử dụng:
                        Việc sử dụng ứng dụng này đồng nghĩa với việc bạn chấp nhận tuân theo tất cả các điều khoản và điều kiện này.
                    </Typography>
                    <Typography> 3.Bảo mật thông tin cá nhân:
                        Ứng dụng thu thập và sử dụng thông tin cá nhân theo chính sách bảo mật của chúng tôi.
                        Thông tin cá nhân của bạn có thể được chia sẻ với các bên thứ ba theo chính sách bảo mật.
                    </Typography>
                    <Typography>4.Sử dụng dịch vụ:
                        Ứng dụng cho phép bạn tìm kiếm, đặt chỗ và thanh toán bãi đỗ xe.
                        Bạn phải tuân thủ các quy định về đỗ xe và an toàn giao thông khi sử dụng ứng dụng.
                    </Typography>
                    <Typography>5.Thanh toán và hủy dịch vụ:
                        Thanh toán cho dịch vụ sử dụng thông qua ứng dụng theo chính sách thanh toán.
                        Chính sách hủy dịch vụ và hoàn tiền có thể áp dụng.
                    </Typography>
                    <Typography>6.Trách nhiệm và Quyền:
                        Bạn phải chịu trách nhiệm cho hành vi và đỗ xe của mình.
                        Chúng tôi không chịu trách nhiệm cho mất mát hoặc hỏng hóc của phương tiện.
                    </Typography>
                    <Typography>7.Sự cố và Hỗ trợ:
                        Liên hệ với chúng tôi để báo cáo sự cố hoặc yêu cầu hỗ trợ.
                    </Typography>
                    <Typography>8.Thay đổi điều khoản và điều kiện:
                        Chúng tôi có quyền thay đổi các điều khoản và điều kiện này và sẽ thông báo cho bạn về bất kỳ thay đổi nào.
                    </Typography>
                    <Typography>
                        9.Chấm dứt tài khoản:
                        Chúng tôi có quyền chấm dứt tài khoản của bạn nếu bạn vi phạm các điều khoản và điều kiện này.
                    </Typography>
                   <Typography>
                       10.Xung đột và Phân giải tranh chấp:
                       Trong trường hợp xung đột hoặc tranh chấp, chúng tôi sẽ thực hiện các biện pháp để giải quyết vấn đề.
                   </Typography>

                      </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="blue" onClick={()=>{setOpenDialogTerm(false)}}>
                        <span>Đóng</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer />
        </div>
    );
}

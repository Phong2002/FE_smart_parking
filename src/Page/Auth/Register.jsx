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

export default function Register() {
    const navigate = useNavigate();
    const [openDialogTerm,setOpenDialogTerm] = useState(false);
    const [confirmTerm,setConfirmTerm] = useState(false)
    const handleOpenDialogTerm =()=>{
        setOpenDialogTerm(!openDialogTerm);
    }


    document.title = 'Đăng ký tài khoản'
    return (
        <div className="grid place-items-center h-[100vh]
        bg-no-repeat bg-center bg-cover	 bg-[url('https://blog.getmyparking.com/wp-content/uploads/2018/09/parking-lighting.jpg')] ">
            <Card className="w-[680px]  opacity-95 relative">
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
                        <Input label="Họ và tên đệm" size="lg"/>
                        <Input label="Email" size="lg"/>
                        <Input label="Tài khoản" size="lg"/>
                        <Input label="Nhập lại mật khẩu" size="lg"/>
                    </CardBody>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Tên" size="lg"/>
                        <Input label="Số điện thoại" size="lg"/>
                        <Input label="Mật khẩu" size="lg"/>
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

                <CardFooter className="pt-0">
                    <Button variant="gradient " fullWidth disabled={!confirmTerm}>
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
                    <p>
                        1.Quyền sở hữu và Giấy phép:
                        Ứng dụng quản lý bãi đỗ thông minh này là tài sản của PhenikaaPark.
                        Người dùng được cấp một giấy phép có thời hạn để sử dụng ứng dụng.
                    </p>
                    <p> 2.Chấp nhận sử dụng:
                        Việc sử dụng ứng dụng này đồng nghĩa với việc bạn chấp nhận tuân theo tất cả các điều khoản và điều kiện này.
                    </p>
                    <p> 3.Bảo mật thông tin cá nhân:
                        Ứng dụng thu thập và sử dụng thông tin cá nhân theo chính sách bảo mật của chúng tôi.
                        Thông tin cá nhân của bạn có thể được chia sẻ với các bên thứ ba theo chính sách bảo mật.
                    </p>
                    <p>4.Sử dụng dịch vụ:
                        Ứng dụng cho phép bạn tìm kiếm, đặt chỗ và thanh toán bãi đỗ xe.
                        Bạn phải tuân thủ các quy định về đỗ xe và an toàn giao thông khi sử dụng ứng dụng.
                    </p>
                    <p>5.Thanh toán và hủy dịch vụ:
                        Thanh toán cho dịch vụ sử dụng thông qua ứng dụng theo chính sách thanh toán.
                        Chính sách hủy dịch vụ và hoàn tiền có thể áp dụng.
                    </p>
                    <p>6.Trách nhiệm và Quyền:
                        Bạn phải chịu trách nhiệm cho hành vi và đỗ xe của mình.
                        Chúng tôi không chịu trách nhiệm cho mất mát hoặc hỏng hóc của phương tiện.
                    </p>
                    <p>7.Sự cố và Hỗ trợ:
                        Liên hệ với chúng tôi để báo cáo sự cố hoặc yêu cầu hỗ trợ.
                    </p>
                    <p>8.Thay đổi điều khoản và điều kiện:
                        Chúng tôi có quyền thay đổi các điều khoản và điều kiện này và sẽ thông báo cho bạn về bất kỳ thay đổi nào.
                    </p>
                    <p>
                        9.Chấm dứt tài khoản:
                        Chúng tôi có quyền chấm dứt tài khoản của bạn nếu bạn vi phạm các điều khoản và điều kiện này.
                    </p>
                   <p>
                       10.Xung đột và Phân giải tranh chấp:
                       Trong trường hợp xung đột hoặc tranh chấp, chúng tôi sẽ thực hiện các biện pháp để giải quyết vấn đề.
                   </p>

                      </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="blue" onClick={()=>{setOpenDialogTerm(false)}}>
                        <span>Đóng</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

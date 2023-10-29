import {Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography} from "@material-tailwind/react";
import logo from "../../assets/images/logo_with_name.png";
import {useNavigate} from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();

    document.title = 'Đăng nhập'
    return (
        <div className="grid place-items-center h-[100vh]
        bg-no-repeat bg-center bg-cover	 bg-[url('https://blog.getmyparking.com/wp-content/uploads/2018/09/parking-lighting.jpg')] ">
        <Card className="w-96  opacity-95 relative">
            <CardHeader
                variant="rounded"
                color="white"
                className=" absolute  left-[86px] top-[-68px]  grid grid-cols-1 h-[180px] w-[180px] rounded-full content-center place-items-center"
            >
                <img src={logo} className="w-[80%] h-[100%]"/>
            </CardHeader>
            <Typography variant="h3" color="deep-orange" className="pt-[100px] text-center">
                Đăng nhập
            </Typography>
            <CardBody className="flex flex-col gap-4">
                <Input label="Email" size="lg"/>
                <Input label="Password" size="lg"/>
                <div className="-ml-2.5">
                    <Typography className="text-center">
                        Quên mật khẩu
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth>
                    Đăng nhập
                </Button>
                <Typography variant="small" className="mt-6 flex justify-center">
                    Bạn chưa có tài khoản ?
                    <Typography
                        variant="small"
                        color="blue"
                        className="ml-1 font-bold cursor-pointer"
                        onClick={()=>navigate("/register")}
                    >
                        Đăng ký ngay
                    </Typography>
                </Typography>
            </CardFooter>
        </Card>
        </div>
    );
}

import {Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography} from "@material-tailwind/react";
import logo from "../../assets/images/logo_with_name.png";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { LoginAction } from "../../infrastructure/AuthAPI";
import { emailRegex } from "../../ultis/regex";

export default function SignIn() {
    const [username ,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [mess,setMessage] = useState('');

    const navigate = useNavigate();


    const validate = ()=>{
        setMessage("")
        if(!username){
            setMessage("Tài khoản hoặc email không được để trống!")
            return false
        }
        if(!password){
            setMessage("Mật khẩu không được để trống!")
            return false
        }
        return true
    }

    const handleLogin = ()=>{
        if(!validate()){
            return
        }

        let data ={}
        if(emailRegex.test(username)){
            data={
                "email":username,
                "password":password
            }
        }
        else{
            data={
                "userName":username,
                "password":password
            } 
        }

        const action = {
            success: function(){
                navigate("/")
            },
            error: function(){
                setMessage("Sai tài khoản hoặc mật khẩu")
            }
        }
        LoginAction(data,action);
    }



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
            <CardBody className="flex flex-col gap-4 px-6 pt-6 pb-1">
                <Input label="Tài khoản hoặc email" size="lg" value={username} onChange={e=>setUserName(e.target.value)} />
                <Input label="Mật khẩu" type="password" size="lg" value={password} onChange={e=>setPassword(e.target.value)}  />
                <div className="grid place-items-end">
                    <Typography 
                    color = "blue"
                    className="text-center text-[14px] cursor-pointer select-none hover:text-blue-900"
                    >
                        Quên mật khẩu
                    </Typography>
                </div>
            </CardBody>
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
                <Button variant="gradient" fullWidth onClick={handleLogin}>
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

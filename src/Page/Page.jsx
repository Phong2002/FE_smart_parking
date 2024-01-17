import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo_without_name.png";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import {
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    Bars2Icon,
    HomeIcon,
    TableCellsIcon,
    TicketIcon, UserGroupIcon, BanknotesIcon,
} from "@heroicons/react/24/solid";

import requester from "../infrastructure/requester.js"
import UserService from "../infrastructure/UserService.jsx";
import { logoutAction ,getInfor} from "../infrastructure/AuthAPI";
import { InformationCircleIcon } from "@heroicons/react/20/solid";



function ProfileMenu(props) {
    const navigate = useNavigate();

    const profileMenuItems = [
        {
            label: "Profile",
            icon: UserCircleIcon,
            action: function () {navigate('/profile'); }
        },
        {
            label: "Help",
            icon: LifebuoyIcon,
            action: function () {navigate('/profile');  }
        },
        {
            label: "Đăng xuất",
            icon: PowerIcon,
            action: function () { navigate('/login'); logoutAction() }
        },
    ];

    console.log(UserService.getFullName());


    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Typography
                        className="text-[15px] xl:inline min-[100]:hidden"
                    >
                        {props.fullName}
                    </Typography>
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src={props.avatarUrl}
    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon ,action}, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={action}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}



function NavList() {

    const adminList = [{
        label: "Quản lý",
        icon: UserGroupIcon,
        router: '/manager-management',
    },
        {
            label: "Doanh thu",
            icon: BanknotesIcon,

            router: '/revenue',
        },
    ]

    const history = [
        {
            label: "Lịch sử ra vào",
            icon: InformationCircleIcon,
            router: '/entry-history',
        }
    ]

    const navListItems = [
        {
            label: "Trang chủ",
            icon: HomeIcon,
            router: '/',
        },
        {
            label: "Bãi đỗ xe",
            icon: TableCellsIcon,

            router: '/parkinglot',
        },
        {
            label: "Vé xe",
            icon: TicketIcon,
            router: '/parking-pass',
        },
    ];
    
    !UserService.isUser()?navListItems.push(...history):''
    useEffect(()=>{!UserService.isUser()?navListItems.push(...history):''},[])
    useEffect(()=>{!UserService.isUser()?navListItems.push(...history):''},[localStorage.getItem('TOKEN')])

    UserService.isAdmin()?navListItems.push(...adminList):''
    useEffect(()=>{UserService.isAdmin()?navListItems.push(...adminList):''},[])
    useEffect(()=>{UserService.isAdmin()?navListItems.push(...adminList):''},[localStorage.getItem('TOKEN')])
    const navigate = useNavigate();
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {navListItems.map(({ label, icon, router }, key) => (
                <Typography
                    key={label}
                    onClick={() => navigate(router)}
                    variant="small"
                    color="gray"
                    className="font-medium text-blue-gray-500 lg:rounded-full "
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        <span className="text-gray-900"> {label}</span>
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

export default function Page() {
    const navigate = useNavigate();
    const location = useLocation();
    const [fullName,setFullName] = useState('')
    const [avatarUrl,setAvatarUrl] = useState('')
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 800 && setIsNavOpen(false),
        );
    }, []);

    const isLogin = () => {
        if (UserService.isAuthenticated()) {
        }
        else (
            navigate('/login')
        )
    }

    useEffect(isLogin, [])
    useEffect(()=>{getInfor(localStorage.getItem('TOKEN'))},[localStorage.getItem('LASTNAME')])
    useEffect(()=>{
            setAvatarUrl(UserService.getAvtURL()?requester.getImage(UserService.getAvtURL()):"https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png")
            setFullName(UserService.getFullName()??"")
    },[])
    useEffect(()=>{
        setAvatarUrl(UserService.getAvtURL()?requester.getImage(UserService.getAvtURL()):"https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png")
        setFullName(UserService.getFullName()??"")
},[UserService.getAvtURL()])

    return (
        <div className=" max-h-[100%] flex flex-col justify-center pt-8 w-[calc(100%)]">
            <Navbar className="sticky top-0 mx-auto max-w-screen-xl w-[100vw] p-2 z-50 lg:rounded-full lg:pl-6">
                <div className="relative mx-auto flex items-center justify-between text-blue-gray-900 z-50">
                    <Typography
                        className="mr-4 ml-2 cursor-pointer py-1.5 font-medium select-none"
                        onClick={() => navigate("/")}
                    >
                        <Avatar src={logo} variant="square" alt="Logo" />
                        <Typography className="text-blue-phenikaa inline font-bold">Phenikaa</Typography>
                        <Typography className="text-orange-phenikaa inline font-bold">Park</Typography>
                    </Typography>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <IconButton
                        size="sm"
                        color="blue-gray"
                        variant="text"
                        onClick={toggleIsNavOpen}
                        className="ml-auto mr-2 lg:hidden"
                    >
                        <Bars2Icon className="h-6 w-6" />
                    </IconButton>
                    <ProfileMenu fullName={fullName} avatarUrl={avatarUrl}/>
                </div>
                <Collapse open={isNavOpen} className="overflow-scroll w-[100vw]">
                    <NavList />
                </Collapse>
            </Navbar>
            <Outlet />
        </div>
    );
}
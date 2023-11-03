import React, { useEffect } from "react";
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
    TicketIcon,
} from "@heroicons/react/24/solid";

import requester from "../infrastructure/UserService.jsx"
import UserService from "../infrastructure/UserService.jsx";
import { logoutAction } from "../infrastructure/AuthAPI";



function ProfileMenu() {
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
                        {UserService.getFullName()}
                    </Typography>
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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

function NavList() {
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
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    const isLogin = () => {
        if (requester.isAuthenticated()) {
        }
        else (
            navigate('/login')
        )
    }

    useEffect(isLogin, [])

    return (
        <div className="-m-6 max-h-[100%] pt-8 w-[calc(100%)]">
            <Navbar className="sticky top-0 z-10 mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
                <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
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
                    <ProfileMenu />
                </div>
                <Collapse open={isNavOpen} className="overflow-scroll">
                    <NavList />
                </Collapse>
            </Navbar>
            <Outlet />
        </div>
    );
}
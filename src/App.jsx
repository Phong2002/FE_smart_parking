import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./Page/Auth/SignIn.jsx";
import Register from "./Page/Auth/Register";
import Page from "./Page/Page.jsx";
import Dashboard from "./Page/Dashboard.jsx";
import ParkingLot from "./Page/ParkingLot/ParkingLot.jsx";
import ParkingLotView from "./Page/ParkingLot/ParkingLotView.jsx";
import ParkingLotManagerPage from "./Page/ParkingLot/ParkingManagementPage.jsx";
import ParkingLotDetails from "./Page/ParkingLot/ParkingLotDetails.jsx";
import ParkingLotManager from "./Page/ParkingLot/ParkingLotManagement.jsx";
import ImportData from "./Page/ImportData/ImportData.jsx";
import MonthlyParkingPass from "./Page/MonthlyParkingPass/MonthlyParkingPass.jsx";
import MyMonthlyPass from "./Page/MonthlyParkingPass/MyMonthlyPass.jsx";
import MonthlyPassManagement from "./Page/MonthlyParkingPass/MonthlyPassManagement.jsx";
import Profile from "./Page/User/Profile.jsx";
import ParkingPassManegement from "./Page/MonthlyParkingPass/ParkingPassManegement.jsx";
import RequestManagement from "./Page/MonthlyParkingPass/RequestManagement.jsx";
import MonthlyPassManagementPage from "./Page/MonthlyParkingPass/MonthlyPassManagementPage.jsx";
import ManagerManagementPage from "./Page/ManagerManagement/ManagerManagementPage.jsx";
import EntryHistory from "./Page/EntryHistory/EntryHistory.jsx";
import Revenue from "./Page/Revenue/Revenue.jsx";

export default function App() {

    function NotFound() {
        const navigate = useNavigate();
        useEffect(() => navigate('/'), [])
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/importdata" element={<ImportData />} />
                <Route path="/" element={<Page />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/manager-management" element={<ManagerManagementPage />} />
                    <Route path="/entry-history" element={<EntryHistory />} />
                    <Route path="/revenue" element={<Revenue />} />
                    <Route path="parkinglot" element={<ParkingLot />} >
                        <Route path="/parkinglot" element={<ParkingLotView />} />
                        <Route path="/parkinglot/management" element={<ParkingLotManagerPage />} >
                            <Route path="/parkinglot/management" element={<ParkingLotManager />} />
                            <Route path=":id" element={<ParkingLotDetails />} />
                        </Route>
                    </Route>
                    <Route path="parking-pass" element={<MonthlyParkingPass />} >
                        <Route path="my-monthly-pass" element={<MyMonthlyPass />} />
                        <Route path="monthly-pass-management" element={<MonthlyPassManagementPage />} >
                            <Route path="" element={<MonthlyPassManagement />} />
                            <Route path="request-management" element={<RequestManagement />} />
                        </Route>
                        <Route path="management" element={<ParkingPassManegement />} />
                    </Route>
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}



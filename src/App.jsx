import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./Page/Auth/SignIn.jsx";
import Register from "./Page/Auth/Register";
import Page from "./Page/Page.jsx";
import Dashboard from "./Page/Dashboard.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Page/>}>
                    <Route path="" element={<Dashboard/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

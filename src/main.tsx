import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./app/(public)/anonymous/login/page";
import DriversPage from "./app/(private)/admin/drivers/page";
import VehicleManufacturerPage from "./app/(private)/admin/vehicle_manufacturer/page";
import VehiclePage from "./app/(private)/admin/page";
import AdminLayout from "./app/(private)/admin/_layout";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
        <Routes>
            {/* <Route path='/' element={<AnonymousLayout />}> */}
            <Route index element={<SignIn />} />

            <Route path='/admin' element={<AdminLayout children={undefined} />}>
            {/* <Route index element={<DashBoard />} /> */}
            {/* <Route path='users' element={<MemberManagement />} /> */}
            <Route path='drivers' element={<DriversPage />} />
            <Route path='vehicle_manufacturers' element={<VehicleManufacturerPage />} />
            <Route path='vehicles' element={<VehiclePage />} />
            </Route>
        </Routes>

        </BrowserRouter>
    </StrictMode>
)
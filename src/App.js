import "./styles/style.scss";
import Main from "./layouts/main/Main";
import Booking from "./layouts/booking/Booking";
import AdminLogin from "./layouts/admin/AdminLogin";
import AdminBookings from "./layouts/admin/AdminBookings";
import AdminBarbers from "./layouts/admin/AdminBarbers";
import AdminClients from "./layouts/admin/AdminClients";
import AdminNotFound from "./layouts/admin/AdminNotFound";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import AdminMain from "./layouts/admin/AdminMain";

export const Loader = () => (
  <div className="loader">
    <div className="lds-facebook"><div></div><div></div><div></div></div>
  </div>
)
function App() {
  return <>
    <Router>
      <Routes>
        <Route index element={<Main />} />
        <Route path="booking" element={<Booking />} />
        <Route path="admin">
          <Route index element={<AdminLogin />} />
          <Route path="main" element={<AdminMain />} />
          <Route path="*" element={<AdminNotFound />} />
        </Route>
      </Routes>
    </Router>
  </>
}

export default App;

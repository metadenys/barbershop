import "./styles/style.scss";
import Main from "./layouts/main/Main";
import Booking from "./layouts/booking/Booking";
import AdminLogin from "./layouts/admin/AdminLogin";
import AdminBookings from "./layouts/admin/AdminBookings";
import AdminBarbers from "./layouts/admin/AdminBarbers";
import AdminClients from "./layouts/admin/AdminClients";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";

export const Loader = () => (
  <div className="loader">
    <div className="lds-facebook"><div></div><div></div><div></div></div>
  </div>
)
/*
function Barber() {
  const { id } = useParams()
  const [barber, setBarber] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getDate = async () => {
      setLoading(true) 
      const { data } = await axios.get(`http://localhost:5000/barbers/${id}`)
      setBarber(data)
      setLoading(false)
      console.log(data)
    }
    getDate()
  }, [id])

  if(loading) return <Loader />

  if (!barber) return <div>No such barber</div>

  return <div>Barber with {id}
    Name: {barber.name}
    Age: {barber.age}
  </div>
};
*/
function App() {
  return <>
    <Router>
      <Routes>
        <Route index element={<Main />} />
        <Route path="booking" element={<Booking />} />
        <Route path="admin">
          <Route index element={<AdminLogin />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="barbers" element={<AdminBarbers />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="*" element={<div>not found</div>} />
        </Route>
      </Routes>
    </Router>
  </>
}

export default App;

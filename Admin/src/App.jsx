import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import Customers from "./pages/Customers";
import Sellers from "./pages/Sellers";
import ViewEnq from "./pages/ViewEnq";
import Carlisting from "./pages/Carlisting";
import HouseList from "./pages/HouseList";
import AddBroker from "./pages/AddBroker";
import Payment from "./pages/Payment";
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure this component is created

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="enquiries/:id" element={<ViewEnq />} />
            <Route path="payment" element={<Payment />} />
            <Route path="customers" element={<Customers />} />
            <Route path="addbroker" element={<AddBroker />} />
            <Route path="carlisting" element={<Carlisting />} />
            <Route path="houselist" element={<HouseList />} />
            <Route path="sellers" element={<Sellers />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

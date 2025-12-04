import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import PaymentForm from "./components/PaymentForm";
import Register from "./components/Register";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
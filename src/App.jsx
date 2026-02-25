import "./App.css";
import Home from "./Pages/Home";
import Mainpages from "./Pages/Mainpages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { AuthProvider } from  "./context/AuthProvider";
import ProtectedRoute from "./Pages/ProtectedRoute";
function App() {
  <ToastContainer position="top-right" autoClose={3000} />;
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Mainpages />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

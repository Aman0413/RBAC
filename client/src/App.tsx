import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./utils/ProtectedRoute"
import NotLogin from "./utils/NotLogin"
import Navbar from "./components/Navbar"

function App() {


  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />


      <Navbar />
      <Routes >
        <Route element={<NotLogin />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes >
    </>
  )
}

export default App

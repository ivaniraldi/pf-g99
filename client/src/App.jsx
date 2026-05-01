import { Navigate, Route, Routes } from "react-router-dom"
import Admin from "./views/Admin"
import Auth from "./views/Auth"
import Cart from "./views/Cart"
import Checkout from "./views/Checkout"
import Detail from "./views/Detail"
import Gallery from "./views/Gallery"
import Home from "./views/Home"
import Profile from "./views/Profile"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { useContext } from "react"
import { GlobalContext } from "./context/GlobalContext"

function App() {

  const { user } = useContext(GlobalContext);


  return (
    <>
    <NavBar/>
    <div className="container">

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={user ? <Navigate to={"/"} /> : <Auth />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to={"/auth"} />} />
      <Route path="/admin" element={user && user.role === "admin" ? <Admin /> : <Navigate to={"/auth"} />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={user ? <Checkout /> : <Navigate to={"/auth"} />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App

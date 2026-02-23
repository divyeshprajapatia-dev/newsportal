import { Outlet } from "react-router-dom"
import TopBar from "./TopBar"
import Navbar from "./Navbar"

const Layout = () => {
  return (
    <div className="px-10 py-4 bg-gray-50">
      <TopBar />
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
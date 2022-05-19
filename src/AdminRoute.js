import { Navigate, Outlet } from "react-router-dom"
import { getUser } from "./services/authorize"

const AdminRoute = () => {
    const getuser = getUser()

    return getuser ? <Outlet/> : <Navigate to="/" />
}

export default AdminRoute
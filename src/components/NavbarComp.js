import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUser,logout } from "../services/authorize"

const NavbarComp = () => {

    let navigate = useNavigate();

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">Super Blog</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    {getUser() && (
                        <li className="nav-item">
                            <Link to="/create" className="nav-link">Create Blog</Link>
                        </li>
                    )}
                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li> */}
                </ul>
                
                    <div className="d-flex">
                        {!getUser() && (
                            <Link to="/login">
                                <button className="btn btn-success" type="button">เข้าสู่ระบบ</button>
                            </Link>
                        )}

                        {getUser() && (
                            <button className="btn btn-danger" type="button" onClick={()=> logout(() => navigate("/") )}>ออกจากระบบ</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarComp
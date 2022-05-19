import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

import { authenticate, getUser } from "../services/authorize"


const LoginComp = (props) => {

    let navigate = useNavigate();

    const [state,setState] = useState({
        username: "",
        password: ""
    })
    const {username,password} = state

    //กำหนดค่า state
    const inputValue = name => event => {
        setState({...state, [name]:event.target.value})
    }

    const SubmitData = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`, {username,password})
        .then(res => {
            //login success
            authenticate(res, () => {
                navigate("/create", props);
            })
        }).catch(err => {
            Swal.fire(
                'เกิดข้อผิดพลาด',
                err.response.data.error,
                'error'
            )
        })
    }

    useEffect(() => {
        getUser() && navigate("/", props);
    },[navigate,props])

    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-3">Login</h1>

                    <form onSubmit={SubmitData}>

                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" placeholder="Username" 
                                value={username}
                                onChange={inputValue("username")}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Password" 
                                value={password}
                                onChange={inputValue("password")}
                            />
                        </div>

                        {/* <div className="mb-3">
                            <label className="form-label">Slug Url (English Only)</label>
                            <input type="text" className="form-control" placeholder="Slug Url (English Only)"/>
                        </div> */}

                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default LoginComp
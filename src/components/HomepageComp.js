import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

import { getUser, getToken } from "../services/authorize"

const HomepageComp = () => {

    const [blogs,setBlogs] = useState([])

    //fetch data
    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_API}/blogs`)
        .then(res => {
            setBlogs(res.data)
        }).catch(err => {
            alert(err)
        })
    }

    useEffect(() => {
        fetchData()
    },[])
    // end of fetch data

    // comfirm delete
    const confirmDelete = (slug) => {
        Swal.fire({
            title: 'แจ้งเตือน',
            text: "คุณแน่ใจว่าจะลบข้อมูลนี้",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ลบข้อมูลนี้',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                DeteleBlog(slug)
            }
        })
    }

    //delete data
    const DeteleBlog = (slug) => {
        //send req
        axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`, 
            {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }
        )
        .then((res) => {
              Swal.fire(
                'สำเร็จ!',
                res.data.message,
                'success'
              )

              //ดึงข้อมูลมาใหม่
              fetchData()
        }).catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className="container mt-3">
            {blogs.map((blog,index) => (
                <div className="row" key={index}>
                    <div className="col pt-3 pb-2" key={index}>
                        <Link to={`/blog/${blog.slug}`}>
                            <h2 className="text-link">{blog.title}</h2>
                        </Link>
                        <div dangerouslySetInnerHTML={{__html: blog.content}}></div>
                        <p>ผู้เขียน: {blog.author} เผยแพร่: {new Date(blog.createdAt).toLocaleString("th-TH", { timeZone: "UTC" })}</p>
                        {getUser() && (
                            <div className="btn-group mb-3">
                                <Link to={`/blog/edit/${blog.slug}`}>
                                    <button className="btn btn-outline-success">อัพเดตข้อมูล</button>
                                </Link>
                                <button className="btn btn-outline-danger" onClick={() => confirmDelete(blog.slug)}>ลบข้อมูลนี้</button>
                            </div>
                        )}
                        <hr/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HomepageComp
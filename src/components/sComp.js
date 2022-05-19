import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const Scomp = () => {

    let {slug} = useParams();

    const [blog,setBlog] = useState('')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(res => {
            setBlog(res.data)
        }).catch(err => {
            alert(err)
        })
    },[slug])

    
    return(
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <h2>{blog.title}</h2>
                    <div dangerouslySetInnerHTML={{__html: blog.content}}></div>
                    <p>ผู้เขียน: {blog.author} เผยแพร่: {new Date(blog.createdAt).toLocaleString("th-TH", { timeZone: "UTC" })}</p>
                </div>
            </div>
        </div>
    )
}

export default Scomp
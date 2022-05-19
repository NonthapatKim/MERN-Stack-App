import { useState,useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import { getToken } from "../services/authorize"

//fix react-quill 2.0.0beta
const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image", "video"],
      ["clean"]
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
};
//end fix react-quill 2.0.0beta

const EditComp = () => {

    let navigate = useNavigate()

    //use fecth and update
    let {slug} = useParams();

    const [state,setState] = useState({
        title: "",
        author: ""
    })

    const {title,author} = state

    //update content form
    const [content,setContent] = useState("")


    //fetch data
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(res => {
            const {title,content,author,slug} = res.data
            setState({...state,title,author,slug})
            setContent(content)
        }).catch(err => {
            alert(err)
        })
        
        // eslint-disable-next-line
    },[slug])
    //end fetch data


    //กำหนดค่า state
    const inputValue = name => event => {
        setState({...state, [name]:event.target.value})
    }

    //content update state
    const submitContent = (e) => {
        setContent(e)
     } 

    // update form
    const SubmitData = (e) => {
        e.preventDefault();
        // console.log("API URL:", process.env.REACT_APP_API);
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`, 
        {title,content,author},
            {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }
        )
        .then(res => {
            Swal.fire({
                title: 'สำเร็จ!',
                text: "อัปเดตข้อมูลเรียบร้อยแล้ว",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/")
                }
            })
            //set new data
            const {title,content,author,slug} = res.data
            setState({...state,title,author,slug})
            setContent(content)
        }).catch(err => {
            Swal.fire(
                'เกิดข้อผิดพลาด',
                'กรุณาตรวจสอบอีกครั้ง',
                'error'
            )
        })
    }

    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-3">Edit Blog!</h1>

                    <form onSubmit={SubmitData}>

                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" placeholder="Title" 
                                value={title}
                                onChange={inputValue("title")}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Detail</label>
                            <ReactQuill
                                theme="snow"
                                placeholder="type here!"
                                modules={modules}
                                onChange={submitContent}
                                value={content}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Author</label>
                            <input type="text" className="form-control" placeholder="Author" 
                                value={author}
                                onChange={inputValue("author")}
                            />
                        </div>

                        {/* <div className="mb-3">
                            <label className="form-label">Slug Url (English Only)</label>
                            <input type="text" className="form-control" placeholder="Slug Url (English Only)"/>
                        </div> */}

                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditComp
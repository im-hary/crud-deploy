import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Createusers() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("https://crud-server-seven-taupe.vercel.app/createUser", { name, email, age })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))

    }
    return (

        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form action="" onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                            onChange={(e) => { setName(e.target.value) }} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" />
                    </div>


                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder="Enter Age" onChange={(e) => { setAge(e.target.value) }} className="form-control" />
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )

}
export default Createusers
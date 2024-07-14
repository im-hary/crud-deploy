import axios from "axios"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdSearch } from "react-icons/md";
function Users() {
    const [users, setUsers] = useState([])
    const [filterusers, setFilterUsers] = useState([])
    const [inputValue, setInput] = useState('')
    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(res => { setUsers(res.data); setFilterUsers(res.data) })
            .catch(err => console.log(err))
    }, [])
    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/' + id)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const bg = {
        display: "flex",
        felxDirection: "row",
        columnGap: "10px"
    }
    function searchdata() {
        let data = users.filter(value => {
            return value.name.includes(inputValue) || value.email.includes(inputValue)
        })
        setFilterUsers(data)
    }
    return (
        <div className="d-flex vh-100 bg-secondary justify-content-center align-items-start ">
            <div id="bg" className="w-50 bg-white rounded p-3">
                <div className="d-flex"><Link to="/create" id="link" className="btn btn-primary m-2">Add+</Link>
                    <div class="input-group ">
                        <input type="text" class="form-control m-2" placeholder="Search this blog" onChange={(e) => setInput(e.target.value)}></input>
                        <div class="input-group-append">
                            <button onClick={searchdata} class="btn btn-secondary m-2" type="button">
                                <MdSearch />
                            </button>
                        </div>
                    </div></div>
                <table className="table  table-bordered table-hover table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Age</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>{
                        filterusers.map((user) => {
                            return <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td><div style={bg}><Link to={`/update/${user._id}`} className="btn btn-success"><MdModeEditOutline /></Link><td />
                                    <button className="btn  btn-danger" onClick={(e) => handleDelete(user._id)}><RiDeleteBin6Fill /></button></div></td>
                            </tr>
                        })

                    }
                    </tbody>
                </table>
            </div>

        </div>
    )

}
export default Users
import React, { useEffect, useState } from 'react'
import "./Home.css"

// For fetching data
import axios from 'axios'

import Card from './Card';

const Home = () => {

    const [users, setUsers] = useState()

    useEffect(() => {
        axios.get('https://student-management-crud-node.herokuapp.com/users/read')
            .then(res => {
                setUsers(res.data)
            })
    }, [])


    console.log(users)

    return (
        <div>
            <center><h1 style={{ "marginTop": "50px" }}>Students Record Management System</h1></center>
            <div className="container">
                {users && users.map(user => (
                    <Card type="card" key={user._id}
                        user={user} allusers={users}
                        setUsers={setUsers} />
                ))}

                <Card type="add" setUsers={setUsers} />
            </div>
        </div>
    )
}

export default Home

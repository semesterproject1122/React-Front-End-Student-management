import React, { useState, useEffect } from 'react'

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from './Popup';
import axios from 'axios';


// For real time
import io from 'socket.io-client'
const socket = io('https://student-management-crud-node.herokuapp.com/');

const Card = ({ type, user, setUsers, allusers }) => {

    const [popup, setPopup] = useState(false);

    const [cardUser, setCardUser] = useState(user);

    const handleDelete = (id) => {
        axios.delete(`https://student-management-crud-node.herokuapp.com/users/delete/${id}`)
        socket.on('user-deleted', (id) => {
            const newUsers = allusers.filter(user => {
                return user._id !== id
            })
            setUsers(newUsers)
            console.log(newUsers)
            console.log(id)
        })
    }



    return (
        <div>
            {
                popup && <Popup setPopup={setPopup}
                    user={cardUser} setUsers={setUsers}
                    setCardUser={setCardUser} />
            }
            {(type === 'card') ? (
                <div className="cards">
                    <div className="display">
                        <div className="content">
                            <b>Student Name</b>
                            <br></br>
                            <p> {cardUser.name}</p>
                            <br></br>

                            <p>Added on: {cardUser.dateAdded}</p>
                            <br></br>
                            <p style={{ "marginTop": "10px", "color": "black" }}><b > About Student</b></p>
                            <p className="about">{cardUser.desc}</p><br></br>
                            <b>Student's Contact Number</b>
                            <p className="phone">+92{cardUser.phone}</p><br></br>
                            <b>Student's Standard/Class</b><br></br>
                            <p className="class">{cardUser.class}&nbsp; th</p><br></br>
                            <b>Student's Section</b>
                            <p className="section">{cardUser.section}</p>
                        </div>

                    </div>
                    <div className="btn-container">
                        <div onClick={() => setPopup(true)}>
                            <CreateIcon />
                        </div>
                        <div onClick={() => handleDelete(user._id)}>
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="addcards"
                    onClick={() => setPopup(true)}>
                    <AddCircleOutlineIcon />
                </div>
            )}


        </div>

    )
}

export default Card

import React, { useState, useEffect } from 'react'
import CancelIcon from '@material-ui/icons/Cancel';

// For real time
import io from 'socket.io-client'


// For uploading data
import axios from 'axios'

const socket = io('https://student-management-crud-node.herokuapp.com/');

const Popup = ({ setPopup, user, setUsers, setCardUser }) => {


    const [data, setData] = useState({
        name: '',
        dateAdded: '',
        desc: '',
        phone: '',
        class: '',
        section: '',

    });

    useEffect(() => {
        if (user) setData(user);
    }, [])


    const date = new Date();
    const storeDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`


    const addUser = () => {

        const uData = {
            name: data.name,
            dateAdded: storeDate,
            desc: data.desc,
            phone: data.phone,
            class: data.class,
            section: data.section,

        }


        // Now add user data using axios
        axios.post("https://student-management-crud-node.herokuapp.com/users/create", uData)

        // Making realtime using Socket.io
        socket.once('user-added', newData => {
            axios.get('https://student-management-crud-node.herokuapp.com/users/read')
                .then(res => {
                    setUsers(res.data)
                })

        })


        setPopup(false)
    }



    const updateUser = () => {
        const uData = {
            name: data.name,
            dateAdded: data.dateAdded,
            desc: data.desc,
            phone: data.phone,
            class: data.class,
            section: data.section,
            _id: data._id
        }
        axios.put("https://student-management-crud-node.herokuapp.com/users/update", uData)

        socket.once('user-updated', (updatedData) => {

            setCardUser(uData)
        })

        setPopup(false)
    }

    return (
        <div className="pop-up">
            <div className="input-box">
                <CancelIcon onClick={() => setPopup(false)} className="cross-btn" />
                <h3>Enter Students details:</h3>
                Student Name
                <input type="text"
                    value={data.name}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        name: e.target.value
                    }))}
                />
                Description
                <input type="text"
                    value={data.desc}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        desc: e.target.value
                    }))}
                />
                Phone
                <input type="number"
                    value={data.phone}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        phone: e.target.value
                    }))}
                />
                Class
                <input type="number"
                    value={data.class}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        class: e.target.value
                    }))}
                />
                Section
                <input type="text"
                    value={data.section}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        section: e.target.value
                    }))}
                />




                {!user ? (
                    <button onClick={addUser}>
                        Add User
                    </button>
                ) : (
                    <button onClick={updateUser}>
                        Update Student
                    </button>
                )}

            </div>
        </div>
    )
}

export default Popup

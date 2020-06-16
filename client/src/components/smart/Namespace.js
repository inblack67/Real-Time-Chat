import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router';
import RoomContext from '../../context/room/roomContext'

const Namespace = ({ history }) => {

    const [formData, setFormData] = useState({
        name: '',
        room: ''
    });

    const roomContext = useContext(RoomContext);

    const { login } = roomContext;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        login(formData);
        history.push(`/chat/${room}`)
    }

    const { name, room } = formData;

    return (
        <div className="container center">
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input type="text" onChange={onChange} value={name} name='name' required/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-field">
                    <input type="text" onChange={onChange} value={room} name='room' required/>
                    <label htmlFor="room">Room</label>
                </div>
                <div className="input-field">
                    <input type="submit" value="Join" className='btn red'/>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Namespace);

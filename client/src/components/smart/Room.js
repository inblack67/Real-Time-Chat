import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import RoomContext from '../../context/room/roomContext'
import { useContext } from 'react'
import Preloader from '../dumb/Preloader'

let socket;

const Room = ({ match }) => {

    const [message, setMessage] = useState('');

    useEffect(() => {

        socket = new io(process.env.REACT_APP_API_END_POINT, {
            'sync disconnect on unload': true });
        socket.emit('join', { name, room }, (err) => {
            console.log(err.error)
        });


        return () => {
            socket.emit('disconnect');
            socket.off();
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        socket.on('message', data => {
            newMessage(data);
        })

        socket.on('notification', data => {
            newNotification(data);
        })

        socket.on('roomData', data => {
            roomData(data);
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
        // eslint-disable-next-line
    },[])

    const roomContext = useContext(RoomContext);

    const { name, room, users, notifications, messages, loading, newMessage, newNotification, roomData, } = roomContext;

    const onChange = e => {
        setMessage(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        socket.emit('sendMessage', message);
        setMessage('');
    }

    if(loading){
        return <Preloader />
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input type="text" name='message' value={message} onChange={onChange} required />
                    <label htmlFor="messgae">Message</label>
                </div>
                <div className="input-field">
                    <input type="submit" value="Send" className='btn green'/>
                </div>
            </form>
            <div className="container">
                <h5>Notifications</h5>
                { notifications && notifications.map(noti => <h6 key={Math.random() * 100}>
                    {noti}
                </h6>) }
                <h5>Messages</h5>
                <ul className="collection">
                    { messages && messages.map((message, index) =>
                        <li key={Math.random() * 100} className="collection-item">
                            { message }
                        </li>
                    ) }
                </ul>
                <h5>Room Data</h5>
                <ul className="collection">
                { users.map(user => 
                     <li className='collection-item' key={Math.random() * 100}>
                        { user.name }
                    </li>
                ) }
                </ul>
            </div>
        </div>
    )
}


export default Room

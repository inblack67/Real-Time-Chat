import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import RoomContext from '../../context/room/roomContext'
import { useContext } from 'react'

const Room = ({ match }) => {

    useEffect(() => {
        const socket = new io(process.env.REACT_APP_API_END_POINT);
        socket.emit('join', { name, room }, (err) => {
            console.log(err.error)
        });


        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

    const roomName = match.params.room;

    const roomContext = useContext(RoomContext);

    const { name, room } = roomContext;

    return (
        <div>
            <h1>room chattein</h1>
        </div>
    )
}

Room.propTypes = {

}

export default Room

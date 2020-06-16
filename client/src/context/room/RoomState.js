import React, { useReducer } from 'react'
import roomReducer from './roomReducer'
import RoomContext from './roomContext'
import { LOGIN, NOTIFICATION, MESSAGE, ROOM_DATA } from '../types'

const RoomState = (props) => {

    const initialState = {
        name: '',
        room: '',
        users: [],
        notifications: [],
        messages: [],
        error: null,
        loading: true
    }

    const [state, dispatch] = useReducer(roomReducer, initialState);

    const login = (formData) => {
        dispatch({
            type: LOGIN,
            payload: formData
        })
    }

    const newNotification = data => {
        dispatch({
            type: NOTIFICATION,
            payload: data.payload
        })
    }

    const newMessage = data => {
        dispatch({
            type: MESSAGE,
            payload: data.payload
        })
    }

    const roomData = data => {
        dispatch({
            type: ROOM_DATA,
            payload: data
        })
    }

    return (
        <RoomContext.Provider value={{
            name: state.name,
            room: state.room,
            messages: state.messages,
            users: state.users,
            error: state.error,
            notifications: state.notifications,
            loading: state.loading,
            login,
            newMessage,
            newNotification,
            roomData

        }}>
            { props.children }
        </RoomContext.Provider>
    )
}

export default RoomState

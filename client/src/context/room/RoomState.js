import React, { useReducer, useEffect, useState } from 'react'
import roomReducer from './roomReducer'
import RoomContext from './roomContext'
import io from 'socket.io-client'
import { LOGIN } from '../types'

const RoomState = (props) => {

    const initialState = {
        name: '',
        room: '',
        loading: true
    }

    const [state, dispatch] = useReducer(roomReducer, initialState);

    const login = (formData) => {
        dispatch({
            type: LOGIN,
            payload: formData
        })
    }

    const { name, room } = initialState

    return (
        <RoomContext.Provider value={{
            name: state.name,
            room: state.room,
            loading: state.loading,
            login
        }}>
            { props.children }
        </RoomContext.Provider>
    )
}

export default RoomState

import { LOGIN, NOTIFICATION, MESSAGE, ROOM_DATA } from '../types'

export default (state, action) => {
    const { type, payload } = action;

    switch(type){
        case LOGIN: 
        return {
            ...state,
            name: payload.name,
            room: payload.room,
            loading: false
        }

        case NOTIFICATION: 
        return {
            ...state,
            notifications: [...state.notifications, payload],
            loading: false
        }

        case MESSAGE:
        return {
            ...state,
            messages: [...state.messages, payload],
            loading: false
        }

        case ROOM_DATA: 
        return {
            ...state,
            users: [...payload.usersInRoom],
            loading: false
        }

        default: return state
    }
}
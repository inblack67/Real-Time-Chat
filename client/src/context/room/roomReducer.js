import { LOGIN, LOGOUT } from '../types'

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

        case LOGOUT: 
        return {
            ...state,
            name: '',
            room: '',
            loading: false
        }
    }
}
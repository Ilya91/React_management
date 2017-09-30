import jwt from 'jwt-simple'
import config from '../../server/config.json'
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from '../constants'
let localToken = localStorage.getItem('token')
let decodedToken = null
if(localToken){
    decodedToken = jwt.decode(localToken, config.secret).sub
}


export default function(state = {}, action) {
    const { type, payload, response } = action
    switch(type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true, user: payload.id }
        case UNAUTH_USER:
            return { ...state, authenticated: false, user: null }
        case AUTH_ERROR:
            return { ...state, error: payload }
        case FETCH_MESSAGE:
            return { ...state, message: payload }
    }
    return state;
}

import {
    LOAD_ALL_USERS
} from '../constants'

export default ( userState = [], action) => {
    const { type, response } = action
    switch (type){
        case LOAD_ALL_USERS: return [ ...response.data ]
    }
    return userState
}
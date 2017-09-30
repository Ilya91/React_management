import { SET_ACTIVE_PROJECT } from '../constants'

export default ( activeProject = null, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_ACTIVE_PROJECT:
            return payload.id
            /*if (activeProject === payload.id){
                return null
            }else {
                return payload.id
            }*/

    }
    return activeProject
}
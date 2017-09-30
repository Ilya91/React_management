import axios from 'axios';
export default store => next => action => {
    const {callAPI} = action
    if (!callAPI) return next(action)
    axios.get(callAPI).then((response) => next({...action, response}))
}
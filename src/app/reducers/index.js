import { combineReducers } from 'redux';
import { ACTIONS } from '../actions';

const AnimationReducer = (state = {}, action) => {
    switch(action.type){
        case ACTIONS.ANIMATION_START:
            return {
                ...state,
                inProgress : true
            }
        case ACTIONS.ANIMATION_WILL_STOP:
            return {
                ...state,
                shuttingDown : true
            }
        case ACTIONS.ANIMATION_STOP:
            return {
                inProgress : false
            }
        case ACTIONS.CHANGE_STEP:
            return {
                ...state,
                step : action.payload
            }
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    animationReducer: AnimationReducer
});

export default rootReducer;
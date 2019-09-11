import ICoordinates from "../components/interactive-background/shapes/i-coordinates";
import HeartCoordinates from "../components/interactive-background/shapes/heart-coordinates";
import JsCoordinates from "../components/interactive-background/shapes/js-coordinates";

export const ACTIONS = {
    ANIMATION_START: 'ANIMATION_START',
    ANIMATION_STOP: 'ANIMATION_STOP',
    CHANGE_STEP: 'CHANGE_STEP'
}

const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const animationSteps = [
    {coordinates: shuffle(ICoordinates), duration: 1.5},
    {coordinates: shuffle(HeartCoordinates), duration: 1.5},
    {coordinates: shuffle(JsCoordinates), duration: 2}
];

export const startAnimation = () => {
    return (dispatch) => {
        dispatch({type: ACTIONS.ANIMATION_START});
        
        setTimeout(() => {
            play(dispatch, 0);
        }, 1000 );
        
    }
}

const play = (dispatch, index = 0) => {
    if (index <= animationSteps.length - 1) {
        const step = animationSteps[index];
        
        const duration = 1000*step.duration;
        setTimeout(()=>{
            play(dispatch, index+1);
        }, duration)
        dispatch({type: ACTIONS.CHANGE_STEP, payload: step.coordinates});
    } else {
        stopAnimation(dispatch);
    }

}

const stopAnimation = (dispatch) => {
    dispatch({type: ACTIONS.ANIMATION_STOP});
}
import ICoordinates from "../components/interactive-background/shapes/i-coordinates";
import HeartCoordinates from "../components/interactive-background/shapes/heart-coordinates";
import JsCoordinates from "../components/interactive-background/shapes/js-coordinates";

export const ACTIONS = {
    ANIMATION_START: 'ANIMATION_START',
    ANIMATION_WILL_STOP: 'ANIMATION_WILL_STOP',
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

const explosion = () => {
    let arr = [];
    const maxX = 50;
    const maxY = 20
    for (let i=0; i<150; i++) {
        const x = (Math.random()*(maxX*2))-maxX;
        const y = (Math.random()*(maxY*2))-maxY;
        arr.push({x,y, gpId: i})
    }
    return arr;
}

const animationSteps = [
    {coordinates: shuffle(ICoordinates), duration: 1.5},
    {coordinates: shuffle(HeartCoordinates), color: {r:255, g: 0, b:0, a: 0.8}, duration: 1.5},
    {coordinates: shuffle(JsCoordinates), duration: 2},
    {coordinates: explosion(), duration: 1}
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
        dispatch({type: ACTIONS.CHANGE_STEP, payload: step});
    } else {
        stopAnimation(dispatch);
    }

}

const stopAnimation = (dispatch) => {
    dispatch({type: ACTIONS.ANIMATION_WILL_STOP});
    setTimeout(() => {
        dispatch({type: ACTIONS.ANIMATION_STOP});
    }, 1000);
}
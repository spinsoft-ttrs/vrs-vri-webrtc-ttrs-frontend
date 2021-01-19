const controlVideo = (
    state={
        openMessage:false,
        openAudio: true,
        openVideo: true,
        openMic: true,
        openTerminate : false,
        show : true
    }, action) => {
    if(action.type === "UPDATECONTROLVIDEO"){
        return {...state,  [action.typedata] : action.payload}
    }else{
        return state;
    }
}
export default controlVideo;
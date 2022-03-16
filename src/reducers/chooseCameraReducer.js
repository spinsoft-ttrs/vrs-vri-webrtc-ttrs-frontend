const chooseCameraReducer = (state="", action) => {
    if(action.type === "UPDATESELECTCAMERA"){
        return state = action.payload
    }else{
        return state;
    }
}
export default chooseCameraReducer;
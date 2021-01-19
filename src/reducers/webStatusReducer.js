const webStatus = (state = false, action) => {
    // console.log(action.payload)
    // return action.payload;
    if(action.type === "UPDATESTATUS"){
        return state = action.payload;
    }else{
        return state;
    }
}
export default webStatus;
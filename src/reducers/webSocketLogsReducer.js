const webSocketLogsReducer = (state = "", action) => {
    if(action.type === "UPDATEWEBSOCKETLOGS"){
        return state += '\n' + action.payload;
    }else{
        return state;
    }
}
export default webSocketLogsReducer;
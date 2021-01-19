const messageDataUpdate = (state=[], action) => {
    if(action.type === "UPDATEMESSAGEDATA"){
        if(action.origin === null){
            state = []
        }else
        if(action.body !== ''){
            state = [...state, { 
                "sender" : action.sender,
                "origin" : action.origin,
                "date" : action.date,
                "body" : action.body,
            }]
        }else {
        }
        return state;
    }else{
        return state;
    }
}
export default messageDataUpdate;
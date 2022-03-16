const updateRegisterData = (state={}, action) => {
    if(action.type === "UPDATEREGISTERDATA"){
        return {...state,  [action.typedata] : action.payload}
    }else{
        return state;
    }
}
export default updateRegisterData;
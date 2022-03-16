import registerDataReducer from './registerData';
import webStatusReducer from './webStatusReducer';
import webSocketLogsReducer from './webSocketLogsReducer';
import messagedataReducer from './messagedataReducer';
import controlVideoReducer from './controlVideoReducer';
import chooseCameraReducer from "./chooseCameraReducer";

import {combineReducers} from 'redux';

const allReducers = combineReducers({
    chooseCamera : chooseCameraReducer,
    registerData : registerDataReducer,
    controlVideo : controlVideoReducer,
    webStatus : webStatusReducer,
    webSocketLogs : webSocketLogsReducer,
    messagedata : messagedataReducer
})

export default allReducers;
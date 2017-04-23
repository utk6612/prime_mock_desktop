import { combineReducers } from 'redux';
import {traderItems, stockItems,newUser,orders,setView,auth,id,notification,nMessage,setMap} from './items';

var rootReducer= combineReducers({

     traderItems,
     stockItems,
     newUser,
     orders,
     setView,
     notification,
     nMessage,
     setMap
});

export default rootReducer;
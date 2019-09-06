import {createStore} from 'redux';
const InitialState = {
  "xlsData": [],
  "keys": [],
  "keyData": {}
}

function rootReducer(state =InitialState, action) {
  switch (action.type) {
    case 'setXlsData':
      state = {...state, 'xlsData' : action.value}
      break;
    case 'setKeys':
      state = {...state, 'keys': action.value}
      break;
    case 'setKeyData':
      state = {...state, 'keyData': action.value}
      break;
    default:
      break;
  }
  return state;
}
export const store = createStore(rootReducer, InitialState);

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

const SelectKeys = () => {
  const dispatch = useDispatch();
  const keyData = useSelector((state)=>state.keyData);
  const xlsData = useSelector((state)=>state.xlsData);

  const keyItemClick = (e) => {
    const keyVal = e.target.value;
    var changingData = {...keyData};
    changingData[keyVal] = !changingData[keyVal];
    dispatch({type: 'changeKeyData', value: changingData, because: 'key changed'});
  }
  var askedKeys = [(<div>Select which key you want to further use:</div>)]
  Object.keys(xlsData[0]).forEach((keyVal)=> {
    askedKeys.push(<span><input type="checkbox" value={keyVal} onClick={keyItemClick} /><label>{keyVal}</label></span>);
  });
  return(
  <div>{askedKeys}</div>
  );
}

export default SelectKeys;
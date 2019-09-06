import React from 'react';
import {useSelector} from 'react-redux';
const GetData = (rowNum) => {
  const xlsData = useSelector((state)=>state.xlsData);
  const keys = useSelector((state)=>state.keys);
  const keyData = useSelector((state)=>state.keyData);
  var candidateBio = [];
  keys.forEach((val) => {
    console.log(val, keyData[val])
    candidateBio.push(keyData[val] && <input value={xlsData[rowNum].val}/>);
  });
  return candidateBio;
};

const CandidateListByURL = ({ data, keyData }) => {
  var candData = [];
  if(data.length > 100) {
    // setErrorMessage('number of candidates must not be greater than 100');
    return candData;
  }
  for(var i =0; i< data.length; i++) {
    candData.push((
      <div className="candidateArea" key={`candidate${i}`}>
        candidate{i+1}
       <GetData rowNum={i}/>
      </div>
    ));
  }
  return candData;
};

export default CandidateListByURL;

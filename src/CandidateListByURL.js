import React from 'react';
import {useSelector} from 'react-redux';


const CandidateListByURL = ({ data}) => {

  const xlsData = useSelector((state)=>state.xlsData);
  const keyData = useSelector((state)=>state.keyData);
  const GetData = ({rowNum}) => {
    var candidateBio = [];
    Object.keys(keyData).forEach((val) => {
      candidateBio.push(keyData[val] && <input value={xlsData[rowNum][val]}/>);
    });
    return candidateBio;
  };

  var candData = [];
  if(data.length > 100) {
    return candData;
  }
  for(var i =0; i< data.length; i++) {
    candData.push((
      <div className="candidateArea" key={`candidate${i}`}>
        candidate{i+1}
       {keyData &&  <GetData rowNum={i}/>}
      </div>
    ));
  }
  return candData;
};

export default CandidateListByURL;

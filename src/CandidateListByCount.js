import React from 'react';

const CandidateListByCount = ({numberofcandidates}) => {
  // setErrorMessage('');
  var CandidateData = [];
  if(numberofcandidates > 100) {
    // setErrorMessage('number of candidates must not be greater than 100');
    return CandidateData;
  }
  for(var i =0; i< numberofcandidates; i++) {
    CandidateData.push((
      <div className="candidateArea" key={`candidate${i}`}>
        candidate{i+1}
      </div>
    ));
  }
  return CandidateData;
};

export default CandidateListByCount;

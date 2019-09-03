import React, { useState, Fragment } from 'react';
import './App.css';
// import { GetData } from './GetData';
import XLSX from 'xlsx';

const App = () => {
  const [numberofcandidates,setNumberofCandiates] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const fileReader = (e) => {
    let reader;
    // fetch ('https://docs.google.com/spreadsheets/d/1Xr2IjT8Ohh3fYqoAKIMLiR21AleNMNJ9SXVlkLIn2F4/edit?usp=sharing')
    fetch (e.target.value)
    .then(response => {
      reader = response.body.getReader();
      reader.read()
      .then(({value}) => {
        try {
          var workbook = XLSX.read(value, {type:'array'});
        } catch (error) {
          setErrorMessage(error.message);
          return;
        }
        console.log(workbook);
        var sheetName = workbook.SheetNames;
        console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]],{raw: true, defval:null}));
      });
    });
  }
  const inputChange = (e) => {
    setNumberofCandiates(e.target.value);
  };
  const CandidateList = () => {
    var CandidateData = [];
    if(numberofcandidates > 100) {
      setErrorMessage('number of candidates must not be greater than 100');
      return CandidateData;
    }
    setErrorMessage('');
    for(var i =0; i< numberofcandidates; i++) {
      CandidateData.push((
        <div className="candidateArea" key={`candidate${i}`}>
          candidate{i+1}
        </div>
      ));
    }
    return CandidateData;
  }
  return (
    <Fragment>
      <div className="App">
        <input placeholder="how many candidates are here" className="inputBox"  onChange={inputChange}/>
        or
        <input placeholder="Enter External file's Url here" className="inputBox"  onChange={fileReader}/>
      </div>
      <div className="errorMessage">{errorMessage}</div>
      <CandidateList />
    </Fragment>
  );
}

export default App;

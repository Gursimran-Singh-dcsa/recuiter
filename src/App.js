import React, { useState, Fragment } from 'react';
import './App.css';
import CandidateListByCount from './CandidateListByCount';
import CandidateListByURL from './CandidateListByURL';
import XLSX from 'xlsx';
import {useDispatch, useSelector} from 'react-redux';
import SelectKeys from './SelectKeys';

const App = () => {
  const [numberofcandidates,setNumberofCandiates] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [byCount, setByCount] = useState(false);
  const [byUrl, setByUrl] = useState(false);
  const dispatch = useDispatch();
  const xlsData = useSelector(state => state.xlsData);
  const keyData = useSelector(state => state.keyData);


  const fileReader = (e) => {
    const url = e.target.value.trim();
    // setErrorMessage('');
    // fetch ('https://docs.google.com/spreadsheets/d/e/2PACX-1vQhBXXk4H_TJmymwkCvI6gQY9rHI8VgjSUKVoB4zwYMeIW1XRKP3hJUAxhPBhbcMHv2_g6Q7E6_pU8a/pubhtml')
    fetch (url)
    .then(response => {
      const reader = response.body.getReader();
      reader.read()
      .then(({value}) => {
        try {
          var workbook = XLSX.read(value, {type: 'array'});
        } catch (error) {
          // setErrorMessage(error.message);
          return;
        }
        var sheetName = workbook.SheetNames;
        const xlsdata = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]],{raw: true, defval:null});
        dispatch({type: 'setXlsData', value: xlsdata});
      }).then(()=>{
        setByUrl(true);
        setByCount(false);
      });
    });
  }
  const inputChange = (e) => {
    setNumberofCandiates(e.target.value);
    setByUrl(false);
    setByCount(true);
  };
  return (
    <Fragment>
      <div className="App">
        <input placeholder="how many candidates are here" className="inputBox"  onChange={inputChange}/>
        <br/><span>or</span><br/>
        <input placeholder="enter link of your published xlsx file" className="inputBox" onChange={fileReader} />
      </div>
      <div className="errorMessage">{errorMessage}</div>
      {byCount && <CandidateListByCount numberofcandidates={numberofcandidates}/>}
      {byUrl && <SelectKeys />}
      {byUrl && keyData && <CandidateListByURL data={xlsData} />}
    </Fragment>
  );
}

export default App;

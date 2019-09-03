import XLSX from 'xlsx';
import React from 'react';
export const GetData = ({url}) => {
  console.log('url is', url);
  var workbook = XLSX.readFile(url);
  var sheetName = workbook.SheetNames;
  console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]],{raw: true, defval:null}));
  return (<div> here</div>);
}
import React, { Component } from 'react'
// var Xlsx = require('xlsx')
// import Xlsx from "xlsx";
import * as XLSX from "xlsx";
let fileReader;
export class xlsxtry extends Component {
    dataparseHandler=(dataparse)=>{
let myobj={};
dataparse.map((i,index)=>{
    // myobj[key]
    // console.log(i)
    // var key;
    let key=dataparse[0];
    // console.log("key",key)
    var person={[key[index]]:i[index]}
    console.log(person)
    // console.log("value",i);
//  myobj[key]=i;
// return myobj
    // myobj[key]=i;
    // var obj={key[index]:i}
    // console.log(myobj)
    // return myobj[key]=i
})
// myobj.key=dataparse[0];
// myobj.value=dataparse;
// console.log(myobj)
// console.log(dataparse[0])
    }
    handleFile=(e)=>{
        var content=e.target.result;
        // console.log(content)
        var workbook =XLSX.read(content,{type:"binary"})
        // console.log(workbook)
        var sheet_name_list=workbook.SheetNames[0];
        const ws = workbook.Sheets[sheet_name_list];
        const dataparse= XLSX.utils.sheet_to_json(ws,{header:1})
        this.dataparseHandler(dataparse)
// console.log(dataparse)
// console.log(Xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
// console.log(e.target.result)
    }
    fileHandler=(file)=>{
        // console.log(file)
fileReader=new FileReader();
fileReader.onloadend=this.handleFile;
fileReader.readAsBinaryString(file);
        // console.log(file)
    }
    render() {
        return (
            <div>
                <input type="file" onChange={(e)=>{this.fileHandler(e.target.files[0])}}></input>
       {/* <Button type="primary" onClick={this.buttonHandler}>Proceed</Button> */}
            </div>
        )
    }
}

export default xlsxtry

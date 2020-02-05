import React, { Component } from 'react'
import readXlsxFile from 'read-excel-file'  
import xlsxParser from 'xlsx-parse-json';
import {Redirect} from 'react-router-dom'
import {Button} from 'antd'
// import {img} from './cl.png'
const csv2json = require('csvjson-csv2json');
const parser = require('js-sql-parser');


let fileReader;


export class FileCatcher extends Component {
    state={
        stateData:[],
        redirect:false,
        stateRoute:[]
    }
    buttonHandler=()=>{
        this.setState({redirect:true})
    }
    Redirection=()=>{
        if(this.state.redirect){
    return<Redirect to={{ pathname: "/map", state: {token:this.state.token,data:this.state.stateData,route:this.state.stateRoute} }} />
            
        }
    }
    handleFile = (e) => {
let data=[];
        const content = fileReader.result;
        data=csv2json(content);
        console.log("to check",data)
let newdata=data.map((i)=>{
    return({"latitude":i.lat,"longitude":i.long})
})
let newroute=data.map((i)=>{
    if(i.route!=="NOTFOUND"){
        return ({"latitude":i.lat,"longitude":i.long,"route":i.route})
    
    }
})


this.setState({stateData:newdata,stateRoute:newroute})
      }
    fileHandler=(file)=>{
        fileReader=new FileReader();
        fileReader.onloadend = this.handleFile;
  fileReader.readAsText(file);
    }
    render() {
        return (
            <div style={{padding:"20px 20px",margin:"100px auto",height:"300px",width:"300px",boxShadow:" 0 5px 10px 8px #888888"}}>{this.Redirection()}
               <h1>Choose Your File(.csv format)</h1>
               {/* <img src={img}></img> */}
                <input type="file" onChange={(e)=> this.fileHandler(e.target.files[0])}></input>
       <br/><br/><br/>   <Button type="primary" onClick={this.buttonHandler}>Proceed</Button>
            </div>
        )
    }
}

export default FileCatcher

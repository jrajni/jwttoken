import React from 'react'
import {Redirect} from 'react-router-dom'
import {verify} from 'jsonwebtoken'
import {Select}from 'antd'
import { Map, GoogleApiWrapper,Marker} from 'google-maps-react';
const { Option } = Select;
const mapStyles = {
    width: '100%',
    height: '100%',
  };
  
class MapContainer extends React.Component {
   
    state = {
        stores: this.props.location.state.data,
        redirect:false,
        selectvalue:"",
        filteredState:[]
      }
      handleChange=(value)=>{
this.setState({selectvalue:value})
let filteredValue = this.props.location.state.route.filter((i)=>i.route === value)
var myarr=filteredValue.map((i)=>{
    return ({"latitude":i.latitude,"longitude":i.longitude})
})
this.setState({stores:myarr})
console.log(filteredValue)
      }
      componentDidMount=()=>{
        console.log(this.props.location.state.route);

       var token = localStorage.getItem('mytoken')
        verify(token,'secretkey',(err,authData)=>{
            console.log("inside verify")
            if(err){
                this.setState({redirect:true})
            }
        })
    }
      redirection=()=>{
          if(this.state.redirect){
              return <Redirect to='/login'></Redirect>
          }
      }
      displayMarkers = () => {
        return this.state.stores.map((store, index) => {
          return <Marker key={index} id={index} position={{
           lat: store.latitude,
           lng: store.longitude
         }}
          />
        })
      }
    render(){
    return (
        <div>{this.redirection()}
        <h1>Select Route</h1>
          <Select defaultValue="ROUTE 1" style={{ width: 120 }} onChange={this.handleChange}>
      <Option value="ROUTE 1">ROUTE 1</Option>
      <Option value="ROUTE 2">ROUTE 2</Option>
      <Option value="ROUTE 3">ROUTE 3</Option> 
      <Option value="ROUTE 4">ROUTE 4</Option>
      <Option value="ROUTE 5">ROUTE 5</Option>
      <Option value="ROUTE 6">ROUTE 6</Option>
       <Option value="ROUTE 7">ROUTE 7</Option>
      <Option value="ROUTE 8">ROUTE 8</Option>
      <Option value="ROUTE 9">ROUTE 9</Option>
    </Select>
            <Map
             google={this.props.google}
             zoom={8}
             style={mapStyles}
             initialCenter={{ lat: 17.350627, lng: 78.492849}} 
            >
                {/* 17.350627	 */}
                 {this.displayMarkers()}
            </Map>
        </div>
    )}
}
export default GoogleApiWrapper({
    apiKey:'AIzaSyDDLeoJCQgm7xZuccfqeZ8wMmL_Cov5oqU'
})(MapContainer)

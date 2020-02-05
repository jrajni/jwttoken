import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './Login.css'
import 'antd/dist/antd.css';
import './App.css'
import axios from 'axios'
import FileCatcher from './FileCatcher'
import {Redirect} from 'react-router-dom'
import Firebase from 'firebase'
let redirection=false;
class NormalLoginForm extends React.Component {
    state={
        email:"",
        password:"",
        users:[],
        redirect:false,
        token:""
    }
    eventHandler=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    componentDidMount=()=>{
        let users=[]
        Firebase.firestore().collection("users").get().then((querySnapshot)=>{
            querySnapshot.forEach((i)=>{
                var user={
                    email:i.data().email,
                    password:i.data().password
                }
                users.push(user);

            })
        })
        this.setState({users})
    }
  handleSubmit = e => {
      var arr=[]
   
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          for(let i=0;i<this.state.users.length;i++){
              if(this.state.users[i].email===this.state.email&&this.state.users[i].password===this.state.password)
         {
             redirection=true;
            //  axios.post('/api/login',{
             
             axios.post(' https://cors-anywhere.herokuapp.com/https://googlemapsmarkernode.herokuapp.com/api/login',{
        email:this.state.email,
        password:this.state.password
    })
    .then((res)=>{
this.setState({redirect:true})
        // <Redirect to="/">
        localStorage.setItem('mytoken',res.data.token)
        this.setState({token:res.data.token})
    })
    .catch((err)=>{
    })           

         break;
            }else{
                redirection=false
         }
            }
            if(redirection){
                console.log("done")
            }else{
                alert("Credentials Incorrected")
            }
      }
    });
  };
redirectionPage=()=>{
if(this.state.redirect){
    // localStorage.setItem('mytoken',this.state.token)
    return<Redirect to={{ pathname: "/filecatcher", state: {token:this.state.token} }} />
}

}
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    <div >
        <div class="main-bg">
        <div class="box-conatiner">
        {this.redirectionPage()}
        <div style={{margin:'10px auto'}}>
            {/* <span className="login100" style={{margin:'150px 110px 0px 300px',fontSize:"40px"}}>Login</span> */}
      <Form onSubmit={this.handleSubmit} className="login-form" style={{margin:'40px 110px 0px 300px'}}>
    
     
        <Form.Item>
        <h1 style={{marginLeft:"30px",fontFamily:"Montserrat",fontSize:"50px",lineHeight:1.5,letterSpacing:2.95,}}>LOGIN</h1>
          {getFieldDecorator('email', {
            rules: [{
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              { required: true, message: 'Please input your Email!' }],
          })(
            <Input onChange={this.eventHandler} value={this.state.email}name="email"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input.Password onChange={this.eventHandler} value={this.state.password}name="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })}
          
          <Button type="primary" htmlType="submit" className="login-form-button"style={{
    backgroundColor: "rgb(11,235,180)",color:"grey"}} >
            Log in
          </Button>
        </Form.Item>
      </Form>
      </div>
      
      </div>
      </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm
// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);

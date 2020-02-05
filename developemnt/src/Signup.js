import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Redirect} from 'react-router-dom'
import 'antd/dist/antd.css';
import Firebase from './configure/config'
var db=Firebase.firestore();
class NormalSignUpForm extends React.Component {
    state={
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
        check:false,
        redirect:false,
        users:[]
    }
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ check: this.state.check || !!value });
      };
      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
      componentDidMount=()=>{
        let users=[]
        Firebase.firestore().collection("users").get().then((querySnapshot)=>{
            querySnapshot.forEach((i)=>{
                users.push(i.data().email);

            })
        })
        this.setState({users})
    }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let emailCheck=false;
        for(let i=0;i<this.state.users.length;i++){
          if(this.state.email===this.state.users[i]){
            emailCheck=true;
            break;
          }
        }
        if(!emailCheck){
        // console.log("state",this.state)
db.collection("users").add({
    username:this.state.username,
    email:this.state.email,
    password:this.state.password
}).then((res)=>{alert("Account Created")}
)
.catch((err)=>{})
    this.setState({redirect:true})
}else{
  alert("email already exist")
}
}
    });
  };
  eventHandler=(e)=>{
this.setState({[e.target.name]:e.target.value})
  }
redirection=()=>{
  if(this.state.redirect){
    return <Redirect to="/login"></Redirect>
  }
}
  render() {
    const { getFieldDecorator } = this.props.form;
    return (

        <div class="main-bg">
        <div class="box-conatiner">
    {this.redirection()}
      <Form onSubmit={this.handleSubmit} className="login-form" style={{margin:'20px 110px 20px 300px'}}>
        <Form.Item label="User Name">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input onChange={this.eventHandler} value={this.state.username}name="username"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [{
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
                { required: true, message: 'Please input your Email!' }],
          })(
            <Input onChange={this.eventHandler} value={this.state.email}name="email"
              prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        
        <Form.Item label="Password" hasFeedback>
        
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' },
            {
                validator: this.validateToNextPassword,
              }
        ],
          })(
            <Input.Password onChange={this.eventHandler} value={this.state.password}name="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>

        <Form.Item label="Confirm Password" hasFeedback>
        
          {getFieldDecorator('confirmpassword', {
            rules: [{ required: true, message: 'Please Re-Enter your Password!' },
            {
                validator: this.compareToFirstPassword,
              }],
          })(
            <Input.Password onBlur={this.handleConfirmBlur} onChange={this.eventHandler} value={this.state.confirmpassword}name="confirmpassword"
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
    backgroundColor: "rgb(11,235,180)",color:"grey"}}>
            Sign Up
          </Button>
        </Form.Item>
      </Form></div></div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalSignUpForm);
export default WrappedNormalLoginForm
// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);

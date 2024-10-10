import React from 'react';
import { useEffect } from 'react';
import image from '../../assets/firstimage.png';
import icon from '../../assets/icon.png';
import { Button, Checkbox, Form, Input, message } from 'antd';
import {Link, useNavigate} from 'react-router-dom'
import './Login.css';
import { LoginUser } from '../../apicalls/users.js'
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../../Redux/authReducer';






function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish= async (values)=>{
        console.log("values=>",values);
        try{
          const response = await LoginUser(values);
          if(response.success){
            message.success(response.message);
            localStorage.setItem('token', response.data);
            dispatch(setUserEmail(values.email));
            navigate('/');
          }
          else{
            message.error(response.message);
            console.log(response.message)
          }
        }catch(err){
          message.error(err);
        }
      }

      useEffect(() => {
        if (localStorage.getItem("token")) {
          navigate("/"); 
        } 
    
      }, []);
  return (
    <div className='login-container'>
      <div className='left-login-container'>
        <img src={image} alt="login-image" />
      </div>
      <div className='right-login-container'>
        <div className='upperhalf-login'>
          <div className='icon'>
            <img src={icon} alt="icon" />
          </div>
          <div className='welcome-text'>
            <p className='text1'>Welcome to</p>
            <p className='text2'>Ques.AI</p>
          </div>
        </div>
        <div className='login-form'>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            

            <Form.Item>
            <Link to="/register" className='text-black'>
              {" "}
              New ? Register
            </Link>
              <Button type="primary" htmlType="submit" className="input-custom custom-submit-button">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React from 'react';
import { useEffect } from 'react';
import image from '../../assets/firstimage.png';
import icon from '../../assets/icon.png';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './Register.css';
import { RegisterUser } from '../../apicalls/users.js'

import {Link, useNavigate} from "react-router-dom";





function Register() {
    const navigate = useNavigate()
    const onFinish= async (values)=>{
      try{
        const response = await RegisterUser(values);
        if(response.success){
          message.success(response.message);
          navigate("/login");
          console.log(response.message)
        }
        else{
          message.error(response.message);
          console.log(response.message)
        }
      }catch(err){
        message.error(err);
      }
    }
    
  return (
    <div className='register-container'>
      <div className='left-register-container'>
        <img src={image} alt="register-image" />
      </div>
      <div className='right-register-container'>
        <div className='upperhalf-register'>
          <div className='icon'>
            <img src={icon} alt="icon" />
          </div>
          <div className='welcome-text'>
            <p className='text1'>Join</p>
            <p className='text2'>Ques.AI</p>
          </div>
        </div>
        <div className='register-form'>
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder="Name" className="input-custom" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="Email" className="input-custom" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" className="input-custom" />
            </Form.Item>

           

            <Form.Item>
            <Link to="/login" className="text-black">
              {" "}
              Already have an account? Login
            </Link>
              <Button type="primary" htmlType="submit" className="input-custom custom-submit-button">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;

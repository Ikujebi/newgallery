
import {  useState,useEffect } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ayanfe from '../assets/images/ayanfe.png'
import { auth } from '../firebase.utils';
import { message } from 'antd';


const Signin = ({setIsAuthenticated}) => {


  const [loading, setLoading] = useState(false);
  

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const [signInInfo, setsignInInfo] = useState({
    email: '',
    password: '',
  });
 
  //This state holds the error messages and allows the display of it when there issues with the form inputs
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setsignInInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!signInInfo.email) {
      newErrors.email = 'Email is required';
    }
    if (!signInInfo.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  


  const loginHandler = async () => {
    
    if (validateForm()) {
      setLoading(true);
  
      try {
        await auth.signInWithEmailAndPassword(signInInfo.email, signInInfo.password);
        // User successfully signed in with Firebase
        sessionStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        navigate('/gallery');
      } catch (error) {
        // Handle authentication error
        setError('Invalid username or password');
        message.error("Invalid email or password. Please try again.")
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please fill out the required fields.');
    }
  };
  
 
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(isAuthenticated);
  }, []);
  

  return (
    <div className=" grid-cols-2  h-[100svh] home">
      <div className="w-[10rem] mx-[2rem] rounded-[50%] pt-2 flex  gap-5">
        <img className=" rounded-[5rem] w-[6rem]" src={ayanfe} alt="ayanfe" />
        <h1 className=" flex font-bold text-gray-700  m-auto">DRAG n DROP</h1>
      </div>

      <div className="  justify-center m-auto my-[4rem] items-center bg-white w-[25rem]">
        <div className="text-center text-gray-600 mt-[10rem]  text-2xl font-bold">
          <h1>Sign In</h1>
        </div>
        <div className="block justify-center items-center flex-col  h-80 mt-10 ">
          <div className="ml-[1.4rem] xl:w-full lg:w-full md:w-full w-[20.7rem] mx-auto">
          <Form
              layout="vertical"
              onFinish={loginHandler}
              fields={[
                {
                  name: 'email',
                  value: signInInfo.email, // Use signInInfo.email
                },
                {
                  name: 'password',
                  value: signInInfo.password, // Use signInInfo.password
                },
              ]}
            >
              <Row>
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your EmailAddress!",
                      },
                    ]}
                  >
                    <Input
                      onChange={handleInputChange}
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      className="py-3 text-grey-700"
                      
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={handleInputChange}
                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      className="py-3 text-grey-700"
                    />
                  </Form.Item>
                </Col>
                
                <Col span={24}>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    style={{ background: "grey", borderColor: "grey" }}
                    className="bg-gray-200 text-white hover:!bg-bl-400 flex items-center justify-center py-5"
                    block
                    
                  >
                    Sign In
                  </Button>
                </Col>
                <Link to={'/create'} className="text-sm font-normal mb-2 pl-[1rem] text-gray-500">
                  <h6>create user</h6>
                </Link>
              </Row>
              
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;


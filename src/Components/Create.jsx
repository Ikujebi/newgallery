
import {  useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ayanfe from '../assets/images/ayanfe.png'
import { auth } from '../firebase';


const Create = ({setIsAuthenticated}) => {


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
    } else if (!/^\S+@\S+\.\S+$/.test(signInInfo.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!signInInfo.password) {
      newErrors.password = 'Password is required';
    } else if (signInInfo.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createUser = async () => {
    try {
      const { email, password } = signInInfo;

      if (validateForm()) {
        setLoading(true);

        // Create a new user with Firebase Authentication
        await auth.createUserWithEmailAndPassword(email, password);

        // User creation successful
        alert('User created successfully');
        setIsAuthenticated(true); // Set authentication state
        navigate('/gallery'); // Redirect to the protected route
      }
    } catch (error) {
      // Handle any errors that occur during user creation
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'Email address is already in use.' });
      } else if (error.code === 'auth/invalid-email') {
        setErrors({ email: 'Invalid email address.' });
      } else if (error.code === 'auth/weak-password') {
        setErrors({ password: 'Password is too weak.' });
      } else {
        setErrors({ email: 'An error occurred while creating the user.' });
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className=" grid-cols-2  h-[100svh]">
      <div className="w-[10rem] mx-[2rem] rounded-[50%]">
        <img className=" rounded-[5rem]" src={ayanfe} alt="ayanfe" />
      </div>

      <div className="  justify-center m-auto my-[4rem] items-center bg-white w-[25rem]">
        <div className="text-center mt-[10rem]  text-2xl font-bold">
          <h1>Create An Account</h1>
        </div>
        <div className="block justify-center items-center flex-col  h-80 mt-10 ">
          <div className="ml-[1.4rem]">
          <Form
              layout="vertical"
              onFinish={createUser}
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
                      className="py-3"
                      
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
                      className="py-3"
                    />
                  </Form.Item>
                </Col>
                
                <Col span={24}>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    className="bg-[#134c98] flex items-center justify-center py-5"
                    block
                  >
                    Sign Up
                  </Button>
                </Col>
                <Link to={'/'} className="text-sm font-normal mb-2 pl-[1rem] text-[#75C2F6]">
                  <h6>LogIn</h6>
                </Link>
              </Row>
              
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;


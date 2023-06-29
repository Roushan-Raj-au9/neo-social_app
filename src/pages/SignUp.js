import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const { loginUser, loading, register } = useContext(authContext)
    const [user, setuser] = useState({
        email: 'jhon@gmail.com',
        password: 'jhon',
        confirmPassword: 'jhon',
        firstName: 'John',
        lastName: 'Doe'
    })
    const [passwordShown, setPasswordShown] = useState(false);
    const [cpasswordShown, setCPasswordShown] = useState(false);
    const { email, password, confirmPassword, firstName, lastName } = user;
    useEffect(() => {
        if(userInfo && userInfo?.token){
            navigate('/home')
        }
        //eslint-disable-next-line
    }, [])
    const handleChange = (e) => {
        setuser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if(user.password !== user.confirmPassword){
            return toast.error('Password Mismatch.', {
                position: "bottom-right",
                closeOnClick: true,
            });
        }
        else if (user.email && user.password && user.firstName && user.lastName) {
            register(user)
        } else {
            toast.error('Credentials Required', {
                position: "bottom-right",
                closeOnClick: true,
            });
        }
    }
    if (loginUser?.encodedToken) {
        navigate('/home')
    }
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const ctogglePassword = () => {
        setCPasswordShown(!cpasswordShown);
    };
    return (
        <Container>
            <Row className='justify-content-md-center align-items-center vh-100'>
                <Col xs={12} md={4} className='form_auth'>
                    <h3 className='text-center'>Sign Up</h3>
                    <Form onSubmit={submitHandler} >
                        <Form.Group controlId='firstName' className='mb-2'>
                            <Form.Label> First Name </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                name="firstName"
                                value={firstName}
                                onChange={handleChange}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='lastName' className='mb-2'>
                            <Form.Label> Last Name </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                name="lastName"
                                value={lastName}
                                onChange={handleChange}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email' className='mb-2'>
                            <Form.Label> Email Address </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password' className='mb-2'>
                            <Form.Label> Password </Form.Label>
                            <Form.Control
                                type={passwordShown ? "text" : "password"}
                                placeholder="Enter password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className='pwd_wrp'
                            >
                            </Form.Control>
                            <span className= "password-show" onClick={togglePassword} >
                                {passwordShown ?  <i class="fa fa-eye" aria-hidden="true"></i> :  <i class="fa fa-eye-slash" aria-hidden="true"></i>}
                            </span>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword' className='mb-2'>
                            <Form.Label> Confirm Password </Form.Label>
                            <Form.Control
                                type={cpasswordShown ? "text" : "password"}
                                placeholder="Enter confirm password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                                className='cnfrm_pwd'
                            >
                            </Form.Control>
                            <span className= "cpassword-show" onClick={ctogglePassword} >
                                {cpasswordShown ?  <i class="fa fa-eye" aria-hidden="true"></i> :  <i class="fa fa-eye-slash" aria-hidden="true"></i>}
                            </span>
                        </Form.Group> 

                        <Button type='submit' disabled={loading} variant='primary' className='my-2 btn-dark' >
                            {loading ? <Spinner />:'Sign Up'}
                        </Button>

                    </Form>

                    <Row className='py-3' >
                        <Col>
                            Existing User ? <Link to='/' className='text-decoration-underline'> SingIn </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

    )
}

export default SignUp;
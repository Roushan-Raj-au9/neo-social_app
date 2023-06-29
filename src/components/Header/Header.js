import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate()
  return (
    <>
    <Container> 
      <Navbar expand="lg" variant="light" >
        <Container>
          <Navbar.Brand><Link to='/' className='text-decoration-none text-dark fs-2'><span className='title-start'>Go</span>Social</Link></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className='dot-three' onClick={() => {
              localStorage.clear();
              navigate('/')
            }}>
              Logout
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
    </>
  )
}

export default Header
import React from 'react'
import Header from '../components/Header/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar/Sidebar'
import Rightbar from '../components/Rightbar/Rightbar'
import User from '../components/User/User'

const UserPage = () => {
  return (
    <>
    <Header />
    <Container fluid className='home_container'>
        <Container  className='pt-4'>
            <Row>
                <Col sm={2}>
                    <Sidebar />
                </Col>
                <Col sm={6}>
                    <User />
                </Col>
                <Col sm={4}>
                    <Rightbar />
                </Col>
            </Row>
        </Container>

    </Container>
    </>
  )
}

export default UserPage
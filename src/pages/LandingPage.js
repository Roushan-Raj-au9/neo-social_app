import React from 'react'
import Header from '../components/Header/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar/Sidebar'
import Feed from '../components/Feed/Feed'
import Rightbar from '../components/Rightbar/Rightbar'

const LandingPage = () => {
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
                    <Feed />
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

export default LandingPage
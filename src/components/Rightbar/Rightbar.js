import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Search from '../Searchbox/Search'
import FollowSection from '../FollowSection/FollowSection'

const Rightbar = () => {
  return (
    <>
    <Row className='ps-5'>
      <Col>
        <Search />
      </Col>
    </Row>
    <Row className='ps-5 mt-4'>
      <Col>
        <FollowSection />
      </Col>
    </Row>
    </>
  )
}

export default Rightbar
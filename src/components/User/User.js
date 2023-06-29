import React, { useContext, useEffect, useState } from 'react';
import authContext from '../../context/auth/authContext';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import img1 from '../../assets/image/img1.jpg'
import img2 from '../../assets/image/img2.jpg'
import img3 from '../../assets/image/img3.jpg'
import img4 from '../../assets/image/img4.jpg'
import img5 from '../../assets/image/img5.jpg'
import img6 from '../../assets/image/img6.jpg'
import img7 from '../../assets/image/img7.jpg'
import img8 from '../../assets/image/img8.jpg'
import './User.css'

const User = () => {
  const { profile, getProfile, updateProfile } = useContext(authContext);
  let { id } = useParams();
  const avatar = JSON.parse(localStorage.getItem('avatar'))
  const [bio, setBio] = useState(profile?.bio ? profile.bio : "");
  const [url, setUrl] = useState(profile?.url ? profile.url : "");
  const [show, setShow] = useState(false);
  const [showAvatar, setShowAvatar] = useState(avatar ? avatar : img5)
  useEffect(() => {
    getProfile(id)
    //eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = {
      username: profile?.username,
      bio,
      url
    }
    updateProfile(userData)
  }
  const handleAvatar = (image) => {
    setShowAvatar(image)  
    setShow(false)
    localStorage.setItem('avatar', JSON.stringify(image))
  } 
  return (
    <>
      <div>
        <h4>Profile</h4>
        <p>Update your photo and personal details here.</p>
        <div className='mb-4'>
          <div className='me-2 user-img'><img className='user-img' src={showAvatar} alt='user' /></div>
          <span className='mt-2 avatar-edit' onClick={() => setShow(true)}>Edit Avatar</span>
        </div>
        <Form className="profile-form" onSubmit={handleSubmit}>
          <Row className='d-flex flex-column'>
            <Form.Group
              className="mb-4"
              as={Col}
              md="9"
              controlId="bio"
            >
              <Form.Label>Bio</Form.Label>
              <Form.Control
                name="bio"
                type="text"
                placeholder="Add Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-4"
              as={Col}
              md="9"
              controlId="url"
            >
              <Form.Label>Portfolio Url</Form.Label>
              <Form.Control
                name="url"
                type="text"
                placeholder="Add Portfolio Url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-2" as={Col} md="6">
              <Button className="post-btn" style={{ padding: '5px 10px' }} type="submit">
                Save Changes
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          Choose an Avatar
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className='d-flex flex-wrap'>
              <div className='me-2 mb-4 users-img' onClick={() => handleAvatar(img1)}><img src={img1} className='users-img' alt='profile' /></div>
              <div className='me-2 mb-4 users-img' onClick={() => handleAvatar(img2)}><img src={img2} className='users-img' alt='profile' /></div>
              <div className='me-2 mb-4 users-img' onClick={() => handleAvatar(img3)}><img src={img3} className='users-img' alt='profile' /></div>
              <div className='me-2 mb-4 users-img' onClick={() => handleAvatar(img4)}><img src={img4} className='users-img' alt='profile' /></div>
              <div className='me-2 mb-4 users-img' onClick={() => handleAvatar(img5)}><img src={img5} className='users-img' alt='profile' /></div>
              <div className='me-2 mb-4 users-img' onClick={() => handleAvatar(img6)}><img src={img6} className='users-img' alt='profile' /></div>
              <div className='me-2 mb-4 users-img' onClick={() => handleAvatar(img7)}><img src={img7} className='users-img' alt='profile' /></div>
              <div className='me-2 mb-4 users-img' onClick={() => handleAvatar(img8)}><img src={img8} className='users-img' alt='profile' /></div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default User
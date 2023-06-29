import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BsRocket, BsBookmark } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import './Sidebar.css';
import postContext from '../../context/post/postContext';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const Sidebar = () => {
    const [show, setShow] = useState(false);
    const [newPost, setNewPost] = useState('');
    const { loading, createPost } = useContext(postContext)
    const { getAllUsers } = useContext(authContext)
    const userID = JSON.parse(localStorage.getItem('user'))?.id
    const navigate = useNavigate()
    const menus = [
        {
            name: 'Home',
            icon: <BiHomeAlt2 />
        },
        {
            name: 'Explore',
            icon: <BsRocket />
        },
        {
            name: 'Bookmark',
            icon: <BsBookmark />
        },
        {
            name: 'Profile',
            icon: <CgProfile />
        },
    ]
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const submitHandler = (e) => {
        e.preventDefault();
        if(!newPost){
            return toast.error('Post Content Is Required.', {
                position: "bottom-right",
                closeOnClick: true,
            });
        }
        createPost(newPost)
        setShow(false)
        setNewPost('')
    }
    useEffect(() => {
        getAllUsers()
        //eslint-disable-next-line
    }, [])
    return (
        <>
            <Row>
                <Col className='d-flex flex-column'>
                    {menus.map(({ name, icon }, i) => <div key={i} className='mb-2 d-flex align-items-center dot-three' onClick={() => {
                        if(name === 'Bookmark') {
                            navigate('/bookmark');
                        }
                        if(name === 'Home') {
                            navigate('/');
                        }
                        if(name === 'Profile') {
                            navigate(`/user/${userID}`);
                        }
                    }}><p className='me-3'>{icon}</p><p>{name}</p></div>)}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className='post-btn' onClick={handleShow}>Create New Post</Button>
                </Col>
            </Row>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group controlId='firstName' className='mb-2'>
                                    <Form.Label> Create New Post </Form.Label>
                                    <Form.Control as="textarea"
                                        name="post"
                                        aria-rowspan={10}
                                        rows="10"
                                        value={newPost}
                                        style={{ height: '100px' }}
                                        onChange={(e) => setNewPost(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    {
                        !loading &&
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    }
                    {
                        loading ?
                        <Spinner />:
                        <Button variant="primary" className='create-btn' onClick={submitHandler}>Create</Button>
                    }
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default Sidebar
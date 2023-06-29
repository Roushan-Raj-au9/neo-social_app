import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row, Spinner } from 'react-bootstrap'
import { BsSliders2Vertical, BsHeart, BsFillHeartFill, BsBookmarkFill, BsThreeDots, BsBookmark } from 'react-icons/bs'
import { GoComment } from 'react-icons/go'
import './Feed.css';
//eslint-disable-next-line
import img1 from '../../assets/image/img1.jpg'
//eslint-disable-next-line
import img2 from '../../assets/image/img2.jpg'
//eslint-disable-next-line
import img3 from '../../assets/image/img3.jpg'
//eslint-disable-next-line
import img4 from '../../assets/image/img4.jpg'
//eslint-disable-next-line
import img5 from '../../assets/image/img5.jpg'
//eslint-disable-next-line
import img6 from '../../assets/image/img6.jpg'
//eslint-disable-next-line
import img7 from '../../assets/image/img7.jpg'
//eslint-disable-next-line
import img8 from '../../assets/image/img8.jpg'
import postContext from '../../context/post/postContext';
import { toast } from "react-toastify";

const Feed = () => {
    const {loading, getPosts, updatePost, deletePost, likePost, dislikePost, addToBookmark, removeFromBookmark, posts: allPosts, bookmarks} = useContext(postContext)
    const [posts, setPosts] = useState(allPosts ? allPosts : [])
    const [postType, setPostType] = useState("Latest")
    const [newPost, setNewPost] = useState('');
    const [clickedPostId, setClickedPostId] = useState('')
    const [show, setShow] = useState(false);
    const [bookmark, setBookmark] = useState([]);
    const userName = JSON.parse(localStorage.getItem('user'))?.username
    const userID = JSON.parse(localStorage.getItem('user'))?.id
    const avatar = JSON.parse(localStorage.getItem('avatar'))
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        //eslint-disable-next-line
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            style={{ textDecoration: "none" }}
        >
            <BsThreeDots className='dot-three' />
            {children}
        </a>
    ));
    const CustomToggle2 = React.forwardRef(({ children, onClick }, ref) => (
        //eslint-disable-next-line
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            style={{ textDecoration: "none" }}
        >
            <BsSliders2Vertical className='fs-5' />
            {children}
        </a>
    ));
    const handleClose = () => setShow(false);
    const submitHandler = (e) => {
        e.preventDefault();
        if(!newPost){
            return toast.error('Post Content Is Required.', {
                position: "bottom-right",
                closeOnClick: true,
            });
        }
        updatePost(newPost, clickedPostId)
        setShow(false)
        setNewPost('')
    }
    useEffect(() => {
        // fetchData()
        getPosts()
        //eslint-disable-next-line
    }, [])
    useEffect(() => {
        if(allPosts && allPosts?.length > 0) {
            const data = [...allPosts]
            data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            setPosts(data)

        }
    }, [allPosts, allPosts?.length, loading])
    useEffect(() => {
        let bookmarksId = bookmarks && bookmarks.length > 0 && bookmarks.map(({_id}) => _id)
        setBookmark(bookmarksId)
    }, [bookmarks, bookmarks?.length])
    const handleTrending = () => {
        const allPosts = [...posts]
        const trending = allPosts.sort((a, b) => b.likes.likeCount - a.likes.likeCount) 
        setPosts(trending)
        setPostType("Trending")
    }
    const handleLatest = () => {
        const allPosts = [...posts]
        const latest = allPosts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        setPosts(latest)
        setPostType("Latest")
    }
    const handleOldest = () => {
        const allPosts = [...posts]
        const latest = allPosts.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
        setPosts(latest)
        setPostType("Old")
    }
    if(loading){
        return <div className='d-flex justify-content-center'><Spinner /></div>
    }
    return (
        <>
            <Row>
                <Col className='d-flex justify-content-between align-items-center mb-3'>
                    <h3 className='fs-4 lh-1 fw-bold'>{postType} Posts</h3>
                    
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle2} id="dropdown-custom-components">
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="1" onClick={handleTrending}>Trending</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={handleLatest}>Latest</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={handleOldest}>Old</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <div className='d-flex flex-column posts'>
                {
                    posts?.length > 0 && posts.map((post) => (
                        <div className='mb-4' key={post.id}>
                            <div className='d-flex feed-container'>
                                <div className='me-2 user-img'><img className='user-img' src={(userName === post.username && avatar) ? avatar : img5} alt='user' /></div>
                                <div className='w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div><strong className='fs-5'>{post.username}</strong></div>
                                        { userName === post.username &&
                                            <div>
                                                <Dropdown>
                                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="1" onClick={() => {
                                                            setNewPost(post.content)
                                                            setClickedPostId(post._id)
                                                            setShow(true)
                                                        }}>Edit</Dropdown.Item>
                                                        <Dropdown.Item eventKey="2" onClick={() => {
                                                            deletePost(post._id)
                                                        }}>Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>

                                        }
                                    </div>
                                    <p>{post.content}</p>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        {
                                            post.likes.likedBy.includes(userID) ?
                                            <BsFillHeartFill className='fs-6 dot-three' onClick={() => {
                                                dislikePost(post._id)
                                            }}/>:
                                            <BsHeart className='fs-6 dot-three' onClick={() => {
                                                likePost(post._id)
                                            }}/>
                                        }
                                         {/* <BsHeart className='fs-6' /> */}
                                        <GoComment className='fs-6' />
                                        {
                                            bookmark && bookmark?.length > 0 && bookmark?.includes(post._id) ?  
                                            <BsBookmarkFill className='fs-6 dot-three' onClick={() => {
                                                removeFromBookmark(post._id)
                                            }}/> :
                                            <BsBookmark className='fs-6 dot-three' onClick={() => {
                                                addToBookmark(post._id)
                                            }}/> 
                                           
                                        }         
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div >
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
                        <Button variant="primary" className='create-btn' onClick={submitHandler}>Update</Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Feed
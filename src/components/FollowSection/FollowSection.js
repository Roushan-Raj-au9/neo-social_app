import React, { useContext, useEffect, useState } from 'react';
import './FollowSection.css';
import authContext from '../../context/auth/authContext';
import img5 from '../../assets/image/img5.jpg'

const FollowSection = () => {
    const [followUserData, setFollowUserData] = useState([])
    const { users, followUsers, unfollowUsers, followUser } = useContext(authContext);
    const userID = JSON.parse(localStorage.getItem('user'))?.id
    useEffect(() => {
        let result = followUser?.following?.length > 0 && followUser?.following?.map(({_id}) => _id) 
        setFollowUserData(result)
        //eslint-disable-next-line
    }, [followUser?.following?.length])
  return (
    <div className='follow-container'>
        <h5 className='fw-bold follow-title '>Who to Follow?</h5>
        <hr />
        {
            users && users.length > 0 && users.map(({_id, firstName, email}) => {
                if(_id !== userID){
                    return <div key={_id} className='d-flex justify-content-between align-items-center mb-4'>
                        <div className='d-flex'>
                            <div className='me-4 user-img'><img className='user-img' src={img5} alt='user'/></div>
                            <div>
                                <strong className='m-0 p-0 fs-5'>{firstName}</strong>
                                <small className='d-block user-mail fs-6'>{email}</small>
                            </div>

                        </div>
                        <div className='flex-end'>
                            {
                                followUserData?.length > 0 && followUserData?.includes(_id) ? 
                                <span className='fw-bold follow' onClick={() => {
                                    unfollowUsers(_id)
                                }}>Unfollow </span>:
                                <span className='fw-bold follow' onClick={() => {
                                    followUsers(_id)
                                }}>Follow </span>
                            }
                        </div>
                    </div>
                }
                return false
            })
        }
    </div>
  )
}

export default FollowSection
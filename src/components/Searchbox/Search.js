import React, { useContext, useEffect, useState } from 'react';
import './Search.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import authContext from '../../context/auth/authContext';

const Search = () => {
  const [userValue, setUserValue] = useState();
  const { getAllUsers, users, searchedUser } = useContext(authContext);
  useEffect(() => {
    getAllUsers()
    //eslint-disable-next-line
  }, [])
  useEffect(() => {
    let debounceTimer = setTimeout(() => {
      let allusers = [...users]
      let filteredUser = userValue ? allusers && allusers.length > 0 && allusers.filter(({firstName, username}) => firstName?.toLowerCase().includes(userValue?.toLowerCase()) || username.toLowerCase().includes(userValue.toLowerCase())) : getAllUsers()
      searchedUser(filteredUser)
    }, 300)

    return () => clearTimeout(debounceTimer)
    //eslint-disable-next-line
  }, [userValue])
  return (
    <div className='position-relative search-container'>
        <BiSearchAlt2 className='position-absolute search-icon fs-5'/>
        <input type="search" value={userValue} onChange={(e) => setUserValue(e.target.value)} className='search-input'/>
    </div>
  )
}

export default Search
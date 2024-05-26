import React, { useEffect } from 'react'
import { showContact } from '../features/userDetails'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {deleteUser} from '../features/userDetails'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function ViewData() {
    const dispatch = useDispatch()
    const {users,loading } =useSelector((state) => state.app)
    useEffect(() => {
       
        dispatch(showContact())
    }, )
    if(loading){
        return <h1> Loading...Contacts</h1>
    }
   
    if (!users || users.length === 0) {
        return <h1>No Contacts. Please add some.</h1>;
    }
  return (
    <div className='container'>
    <h1>My Contacts</h1>
    <div className='cards'>
      {users &&
        users.map((ele) => (
          <div className='card' key={ele.id}>
            <div className='card-content'>
              <h2>{ele.name}</h2>
              <p>{ele.email}</p>
              <p>{ele.number}</p>
              <div className='card-actions'>
                <Link to={`/update/${ele.id}`}>
                  <button className='edit-btn'><EditIcon /></button>
                </Link>
                <button className='delete-btn' onClick={() => dispatch(deleteUser(ele.id))}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
    

    
  )
}

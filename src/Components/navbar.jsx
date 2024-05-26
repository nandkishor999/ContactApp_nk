import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { users } = useSelector((state) => state.app);
  return (
    <div className='nav'>
      <Link to="/" >
        <button className='a'>Create New Contact</button>
      </Link>
      <Link to="/view" className='tc'>
        <button className='a' id='kk'>View Contact {users&&
       <span>({users.length}) </span> 
      
}   </button>
            
      </Link>
 
<Link to="/charts" >
        <button className='a'>Charts and Map</button>
      </Link>
       </div>
  );
}

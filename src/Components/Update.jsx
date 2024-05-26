import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
 // Ensure correct import path
import { updateUser  } from '../features/userDetails'

export default function Update() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dat, setDat] = useState({ name: '', email: '', number: '' });
    const {users} =useSelector((state) => state.app) // Ensure correct slice
  

    useEffect(() => {
        if (id) {
            const single = users.filter((ele) => ele.id === id);
            if (single) {
                setDat(single[0]);
            }
        }
    }, [id,users]);
    console.log(dat)
    console.log(typeof(dat))
    const updateData = (e) => {
        setDat({ ...dat, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(dat));
        navigate("/view");
    };
    
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (!users.length) {
    //     return <div>No users found</div>;
    // }
    return (
        <div className='updatetab'>
            <h2>Update Contact</h2>
            <form className='uform' onSubmit={handleSubmit}>
                <label> Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={dat&& dat.name}
                    required
                    onChange={updateData}
                />
                <label> Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={dat&&dat.email}
                    required
                    onChange={updateData}
                />
                <label> Phone</label>
                <input
                    type="number"
                    name="number"
                    placeholder="Enter Phone"
                    value={dat &&dat.number}
                    required
                    onChange={updateData}
                />
                <button type="submit">Update Contact</button>
            </form>
        </div>
    );
}

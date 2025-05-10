import axios from 'axios'
import React, { useState, useEffect } from 'react';

const DeletePage = () => {
    const [name, setName] = useState('');
    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await axios.delete(`http://localhost:5000/api/missiles/${name}`);
        console.log(response.data);
    }

    const handleDeleteAll = async (e) => {
        e.preventDefault();
        // send the name in body
        axios.delete(`http://localhost:5000/api/missiles/many`, {
            data: {
                name: name
            }
        }).then((res) => {
            console.log(res.data);
        })
    }
    return (<>
    <div>DeletePage</div>
    <form>
        <input type="text" placeholder='Enter missile name' onChange={(e) => setName(e.target.value)} />
        <button type='submit' onClick={(e) => handleDelete(e)}>Delete</button>
        <button type='submit' onClick={(e) => handleDeleteAll(e)}> Delete All</button>
    </form>
    </>
  )
}

import axios from 'axios'
import React, { useState } from 'react';

const DeletePage = () => {
    const [name, setName] = useState('');
    const handleDelete = async (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:3000/missile/${name}`).then((res) => {
            console.log(res.data);
            alert("Deleted successfully");
        }).catch((err) => {
            console.log("error while deleting one");
        })
    }

    const handleDeleteAll = async (e) => {
        e.preventDefault();
        // send the name in body
        axios.delete(`http://localhost:3000/missile/many`, {
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

export default DeletePage;

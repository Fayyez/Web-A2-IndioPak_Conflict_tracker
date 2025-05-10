import React, { useState } from 'react';
import axios from 'axios';

const UpdatePage = () => {
    const [updateData, setUpdateData] = useState({
        name: '',
        newname: '',
        range: 'short',
        payload: 0,
        countryname: ''
    });
    const [updateManyData, setUpdateManyData] = useState({
        name: '',
        range: 'short',
        payload: 0,
        countryname: ''
    });
    const [findAndUpdateData, setFindAndUpdateData] = useState({
        name: '',
        newname: '',
        range: 'short',
        payload: 0,
        countryname: ''
    });
    const [message, setMessage] = useState('');

    // Update one missile
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/missile/${updateData.name}`, {
                newname: updateData.newname,
                range: updateData.range,
                payload: updateData.payload,
                countryname: updateData.countryname
            });
            setMessage('Missile updated successfully');
            setUpdateData({ name: '', newname: '', range: 'short', payload: 0, countryname: '' });
        } catch (error) {
            setMessage('Error updating missile: ' + error.message);
        }
    };

    // Update many missiles
    const handleUpdateMany = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('http://localhost:3000/missile/many', updateManyData);
            setMessage('Multiple missiles updated successfully');
            setUpdateManyData({ name: '', range: 'short', payload: 0, countryname: '' });
        } catch (error) {
            setMessage('Error updating missiles: ' + error.message);
        }
    };

    // Find and update missile
    const handleFindAndUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/missile/findand/${findAndUpdateData.name}`, {
                name: findAndUpdateData.newname,
                range: findAndUpdateData.range,
                payload: findAndUpdateData.payload,
                countryname: findAndUpdateData.countryname
            });
            setMessage('Missile found and updated successfully');
            setFindAndUpdateData({ name: '', newname: '', range: 'short', payload: 0, countryname: '' });
        } catch (error) {
            setMessage('Error finding and updating missile: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Update Missiles</h2>
            {message && <div>{message}</div>}

            {/* Update One Form */}
            <div>
                <h3>Update One Missile</h3>
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        placeholder="Current Missile Name"
                        value={updateData.name}
                        onChange={(e) => setUpdateData({...updateData, name: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="New Missile Name"
                        value={updateData.newname}
                        onChange={(e) => setUpdateData({...updateData, newname: e.target.value})}
                    />
                    <select
                        value={updateData.range}
                        onChange={(e) => setUpdateData({...updateData, range: e.target.value})}
                    >
                        <option value="short">Short Range</option>
                        <option value="medium">Medium Range</option>
                        <option value="long">Long Range</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Payload"
                        value={updateData.payload}
                        onChange={(e) => setUpdateData({...updateData, payload: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Country Name"
                        value={updateData.countryname}
                        onChange={(e) => setUpdateData({...updateData, countryname: e.target.value})}
                    />
                    <button type="submit">Update One</button>
                </form>
            </div>

            {/* Update Many Form */}
            <div>
                <h3>Update Many Missiles</h3>
                <form onSubmit={handleUpdateMany}>
                    <input
                        type="text"
                        placeholder="Missile Name Pattern"
                        value={updateManyData.name}
                        onChange={(e) => setUpdateManyData({...updateManyData, name: e.target.value})}
                        required
                    />
                    <select
                        value={updateManyData.range}
                        onChange={(e) => setUpdateManyData({...updateManyData, range: e.target.value})}
                    >
                        <option value="short">Short Range</option>
                        <option value="medium">Medium Range</option>
                        <option value="long">Long Range</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Payload"
                        value={updateManyData.payload}
                        onChange={(e) => setUpdateManyData({...updateManyData, payload: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Country Name"
                        value={updateManyData.countryname}
                        onChange={(e) => setUpdateManyData({...updateManyData, countryname: e.target.value})}
                    />
                    <button type="submit">Update Many</button>
                </form>
            </div>

            {/* Find and Update Form */}
            <div>
                <h3>Find and Update Missile</h3>
                <form onSubmit={handleFindAndUpdate}>
                    <input
                        type="text"
                        placeholder="Current Missile Name"
                        value={findAndUpdateData.name}
                        onChange={(e) => setFindAndUpdateData({...findAndUpdateData, name: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="New Missile Name"
                        value={findAndUpdateData.newname}
                        onChange={(e) => setFindAndUpdateData({...findAndUpdateData, newname: e.target.value})}
                    />
                    <select
                        value={findAndUpdateData.range}
                        onChange={(e) => setFindAndUpdateData({...findAndUpdateData, range: e.target.value})}
                    >
                        <option value="short">Short Range</option>
                        <option value="medium">Medium Range</option>
                        <option value="long">Long Range</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Payload"
                        value={findAndUpdateData.payload}
                        onChange={(e) => setFindAndUpdateData({...findAndUpdateData, payload: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Country Name"
                        value={findAndUpdateData.countryname}
                        onChange={(e) => setFindAndUpdateData({...findAndUpdateData, countryname: e.target.value})}
                    />
                    <button type="submit">Find and Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePage; 
import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const PutPage = () => {
    const [replaceData, setReplaceData] = useState({
        name: '',
        newname: '',
        range: 'short',
        payload: 0,
        countryname: ''
    });
    const [findAndReplaceData, setFindAndReplaceData] = useState({
        name: '',
        newname: '',
        range: 'short',
        payload: 0,
        countryname: ''
    });
    const [message, setMessage] = useState('');

    // Replace one missile
    const handleReplace = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`missile/replace/${replaceData.name}`, replaceData);
            setMessage('Missile replaced successfully');
            setReplaceData({ name: '', newname: '', range: 'short', payload: 0, countryname: '' });
        } catch (error) {
            setMessage('Error replacing missile: ' + error.message);
        }
    };

    // Find and replace missile
    const handleFindAndReplace = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`missile/findand/${findAndReplaceData.name}`, findAndReplaceData);
            setMessage('Missile found and replaced successfully');
            setFindAndReplaceData({ name: '', newname: '', range: 'short', payload: 0, countryname: '' });
        } catch (error) {
            setMessage('Error finding and replacing missile: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Replace Missiles</h2>
            {message && <div>{message}</div>}

            {/* Replace One Form */}
            <div>
                <h3>Replace One Missile</h3>
                <form onSubmit={handleReplace}>
                    <input
                        type="text"
                        placeholder="Current Missile Name"
                        value={replaceData.name}
                        onChange={(e) => setReplaceData({...replaceData, name: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="New Missile Name"
                        value={replaceData.newname}
                        onChange={(e) => setReplaceData({...replaceData, newname: e.target.value})}
                        required
                    />
                    <select
                        value={replaceData.range}
                        onChange={(e) => setReplaceData({...replaceData, range: e.target.value})}
                        required
                    >
                        <option value="short">Short Range</option>
                        <option value="medium">Medium Range</option>
                        <option value="long">Long Range</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Payload"
                        value={replaceData.payload}
                        onChange={(e) => setReplaceData({...replaceData, payload: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Country Name"
                        value={replaceData.countryname}
                        onChange={(e) => setReplaceData({...replaceData, countryname: e.target.value})}
                        required
                    />
                    <button type="submit">Replace One</button>
                </form>
            </div>

            <div>
                <h3>Find and Replace Missile</h3>
                <form onSubmit={handleFindAndReplace}>
                    <input
                        type="text"
                        placeholder="Current Missile Name"
                        value={findAndReplaceData.name}
                        onChange={(e) => setFindAndReplaceData({...findAndReplaceData, name: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="New Missile Name"
                        value={findAndReplaceData.newname}
                        onChange={(e) => setFindAndReplaceData({...findAndReplaceData, newname: e.target.value})}
                        required
                    />
                    <select
                        value={findAndReplaceData.range}
                        onChange={(e) => setFindAndReplaceData({...findAndReplaceData, range: e.target.value})}
                        required
                    >
                        <option value="short">Short Range</option>
                        <option value="medium">Medium Range</option>
                        <option value="long">Long Range</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Payload"
                        value={findAndReplaceData.payload}
                        onChange={(e) => setFindAndReplaceData({...findAndReplaceData, payload: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Country Name"
                        value={findAndReplaceData.countryname}
                        onChange={(e) => setFindAndReplaceData({...findAndReplaceData, countryname: e.target.value})}
                        required
                    />
                    <button type="submit">Find and Replace</button>
                </form>
            </div>
        </div>
    );
};

export default PutPage;
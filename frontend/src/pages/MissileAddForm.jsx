import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MissileAddForm = ({ onSuccess }) => {
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        range: 'short',
        payload: 0,
        countryname: ''
    });

    // Fetch countries for dropdown
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:3000/country');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/missile', formData);
            setFormData({ name: '', range: 'short', payload: 0, countryname: '' });
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error adding missile:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Missile Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
            />
            <select
                value={formData.range}
                onChange={(e) => setFormData({...formData, range: e.target.value})}
                required
            >
                <option value="short">Short Range</option>
                <option value="medium">Medium Range</option>
                <option value="long">Long Range</option>
            </select>
            <input
                type="number"
                placeholder="Payload"
                value={formData.payload}
                onChange={(e) => setFormData({...formData, payload: e.target.value})}
                required
            />
            <select
                value={formData.countryname}
                onChange={(e) => setFormData({...formData, countryname: e.target.value})}
                required
            >
                <option value="">Select Country</option>
                {countries.map(country => (
                    <option key={country._id} value={country.name}>
                        {country.name}
                    </option>
                ))}
            </select>
            <button type="submit">Add Missile</button>
        </form>
    );
};

export default MissileAddForm;
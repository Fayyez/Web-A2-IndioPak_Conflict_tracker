import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IndexPage = () => {
    const [indexes, setIndexes] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch all indexes on component mount
    useEffect(() => {
        fetchIndexes();
    }, []);

    // Get all indexes
    const fetchIndexes = async () => {
        try {
            setError('');
            setMessage('');
            const response = await axios.get('http://localhost:3000/missile/index');
            console.log("Fetched indexes:", response.data);
            setIndexes(Object.keys(response.data));
        } catch (error) {
            setError('Error fetching indexes: ' + (error.response?.data?.error || error.message));
        }
    };

    // Create range index
    const handleCreateIndex = async () => {
        try {
            setError('');
            const response = await axios.post('http://localhost:3000/missile/index');
            setMessage(response.data.message || 'Range index created successfully');
            fetchIndexes();
        } catch (error) {
            setError('Error creating index: ' + (error.response?.data?.error || error.message));
        }
    };

    // Delete range index
    const handleDeleteIndex = async () => {
        try {
            setError('');
            const response = await axios.delete('http://localhost:3000/missile/index');
            setMessage(response.data.message || 'Range index deleted successfully');
            fetchIndexes();
        } catch (error) {
            setError('Error deleting index: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div>
            <h2>Manage Indexes</h2>
            {message && <div style={{ color: 'green' }}>{message}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div>
                <h3>Index Operations</h3>
                <button onClick={handleCreateIndex}>Create Range Index</button>
                <button onClick={handleDeleteIndex}>Delete Range Index</button>
                <button onClick={fetchIndexes}>GET Indexes</button>
            </div>

            <div>
                <h3>Existing Indexes</h3>
                {indexes.length > 0 ? (
                    <ul>
                        {indexes.map((index, i) => (
                            <li key={i}>
                                {index}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No indexes found</p>
                )}
            </div>
        </div>
    );
};

export default IndexPage;

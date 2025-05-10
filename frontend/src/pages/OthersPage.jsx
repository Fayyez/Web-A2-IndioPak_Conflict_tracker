// this page uses the rename and aggregate endpoint
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OthersPage = () => {
    const [aggregateData, setAggregateData] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch aggregate data on component mount
    useEffect(() => {
        fetchAggregateData();
    }, []);

    // Get aggregate data by range
    const fetchAggregateData = async () => {
        try {
            setError('');
            const response = await axios.get('http://localhost:3000/missile/aggregate');
            setAggregateData(response.data);
        } catch (error) {
            setError('Error fetching aggregate data: ' + (error.response?.data?.error || error.message));
            setAggregateData([]);
        }
    };

    // Rename collection
    const handleRename = async () => {
        try {
            setError('');
            const response = await axios.get('http://localhost:3000/rename');
            setMessage(response.data.message || 'Collection renamed successfully');
            // Refresh aggregate data after rename
            fetchAggregateData();
        } catch (error) {
            setError('Error renaming collection: ' + (error.response?.data?.error || error.message));
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Other Operations</h2>
            {message && <div style={{ color: 'green' }}>{message}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Aggregate Data Section */}
            <div>
                <h3>Missiles by Range</h3>
                <button onClick={fetchAggregateData}>Refresh Aggregate Data</button>
                {aggregateData.length > 0 ? (
                    <ul>
                        {aggregateData.map((item, index) => (
                            <li key={index}>
                                Range: {item._id}, Count: {item.count}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No data available</p>
                )}
            </div>

            {/* Rename Collection Section */}
            <div>
                <h3>Rename Collection</h3>
                <button onClick={handleRename}>Rename Collection</button>
                <p>Click to toggle between "Missiles" and "Rockets" collection names</p>
            </div>
        </div>
    );
};

export default OthersPage;
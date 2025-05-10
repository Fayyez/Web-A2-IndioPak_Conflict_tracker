// this page uses the rename and aggregate endpoint
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OthersPage = () => {
    const [aggregateData, setAggregateData] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch aggregate data on component mount
    useEffect(() => {
        fetchAggregateData();
    }, []);

    // Get aggregate data by range
    const fetchAggregateData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/missile/aggregate');
            setAggregateData(response.data);
        } catch (error) {
            setMessage('Error fetching aggregate data: ' + error.message);
        }
    };

    // Rename collection
    const handleRename = async () => {
        try {
            await axios.get('http://localhost:3000/rename');
            setMessage('Collection renamed successfully');
        } catch (error) {
            setMessage('Error renaming collection: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Other Operations</h2>
            {message && <div>{message}</div>}

            {/* Aggregate Data Section */}
            <div>
                <h3>Missiles by Range</h3>
                <button onClick={fetchAggregateData}>Refresh Aggregate Data</button>
                <ul>
                    {aggregateData.map((item, index) => (
                        <li key={index}>
                            Range: {item._id}, Count: {item.count}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Rename Collection Section */}
            <div>
                <h3>Rename Collection</h3>
                <button onClick={handleRename}>Rename Collection</button>
                <p>Click to toggle between "Missile" and "Rockets" collection names</p>
            </div>
        </div>
    );
};

export default OthersPage;
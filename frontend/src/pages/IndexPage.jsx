import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IndexPage = () => {
    const [indexData, setIndexData] = useState({
        field: '',
        unique: false
    });
    const [indexes, setIndexes] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch all indexes on component mount
    useEffect(() => {
        fetchIndexes();
    }, []);

    // Get all indexes
    const fetchIndexes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/missile/indexes');
            setIndexes(response.data);
        } catch (error) {
            setMessage('Error fetching indexes: ' + error.message);
        }
    };

    // Create new index
    const handleCreateIndex = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/missile/createindex', {
                field: indexData.field,
                unique: indexData.unique
            });
            setMessage('Index created successfully');
            setIndexData({ field: '', unique: false });
            fetchIndexes(); // Refresh the list of indexes
        } catch (error) {
            setMessage('Error creating index: ' + error.message);
        }
    };

    // Delete index
    const handleDeleteIndex = async (indexName) => {
        try {
            await axios.delete(`http://localhost:3000/missile/deleteindex/${indexName}`);
            setMessage('Index deleted successfully');
            fetchIndexes(); // Refresh the list of indexes
        } catch (error) {
            setMessage('Error deleting index: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Manage Indexes</h2>
            {message && <div>{message}</div>}

            {/* Create Index Form */}
            <div>
                <h3>Create New Index</h3>
                <form onSubmit={handleCreateIndex}>
                    <input
                        type="text"
                        placeholder="Field Name"
                        value={indexData.field}
                        onChange={(e) => setIndexData({...indexData, field: e.target.value})}
                        required
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={indexData.unique}
                            onChange={(e) => setIndexData({...indexData, unique: e.target.checked})}
                        />
                        Unique Index
                    </label>
                    <button type="submit">Create Index</button>
                </form>
            </div>

            {/* Display Existing Indexes */}
            <div>
                <h3>Existing Indexes</h3>
                <button onClick={fetchIndexes}>Refresh Indexes</button>
                <ul>
                    {indexes.map((index, i) => (
                        <li key={i}>
                            {index.name} ({index.unique ? 'Unique' : 'Non-unique'})
                            <button onClick={() => handleDeleteIndex(index.name)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IndexPage;
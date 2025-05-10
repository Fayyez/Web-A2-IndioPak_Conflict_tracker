import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPage = () => {
    const [missiles, setMissiles] = useState([]);
    const [distinctRanges, setDistinctRanges] = useState([]);
    const [count, setCount] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);

    // Fetch initial data
    useEffect(() => {
        fetchAllMissiles();
        fetchCount();
    }, []);

    // Fetch all missiles
    const fetchAllMissiles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/missile');
            setMissiles(response.data);
        } catch (error) {
            console.error('Error fetching missiles:', error);
        }
    };

    // Fetch count
    const fetchCount = async () => {
        try {
            const response = await axios.get('http://localhost:3000/missile/count');
            setCount(response.data);
        } catch (error) {
            console.error('Error fetching count:', error);
        }
    };

    // Find one missile
    const handleFindOne = async () => {
        if (!searchName) return;
        try {
            const response = await axios.get(`http://localhost:3000/missile/${searchName}`);
            setMissiles([response.data]);
        } catch (error) {
            console.error('Error finding missile:', error);
            setMissiles([]);
        }
    };

    // Apply limit
    const handleLimit = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/missile/limit/${limit}`);
            setMissiles(response.data);
        } catch (error) {
            console.error('Error applying limit:', error);
        }
    };

    // Apply skip
    const handleSkip = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/missile/skip/${skip}`);
            setMissiles(response.data);
        } catch (error) {
            console.error('Error applying skip:', error);
        }
    };

    // Sort missiles
    const handleSort = async () => {
        try {
            const response = await axios.get('http://localhost:3000/missile/sort');
            setMissiles(response.data);
        } catch (error) {
            console.error('Error sorting missiles:', error);
        }
    };

    // Get distinct ranges
    const handleDistinct = async () => {
        try {
            const response = await axios.get('http://localhost:3000/missile/distinct');
            setDistinctRanges(response.data);
        } catch (error) {
            console.error('Error getting distinct ranges:', error);
        }
    };

    return (
        <div>
            <h2>View Missiles</h2>
            
            {/* Count Display */}
            <div>Total Missiles: {count}</div>

            {/* Search Section */}
            <div>
                <input
                    type="text"
                    placeholder="Search missile by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button onClick={handleFindOne}>Find One</button>
                <button onClick={fetchAllMissiles}>Find All</button>
                <button onClick={fetchCount}>Count Missiles</button>
            </div>

            {/* Limit and Skip Section */}
            <div>
                <input
                    type="number"
                    placeholder="Limit"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                />
                <button onClick={handleLimit}>Apply Limit</button>

                <input
                    type="number"
                    placeholder="Skip"
                    value={skip}
                    onChange={(e) => setSkip(e.target.value)}
                />
                <button onClick={handleSkip}>Apply Skip</button>
            </div>

            {/* Sort and Distinct Section */}
            <div>
                <button onClick={handleSort}>Sort by Name</button>
                <button onClick={handleDistinct}>Show Distinct Ranges</button>
            </div>

            {/* Missiles List */}
            <div>
                <h3>Missiles List</h3>
                <ol>
                    {missiles.map((missile) => (
                        <li key={missile._id}>
                            Name: {missile.name} | 
                            Range: {missile.range} | 
                            Payload: {missile.payload} | 
                            Country: {missile.country?.name}
                        </li>
                    ))}
                </ol>
            </div>

            {/* Distinct Ranges List */}
            {distinctRanges.length > 0 && (
                <div>
                    <h3>Distinct Ranges</h3>
                    <ul>
                        {distinctRanges.map((range, index) => (
                            <li key={index}>{range}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ViewPage;
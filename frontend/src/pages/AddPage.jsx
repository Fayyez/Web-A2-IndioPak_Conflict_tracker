import React, { useState } from 'react';
import axios from 'axios';
import MissileAddForm from './MissileAddForm';

function AddPage() {
    const [addMode, setAddMode] = useState('single'); // 'single' or 'multiple'
    const [successMessage, setSuccessMessage] = useState('');

    const handleSingleSuccess = () => {
        setSuccessMessage('Single missile added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleMultipleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const missiles = [];

        // Collect data from all 5 forms
        for (let i = 0; i < 5; i++) {
            const missile = {
                name: formData.get(`name${i}`),
                range: formData.get(`range${i}`),
                payload: formData.get(`payload${i}`),
                countryname: formData.get(`countryname${i}`)
            };
            if (missile.name && missile.range && missile.payload && missile.countryname) {
                missiles.push(missile);
            }
        }

        if (missiles.length === 0) {
            setSuccessMessage('Please fill at least one missile form');
            return;
        }

        try {
            await axios.post('http://localhost:3000/missile/many', missiles);
            setSuccessMessage('Multiple missiles added successfully!');
            e.target.reset();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error adding multiple missiles:', error);
            setSuccessMessage('Error adding missiles');
        }
    };

    return (
        <div>
            <h2>Add Missiles</h2>
            
            {/* Mode Selection */}
            <div>
                <button onClick={() => setAddMode('single')}>Add Single Missile</button>
                <button onClick={() => setAddMode('multiple')}>Add Multiple Missiles</button>
            </div>

            {/* Success Message */}
            {successMessage && <div>{successMessage}</div>}

            {/* Single Missile Form */}
            {addMode === 'single' && (
                <div>
                    <h3>Add Single Missile</h3>
                    <MissileAddForm onSuccess={handleSingleSuccess} />
                </div>
            )}

            {/* Multiple Missile Forms */}
            {addMode === 'multiple' && (
                <div>
                    <h3>Add Multiple Missiles (Up to 5)</h3>
                    <form onSubmit={handleMultipleSubmit}>
                        {[...Array(5)].map((_, index) => (
                            <div key={index}>
                                <h4>Missile {index + 1}</h4>
                                <input
                                    type="text"
                                    name={`name${index}`}
                                    placeholder="Missile Name"
                                />
                                <select name={`range${index}`}>
                                    <option value="">Select Range</option>
                                    <option value="short">Short Range</option>
                                    <option value="medium">Medium Range</option>
                                    <option value="long">Long Range</option>
                                </select>
                                <input
                                    type="number"
                                    name={`payload${index}`}
                                    placeholder="Payload"
                                />
                                <select name={`countryname${index}`}>
                                    <option value="">Select Country</option>
                                    <option value="India">India</option>
                                    <option value="Pakistan">Pakistan</option>
                                </select>
                            </div>
                        ))}
                        <button type="submit">Add Multiple Missiles</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AddPage;
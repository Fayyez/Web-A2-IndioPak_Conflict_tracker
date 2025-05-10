import React from 'react'
import axios from 'axios'

const ListDropPage = () => {
    const [collectionlist, setCollectionList] = useState([]);

    function handlelist() {
        axios.get("http://localhost:3000/listcollections").then((res) => {
            setCollectionList(res.data);
        });
    }
    
    function handledrop() {
        axios.get("http://localhost:3000/dropmissiles").then((res) => {
            console.log(res.data);
        });
    }

  return (
    <>
    <div>ListDropPage</div>
    <button onClick={handlelist}>List Collections</button>
    <button onClick={handledrop}>Drop Missiles Collection</button>
    <ul>
        {collectionlist.map((item) => (
            <li key={item}>{item}</li>
        ))}
    </ul>
    </>
  )
}

export default ListDropPage
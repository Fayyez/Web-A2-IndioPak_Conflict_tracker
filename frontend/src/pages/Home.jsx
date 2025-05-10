// lists=d own all the paths avalible to be navigated in thsi app
import { Link } from "react-router";
import axios from 'axios';
export default function Home() {

    function handleBulkWrite() {
        // send call to 3000 port bulk write operation
        axios.get('http://localhost:3000/bulkwrite')
          .then((response) => {
            console.log("bulk write success");
          })
          .catch((error) => {
            console.error('bulk write Error:', error);
            alert("bulk alrdy written in DB....")
          });
      }

      return(
        <>
        <div className="home-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left'}}>
            <Link to="/add">Add Missile</Link>
            <Link to="/view">View Missile</Link>
            <Link to="/update">Update Missile</Link>
            <Link to="/delete">Delete Missile</Link>
            <Link to="/put">Put Missile</Link>
            <Link to="/index">Index Missile</Link>
            <Link to="/list_drop">List and Drop Page</Link>
            <Link to="/others">Others Page</Link>
        </div><br></br>
        <button name='bulkWrtebutton' onClick={handleBulkWrite}>Bulk Write</button>
        </>
      )
    
}

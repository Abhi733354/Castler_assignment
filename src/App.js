import logo from './logo.svg';
import React,{useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [searchid, setSearchid] = useState("");
  const[data, setData]= useState([]);
  const tempData = useParams();

  const tempId = useParams();
  const handlechange = (event) =>{
    setSearchid(event.target.value)
  }
  const apicall = async(event) => {
    event.preventDefault();
    if (event.key === 'Enter') {
    const url='https://reqres.in/api/users?search=${searchid}';
    const response = await axios.get(url);
    console.log(response);
    setData(response.data.data);
    }
    if(searchid > 12){
      setSearchid("Invalid id");
    }
  };
  useEffect(()=>{
    apicall();
  },[searchid]);

  return (
    <>
    <div className="App">
      <div className="search-id">
      <input type="number" placeholder="Enter your id here" name = "search" onChange={handlechange} value={searchid} onKeyPress={apicall}/><br></br><br></br>
      </div>
      
      {data && data.map((item)=>(
          <>
          <h3>{data.id}</h3>
          <img src={item.avatar} className="img-fluid food-image-large"/><br></br>
          <strong>First Name:</strong><p>{item.first_name}</p>
          <strong>Last Name:</strong><p>{item.last_name}</p>
          <strong>Email:</strong><p>{item.email}</p>
          {/* <Link to={item.support.url}>{item.support.text}</Link> */}
          
          </>

       
        ))}
        



    </div>
    </>
  );
}

export default App;

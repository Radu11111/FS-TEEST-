import React,{useEffect,useState} from 'react'
import './ClickButton.css'
function ClickButton() {
    const [apiResponse,setAPIResponse]= useState("");

    useEffect(()=> {
        fetch("/api")
          .then((response) => response.json())
          .then((data) => setAPIResponse(data.clicks));
          
    },[]);
  return (
    <div className="clickBtn">
        <h1>`This button was clicked {apiResponse} times`</h1>
      <button>{apiResponse}</button>
    </div>
  );
}

export default ClickButton

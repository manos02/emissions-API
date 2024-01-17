import React, { useState } from "react";
import "./App.css";

let isLoggedIn = true;

function MyButton({clicks, handleClick}){
  return (<div>
    <button onClick={handleClick}>
    click me {clicks}
    </button>
  </div>)
}


function App() {
  let content;
  const [clicks, setclicks] = useState(0);


  function handleClick() {
    setclicks((prevClicks) => {
      const updatedClicks = prevClicks + 1;
      alert(updatedClicks);
      return updatedClicks;
    });
  }

}

export default App;

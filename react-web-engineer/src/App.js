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
    setclicks(clicks+1);
    alert(clicks);
  }

  if (isLoggedIn){
    content = <header>
      testeigfigefiugy
      <MyButton clicks={clicks} handleClick={handleClick}/>
      </header>;
  } else {
    content= <header>You already clicked the button</header>
  }
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload TRYING STUFF.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  return (
    <div className="App">
      <header className='App-tester'><h1>Hello World!</h1>
      <form>
        <label>
          Input: 
        <input
        type="text"
        name="email"
        placeholder="Email"
        />
        </label>
        <label> Testing
        <input
        type="text"
        name="email"
        placeholder="Test"
        />
        </label>
      </form>
      <p>Trying stuff</p>
      {content}
      <p>Trying stuff</p>
      <p>Trying stuff</p>
      <p>Trying stuff</p>
      <p>Trying stuff</p>
      <p>Trying stuff</p>
      <p>Trying stuff</p>
      
      </header>
      
    </div>
  );
}

export default App;

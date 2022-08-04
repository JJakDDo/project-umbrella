import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import Forecast from "./components/Forecast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Forecast />
    </div>
  );
}

export default App;

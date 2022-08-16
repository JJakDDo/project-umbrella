import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import Forecast from "./components/Forecast";
import Seoul from "./components/Seoul";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Seoul />
    </div>
  );
}

export default App;

import './App.css';
import useProfi from "./useProfi";
import Filter from "./Filter";
import DebugIndex from "./DebugIndex";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export default function App() {

  const profi = useProfi();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DebugIndex/>}/>
          <Route path="/filter/:filterName" element={<Filter profi={profi}/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


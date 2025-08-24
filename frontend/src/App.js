import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Create from './components/Create';
import Allpost from './components/Allpost';
import Update from './components/Update';

import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Create/>}/>
        <Route exact path="/all" element={<Allpost/>}/>
        <Route exact path="/:id" element={<Update/>}/>
      </Routes>
      
      </BrowserRouter>
      
    
      
    </div>
  );
}

export default App;

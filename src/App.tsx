import './App.css';
import {
  Routes,
  Route,
} from "react-router";

function App() {
  return (
    <div className="app">
      <h1 className="app-title">My <span className="app-boring-title">BORING</span> recipes app</h1>
      <div className="app-main-div">
        <Routes>
          <Route path="/edit/:recipeID" element={<div>Edit recipe</div>}/>
          <Route path="/" element={<div>List recipes</div>}/>
        </Routes> 
      </div>
   </div>
  );
}

export default App;

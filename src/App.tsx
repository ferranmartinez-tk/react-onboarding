import './App.css';
import { ListRecipes } from './views/ListRecipes';
import { EditRecipe } from './views/EditRecipes';
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
          <Route path="/edit/:recipeID" element={<EditRecipe />}/>
          <Route path="/" element={<ListRecipes />}/>
        </Routes> 
      </div>
   </div>
  );
}

export default App;

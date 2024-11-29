import { Link } from 'react-router';
import './Recipe.css';

type RecipeProps = {
    name: string,
    id: string,
    onDelete: (recipeID: string) => void
};

const Recipe = (props: RecipeProps) => {
    return (
        <div className="recipe">
            <h5 className="recipe-title">{props.name}</h5>
            <div className="recipe-buttons-div">
                <button className="button-recipe-edit">
                    <Link className="button-recipe-edit-link" to={`/edit/${props.id}`}>
                        Edit
                    </Link>
                </button>
                <button 
                    className="button-recipe-delete"
                    onClick={() => props.onDelete(props.id)}
                >
                        Delete
                </button>
            </div>
        </div>
    );
};

export default Recipe;
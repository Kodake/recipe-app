import { Link } from 'react-router-dom';
import { Recipe } from '../interfaces/appInterfaces';

// Styles
import './RecipeList.css';

interface Props {
    recipes: Recipe[];
}

const RecipeList = ({ recipes }: Props) => {

    if (recipes.length === 0) {
        return <div className='error'>No recipes to load...</div>
    }

    return (
        <div className='recipe-list'>
            {recipes.map(recipe => (
                <div key={recipe.id} className='card'>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make...</p>
                    <div>{recipe.method.substring(0, 100)}...</div>
                    <Link to={`recipes/${recipe.id}`}>Cook this</Link>
                </div>
            ))}
        </div>
    )
}

export default RecipeList
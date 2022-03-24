import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

// Styles
import './Recipe.css';

interface Props {
    id: string;
}

const Recipe = () => {
    const params = useParams<Props>();
    const url = `http://localhost:3000/recipes/${params.id}`;
    const { recipe, isPending, error } = useFetch(url);
    const history = useHistory();

    useEffect(() => {
        if (error) {
            // Redirect to HomePage
            setTimeout(() => {
                history.push('/');
            }, (2000));
        }

    }, [error, history])

    return (
        <div className='recipe'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {recipe && (
                <>
                    <h2 className='page-title'>{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook...</p>
                    <ul>
                        {recipe.ingredients.map(ing =>
                            <li key={ing}>{ing}</li>
                        )}
                    </ul>
                    <p className='method'>{recipe.method}</p>
                </>
            )}
        </div>
    )
}

export default Recipe
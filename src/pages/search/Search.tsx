
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

// Styles
import './Search.css';

// Components
import RecipeList from '../../components/RecipeList';

const Search = () => {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q');

    const url = `http://localhost:3000/recipes?q=${query}`;
    const { error, isPending, recipes } = useFetch(url);

    return (
        <div>
            <h2 className='page-title'>Recipes including "{query}"</h2>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}

            {recipes && <RecipeList recipes={recipes} />}
        </div>
    )
}

export default Search
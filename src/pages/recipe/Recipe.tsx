import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';

// Icon Image
import deleteIcon from '../../assets/delete-icon.svg';

// Styles
import './Recipe.css';

interface Props {
    id: string;
}

const Recipe = () => {
    const params = useParams<Props>();
    const [recipeId, setRecipeId] = useState('');
    const { deleteData, recipes } = useFetch(`http://localhost:3000/recipes/${recipeId}`, 'DELETE');
    const url = `http://localhost:3000/recipes/${params.id}`;
    const { recipe, isPending, error } = useFetch(url);
    const history = useHistory();
    const { mode } = useTheme();

    useEffect(() => {
        if (error) {
            // Redirect to HomePage
            setTimeout(() => {
                history.push('/');
            }, (2000));
        }

    }, [error, history]);

    const handleDelete = (id: string) => {
        setRecipeId(id);
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            focusDeny: false,
            heightAuto: false,
            focusCancel: false,
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(recipeId);
                // Redirect to HomePage
                history.push('/');
                recipes?.filter(recipe => recipe.id !== recipeId);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        });
    }

    return (
        <div className={`recipe ${mode}`}>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {recipe && (
                <>
                    <img
                        className='delete-details'
                        src={deleteIcon}
                        onClick={() => handleDelete(recipe.id)}
                    />
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
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Recipe } from '../interfaces/appInterfaces';
import Swal from 'sweetalert2';

// Icon Image
import editIcon from '../assets/edit-icon.svg';
import deleteIcon from '../assets/delete-icon.svg';

// Styles
import './RecipeList.css';
import { useFetch } from '../hooks/useFetch';
import { useState } from 'react';

interface Props {
    recipes: Recipe[];
}

const RecipeList = ({ recipes }: Props) => {
    const [recipeId, setRecipeId] = useState('');
    const { deleteData } = useFetch(`http://localhost:3000/recipes/${recipeId}`, 'DELETE');
    const hitory = useHistory();
    const { mode } = useTheme();

    if (recipes.length === 0) {
        return <div className='error'>No recipes to load...</div>
    }

    const handleEdit = (id: string) => {
        hitory.push(`/edit/${id}`);
    }

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
                recipes.splice(recipes.findIndex(recipe => recipe.id === id), 1);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        });
    }

    return (
        <div className='recipe-list'>
            {recipes.map(recipe => (
                <div key={recipe.id} className={`card ${mode}`}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make...</p>
                    <div>{recipe.method.substring(0, 100)}...</div>
                    <Link to={`recipes/${recipe.id}`}>Cook this</Link>
                    <img
                        className='edit'
                        src={editIcon}
                        onClick={() => handleEdit(recipe.id)}
                    />
                    <img
                        className='delete'
                        src={deleteIcon}
                        onClick={() => handleDelete(recipe.id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default RecipeList;
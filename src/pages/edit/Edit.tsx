
import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import MultiSelectInput from '../../components/MultiSelectInput';
import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';

// Styles
import './Edit.css';

interface Props {
    id: string;
}

const Edit = () => {
    const params = useParams<Props>();
    const [recipeId, setRecipeId] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { putData } = useFetch(`http://localhost:3000/recipes/${recipeId}`, 'PUT');
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const ingredientInput = useRef<HTMLInputElement | null>(null);
    const url = `http://localhost:3000/recipes/${params.id}`;
    const { recipe } = useFetch(url);
    const history = useHistory();
    const { color } = useTheme();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSubmitted(true);
        putData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' });
    }

    const handleAdd = (e: any) => {
        e.preventDefault();
        const ing = newIngredient.trim();

        if (ing && !ingredients.includes(ing)) {
            setIngredients((prev: any) => [...prev, ing]);
        }
        setNewIngredient('');
        ingredientInput.current?.focus();
    }

    useEffect(() => {
        if (recipe) {
            setRecipeId(params.id);
            setTitle(recipe.title);
            setMethod(recipe.method);
            setIngredients(recipe.ingredients);
            setCookingTime(recipe.cookingTime.split(' ')[0]);
        }
    }, [recipe]);

    useEffect(() => {
        if (isSubmitted) {
            Swal.fire({
                timer: 1000,
                icon: 'success',
                heightAuto: false,
                position: 'top-end',
                showConfirmButton: false,
                title: 'Recipe updated successfully!',
            })
            history.push('/');
        }
    }, [isSubmitted])


    return (
        <div className='create'>
            <h2 className='page-title'>Edit Recipe {title.substring(0, 20)}...</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe title:</span>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Recipe ingredients:</span>
                    <div className='ingredients'>
                        <input
                            type='text'
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button
                            onClick={handleAdd}
                            className='btn'
                            style={{ backgroundColor: color }}>Add</button>
                    </div>
                </label>

                <MultiSelectInput ingredients={ingredients} />

                <label>
                    <span>Recipe method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>Cooking time (minutes):</span>
                    <input
                        type='number'
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>

                <button className='btn' style={{ backgroundColor: color }}>Submit</button>
            </form>
        </div>
    )
}

export default Edit;
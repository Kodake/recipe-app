
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';

// Styles
import './Create.css';

// Components
import MultiSelectInput from '../../components/MultiSelectInput';

const Create = () => {
    const { postData, recipes, recipe, error } = useFetch(`http://localhost:3000/recipes`, 'POST');
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const ingredientInput = useRef<HTMLInputElement | null>(null);
    const history = useHistory();
    const { color } = useTheme();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' });
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
            history.push('/');
        }
    }, [recipe]);

    return (
        <div className='create'>
            <h2 className='page-title'>Add a New Recipe</h2>

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

export default Create;
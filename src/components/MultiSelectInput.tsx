import { useEffect, useState } from 'react';

// Styles
import './MultiSelectInput.css';

// Icon Image
import closeIcon from '../assets/close-icon.svg';

interface Props {
    ingredients: string[];
}

const MultiSelectInput = ({ ingredients }: Props) => {
    const [listIngredients, setListIngredients] = useState<string[]>(ingredients);

    const handleDelete = (ing: string) => {
        const newIngredients = listIngredients.filter(i => i !== ing);
        ingredients.splice(ingredients.findIndex(ingredient => ingredient === ing), 1);
        setListIngredients(newIngredients);
    }

    useEffect(() => {
        if (listIngredients) {
            setListIngredients(ingredients);
        }
    }, [ingredients]);

    return (
        <p>Current ingredients:{listIngredients.map(ing => <div className='snack' key={ing}>{ing} <img
            className='close'
            src={closeIcon}
            onClick={(e) => handleDelete(ing)}
        /></div>)}</p>
    )
}

export default MultiSelectInput;
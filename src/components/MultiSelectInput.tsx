import { useEffect, useRef, useState } from 'react';

// Styles
import './MultiSelectInput.css';

// Icon Image
import closeIcon from '../assets/close-icon.svg';

interface Props {
    ingredients: string[];
}

const MultiSelectInput = ({ ingredients }: Props) => {
    const [listIngredients, setSetLitIngredients] = useState<string[]>(ingredients);

    const handleDelete = (ing: string) => {
        const newIngredients = listIngredients.filter(i => i !== ing);
        setSetLitIngredients(newIngredients);
    }

    useEffect(() => {
        if (listIngredients) {
            setSetLitIngredients(ingredients);
        }
    }, [ingredients]);

    return (
        <p>Current ingredients: {listIngredients.map(ing => <em className='snack' key={ing}>{ing} <img
            className='close'
            src={closeIcon}
            onClick={(e) => handleDelete(ing)}
        /></em>)}</p>
    )
}

export default MultiSelectInput;
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// Styles
import './Searchbar.css';

const Searchbar = () => {

    const [term, setTerm] = useState('');
    const history = useHistory();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        history.push(`/search?q=${term}`);
    }

    return (
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search: </label>
                <input
                    id='search'
                    type="text"
                    onChange={(e) => setTerm(e.target.value)}
                    required
                />
            </form>
        </div>
    )
}

export default Searchbar
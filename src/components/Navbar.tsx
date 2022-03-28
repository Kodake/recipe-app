import { Link } from 'react-router-dom';
// Styles
import './Navbar.css';

// Components
import Searchbar from './Searchbar';

const Navbar = () => {
    return (
        <div className='navbar'>
            <nav>
                <Link to={'/'} className='brand'>
                    <h1>Cooking ninjas</h1>
                </Link>

                <Searchbar />
                <Link to={'/create'}>
                    <h1>Create recipe</h1>
                </Link>
            </nav>
        </div>
    )
}

export default Navbar
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

// Styles
import './Navbar.css';

// Components
import Searchbar from './Searchbar';

const Navbar = () => {
    const { color } = useTheme();
    const { changeColor } = useTheme();

    const defaultColor = () => {
        changeColor('#58249c');
    }

    return (
        <div className='navbar' style={{ background: color }}>
            <nav onClick={defaultColor}>
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
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Page components
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';

// Styles
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>

        <Switch>
          <Route exact path='/create' component={Create} />
        </Switch>

        <Switch>
          <Route exact path='/search' component={Search} />
        </Switch>

        <Switch>
          <Route exact path='/recipes/:id' component={Recipe} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

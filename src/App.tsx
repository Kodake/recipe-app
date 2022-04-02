import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Page components
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Edit from './pages/edit/Edit';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';

// Styles
import './App.css';

// useTheme hook
import { useTheme } from './hooks/useTheme';

const App = () => {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
        <BrowserRouter>

          <Navbar />

          <ThemeSelector />

          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>

          <Switch>
            <Route exact path='/create' component={Create} />
          </Switch>

          <Switch>
            <Route exact path='/edit/:id' component={Edit} />
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

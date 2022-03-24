import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
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
          <Route exact path='/recipe/:id' component={Recipe} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

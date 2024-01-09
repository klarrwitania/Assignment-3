import './App.css'
import Navbar from './components/Navbar'
import New from './pages/New'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import TodoDetails from './components/TodoDetails'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <div>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/todos/:id">
            <TodoDetails />
          </Route>
          <Route path="/completed">
            <TodoDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  )
}

export default App

import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"

import AddTutorial from "./components/add-tutorial.component"
import Tutorial from "./components/tutorial.component"
import TutorialList from "./components/tutorialList.component"

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/tutorials"} className="navbar-brand">
          Tutoriais
        </Link>
        <div className="nav-item">
          <Link to={"/add"} className="nav-link">
            Adicionar
          </Link>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/","/tutoriais"]} component={TutorialList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route exact path="/tutorials/:id" component={Tutorial} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

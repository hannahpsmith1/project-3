import React, { useState, useEffect } from 'react';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Household from './pages/Household';
import Dashboard from './pages/Dashboard';
import Chores from './pages/Chores';
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import API from "./utils/API";
import { useChoreContext } from "./utils/GlobalState";
import {
  UPDATE_USERNAME,
  UPDATE_HOUSEHOLD,
  UPDATE_MEMBERS,
  UPDATE_CHORES,
  UPDATE_REPETITIONS,
} from './utils/actions';

function App() {
  const dispatch = useChoreContext()[1];

  // the display name of the currently logged in user
  const [username, setUsername] = useState();

  // this function checks the display name of logged in user and sets the state as such
  const refreshUsername = () => {
    API.getUsername()
      .then(response => {
        setUsername(response.data);
      })
      .catch(err => {
        console.log(err);
        setUsername("");
      })
  };

  // check login status on app load
  useEffect(refreshUsername);

  useEffect(() => {
    API.getHouseholdInfo()
      .then(response => {
        console.log(response);
        dispatch({ 
          type: UPDATE_HOUSEHOLD, 
          household: response.data.name, 
          inviteCode: response.data.invite_code,
        });
        dispatch({ 
          type: UPDATE_MEMBERS, 
          members: response.data.members,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ 
          type: UPDATE_HOUSEHOLD, 
          household: null, 
          inviteCode: null,
        });
        dispatch({ 
          type: UPDATE_MEMBERS, 
          members: [],
        });
      })
  }, [dispatch]);

  return (
    <Router>
      <Navbar username={username} refreshUsername={refreshUsername} />
        <div>
          <Switch>
            <Redirect exact path="/" to="/login" />
            <Route exact path="/signup">
              <SignUp refreshUsername={refreshUsername} />
            </Route>
            <Route exact path="/login">
              <Login refreshUsername={refreshUsername} />
            </Route>
            <Route exact path="/household" component={Household} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/chores" component={Chores} />
          </Switch>
        </div>
        <Footer/>
    </Router>
  );
}

export default App;

import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import styles from './App.module.scss';

import Main from 'routes/Main/Main';
import Table from 'routes/Table/Table';

class App extends Component {
  checkAuthentication = () => {
    return sessionStorage.getItem('authentication') === 'true';
  }

  render() {
    return (
      <div className={styles.app}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !this.checkAuthentication() ? (
                  <Main {...props}/>
                ) : (
                  <Redirect to={{pathname: "/table"}}/>
                )}
            />
            <Route
              exact
              path="/table"
              render={(props) =>
                this.checkAuthentication() ? (
                  <Table {...props}/>
                ) : (
                  <Redirect to={{pathname: "/"}}/>
                )}
              />
            <Redirect to="/"/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

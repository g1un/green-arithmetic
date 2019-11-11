import React, {Component} from 'react';

import styles from './Main.module.scss';

class Main extends Component {
  state = {
    login: '',
    password: '',
    error: false,
  }

  credentials = {
    login: 'login',
    password: 'password',
  }

  submit = () => {
    const {
      login,
      password,
    } = this.state;

    if(login === this.credentials.login && password === this.credentials.password) {
      sessionStorage.setItem('authentication', 'true');
      this.props.history.push('/table');
    } else {
      this.setState({error: true});
    }
  }

  render() {
    const {
      login,
      password,
      error,
    } = this.state;

    return (
      <div className={styles.container}>
        <input
          type="text"
          className={styles.input}
          placeholder="login"
          value={login}
          onChange={(e) => this.setState({login: e.target.value})}
        />
        <input
          type="password"
          className={styles.input}
          placeholder="password"
          value={password}
          onChange={(e) => this.setState({password: e.target.value})}
        />
        <button
          type="submit"
          className={styles.submit}
          onClick={() => this.submit()}
        >
          Submit
        </button>
        <p className={styles.error}>
          {error && 'Authentication failed'}
        </p>
      </div>
    )
  }
}

export default Main;

/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import classNames from 'classnames'
import AppStore from '../../stores/AppStore'

@withContext
class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  constructor(props) {
    super(props);
    AppStore.subscribe(() => {
      this.setState({
        isLoading: AppStore.getState().pageLoading
      })
    })
  }

  state = {
    isLoading: false
  };

  render() {
    return !this.props.error ? (
      <div style={{'background': '#ddd'}}>
        <div className={classNames({'loadingBar': true, 'showing': this.state.isLoading})}>
          <div className="bg-blue"></div>
        </div>

        <div className="App-container container flex flex-column">

          <div className="cont-mt1 animate-margin-top"></div>
          <div className="clearfix flex-grow sym-shadow bg-white">
            <header className="px2 col col-12 md-col-3 center md-left">
              <Header />
            </header>

            <main className="px2 col col-12 md-col-9 lg-col-6">
              {this.props.children}
            </main>

            <div className="col col-12 lg-col-3">
              <Sidebar />
            </div>
          </div>

          <footer className="gray left-align p2 sym-shadow bg-white">
            <Footer />
          </footer>
        </div>
      </div>
    ) : this.props.children;
  }

}

export default App;

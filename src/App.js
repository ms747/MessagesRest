import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import "materialize-css/dist/js/materialize";

function Home() {
  return (
    <Fragment>
      <h1>Welcome, Mayur</h1>
      <div className="card">
        <div className="card-content">
          <span className="card-title">Hi</span>
        </div>
      </div>
    </Fragment>
  );
}

function MessageCard(props) {
  const {name,message,email} = props.message
  return (
    <div className="card col s12 xl4 l4 m6 message-card">
      <div className="card-content">
        <span className="card-title">{name}</span>
        <p>
          {message}
        </p>
        <span>{email}</span>        
      </div>
      <div className="card-action">
        <button className="btn-flat waves-effect waves-orange">DELETE</button>
      </div>
    </div>
  );
}

class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    axios.get("https://35.200.197.245:8080/contactme").then(result => {
      const data = result.data;
      return this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;
    console.log(data)
    const messages = data && data.map(msg => <MessageCard key={msg._id} message={msg} />);
    return (
      <Fragment>
        <div className="row">{messages}</div>
      </Fragment>
    );
  }
}

function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper orange darken-4">
        <Link to="/" className="brand-logo" style={{ marginLeft: "20px" }}>
          Messages
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/messages">Messages</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/messages" component={MessagePage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

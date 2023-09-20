import React from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

const Home = () => {

  const message = <h2>Welcome, Stranger!</h2>;

  const button =
    <div>
      <Button color="secondary"><Link to="/movies">Movie management app</Link></Button>
    </div>

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        {message}
        {button}
      </Container>
    </div>
  );
}

export default Home;
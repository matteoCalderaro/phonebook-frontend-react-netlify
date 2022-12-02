import { useApolloClient, useQuery } from '@apollo/client';
//import PersonForm from './components/PersonForm';
import PersonsList from './components/PersonsList';
import { ALL_PERSONS, USER } from './queries';
import { useState, useEffect } from 'react';
import Notify from './components/Notify';
//import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';
import Friends from './components/Friends';
import Navbar from './components/Navbar';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('persons');
  const client = useApolloClient();

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 6000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <div id="navbarLogin">Phonebook 2022</div>
        <div id="loginContainer">
          <div id="loginForm">
            <Notify errorMessage={errorMessage} />
            <h2>Login</h2>
            <LoginForm setToken={setToken} setError={notify} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar setPage={setPage} logout={logout} page={page} />
      <Notify errorMessage={errorMessage} />
      <PersonsList
        show={page === 'persons'}
        persons={result.data.allPersons}
        setError={notify}
        setPage={setPage}
        page={page}
      />

      <Friends
        setPage={setPage}
        show={page === 'amici'}
        persons={result.data.allPersons}
      />
    </>
  );
}

export default App;

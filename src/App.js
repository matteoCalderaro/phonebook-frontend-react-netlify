import { useApolloClient, useQuery } from '@apollo/client';
//import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { ALL_PERSONS, USER } from './queries';
import { useState, useEffect } from 'react';
import Notify from './components/Notify';
//import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';
import Friends from './components/Friends';

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
    }, 3000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button
        onClick={() => {
          setPage('persons');
        }}
      >
        persons
      </button>
      <button onClick={() => setPage('amici')}>amici</button>
      <button onClick={logout}>logout</button>
      <Persons
        show={page === 'persons'}
        persons={result.data.allPersons}
        setError={notify}
        setPage={setPage}
        page={page}
      />

      <Friends show={page === 'amici'} persons={result.data.allPersons} />
    </>
  );
}

export default App;

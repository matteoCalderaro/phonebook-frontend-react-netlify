import { useApolloClient, useQuery } from '@apollo/client';
//import PersonForm from './components/PersonForm';
import PersonsList from './components/PersonsList';
import { ALL_PERSONS } from './queries';
import { useState, useEffect } from 'react';
import Notify from './components/navigation/Notify';
//import PhoneForm from './components/PhoneForm';
import LoginForm from './components/navigation/LoginForm';
import Friends from './components/lists/Friends';
import Navbar from './components/navigation/Navbar';
import Collegues from './components/lists/Collegues';
import Footer from './components/navigation/Footer';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('persons');
  const client = useApolloClient();

  const result = useQuery(ALL_PERSONS);

  useEffect(() => {
    let timer = setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = message => {
    setErrorMessage(message);
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
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar setPage={setPage} logout={logout} page={page} />
      <Notify errorMessage={errorMessage} />
      <PersonsList
        show={page === 'persons'}
        persons={result?.data?.allPersons}
        setError={notify}
        setPage={setPage}
        page={page}
      />

      <Friends
        setPage={setPage}
        show={page === 'friends'}
        persons={result?.data?.allPersons}
      />
      <Collegues
        setPage={setPage}
        show={page === 'collegues'}
        persons={result?.data?.allPersons}
      />
      <Footer />
    </>
  );
}

export default App;

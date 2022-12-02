import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FIND_PERSON, REMOVE_PERSON, ALL_PERSONS, USER } from '../queries';
import MainForm from './MainForm';
import PersonDetail from './PersonDetail';

const PersonsList = ({ persons, setError, show, setPage, page }) => {
  console.log('all persons', persons);

  // DA IMPLEMENTARE ICONA AMICI/LAVORO NELLA MAIN LIST---------------
  // const amici = useQuery(USER);
  // console.log('amici', amici.data.me.friends);

  // REMOVE_PERSON -------------------------
  const [removePerson] = useMutation(REMOVE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const remove = name => {
    removePerson({ variables: { name } });
  };

  // FIND PERSON ---------------------------
  const [nameToSearch, setNameToSearch] = useState(null);

  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    const person = result.data.findPerson;
    return (
      <PersonDetail
        persons={persons}
        person={person}
        setNameToSearch={setNameToSearch}
        setPage={setPage}
        setError={setError}
        show={show}
        page={page}
      />
    );
  }

  if (!show) {
    return null;
  }

  // SORT PERSONS ---------------------------
  const personsSorted = persons.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  console.log(personsSorted);

  return (
    <>
      <MainForm setError={setError} />
      <div id="personsList">
        {personsSorted.length === 0 ? (
          <h2>nessun contatto inserito...</h2>
        ) : (
          <>
            <h2>Contatti esistenti</h2>
            {personsSorted.map((p, index) => (
              <div id="contact" key={index}>
                <div>
                  <h3>name: {p.name}</h3>
                  <div>phone: {p.phone ? p.phone : 'nessun telefono'}</div>
                  <div>street: {p.address.street}</div>
                  <div>city: {p.address.city}</div>
                  <div>{p.id}</div>
                </div>
                <div id="buttons">
                  <button onClick={() => setNameToSearch(p.name)}>
                    modifica
                  </button>
                  <button onClick={() => remove(p.name)}>elimina</button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PersonsList;

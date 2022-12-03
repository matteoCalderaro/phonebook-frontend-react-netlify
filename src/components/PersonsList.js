import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FIND_PERSON, REMOVE_PERSON, ALL_PERSONS, USER } from '../queries';
import MainForm from './MainForm';
import PersonDetail from './PersonDetail';

const PersonsList = ({ persons, setError, show, setPage, page }) => {
  console.log('all persons', persons);
  const [formVisible, setFormVisible] = useState(false);
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [valueInput, setValueInput] = useState('');

  useEffect(() => {
    setPersonsToShow(persons);
    setValueInput('');
  }, [persons]);

  const amici = useQuery(USER);

  // REMOVE_PERSON ---------------------------------------------------
  const [removePerson] = useMutation(REMOVE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const remove = name => {
    removePerson({ variables: { name } });
  };

  // FIND PERSON ----------------------------------------------------
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

  // FILTER ----------------------------------------------------------
  const searchPerson = value => {
    setValueInput(value);
    setPersonsToShow(
      persons.filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
    );
  };
  console.log('persons to show', personsToShow);

  // SORT PERSONS -----------------------------------------------------
  const personsSorted = personsToShow.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  // AMICI ATTUALI-----------------------------------------------------
  if (amici.loading) {
    return null;
  }
  const amiciAttuali = amici.data.me.friends.map(a => a.name);
  console.log('amici attuali', amiciAttuali);

  return (
    <>
      {formVisible ? (
        <>
          <MainForm setError={setError} />
          <button onClick={() => setFormVisible(false)}>
            torna ai contatti
          </button>
        </>
      ) : (
        <div>
          <div id="selectList">
            <div>
              <div>cerca:</div>
              <input
                value={valueInput}
                id="selectInput"
                onChange={({ target }) => searchPerson(target.value)}
              />
            </div>

            <div>
              <button
                id="buttonNewContact"
                onClick={() => setFormVisible(true)}
              >
                NEW
              </button>
            </div>
          </div>
          <div id="headerPersonsList">
            <h2>Contatti esistenti</h2>
          </div>
          <div id="personsList">
            {personsSorted.length === 0 ? (
              <h2>nessun contatto inserito...</h2>
            ) : (
              <div>
                <div>
                  {personsSorted.map((p, index) => (
                    <div id="contact" key={index}>
                      <div>
                        <h3>name: {p.name}</h3>
                        <div>
                          phone: {p.phone ? p.phone : 'nessun telefono'}
                        </div>
                        <div>street: {p.address.street}</div>
                        <div>city: {p.address.city}</div>
                      </div>
                      <div id="buttonsAndIcons">
                        <div id="icons">
                          {amiciAttuali.includes(p.name) && <div>amico</div>}
                        </div>
                        <div id="buttons">
                          <button
                            onClick={() => {
                              setNameToSearch(p.name);
                              setPersonsToShow(persons);
                              setValueInput('');
                            }}
                          >
                            modifica
                          </button>
                          <button onClick={() => remove(p.name)}>
                            elimina
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PersonsList;

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_PERSON, USER } from '../queries';
import PersonForm from './PersonForm';
import PhoneForm from './PhoneForm';
import Person from './Person';

const Persons = ({ persons, setError, show, setPage, page }) => {
  console.log(persons);

  const [nameToSearch, setNameToSearch] = useState(null);

  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    const person = result.data.findPerson;
    return (
      <Person
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
  const personsSorted = persons.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  console.log(personsSorted);
  return (
    <>
      <PersonForm setError={setError} />
      <div id="personsList">
        <h2>Contatti esistenti</h2>
        {personsSorted.map((p, index) => (
          <div
            id="contact"
            key={index}
            style={{
              borderBottom: '1px solid',
              paddingBottom: '8px',
            }}
          >
            <div>
              <h3
                style={{
                  marginBottom: '0',
                  marginTop: '8px',
                }}
              >
                name: {p.name}
              </h3>

              <div>phone: {p.phone ? p.phone : 'nessun telefono'}</div>
              <div>
                address: {p.address.street}, {p.address.city}
              </div>
            </div>

            <div>
              <button
                style={{ marginRight: 5 }}
                onClick={() => setNameToSearch(p.name)}
              >
                modifica
              </button>
              <button onClick={() => setNameToSearch(p.name)}>elimina</button>
            </div>
          </div>
        ))}
      </div>
      {/* <PhoneForm setError={setError} /> */}
    </>
  );
};

export default Persons;

import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_PERSON, ALL_PERSONS } from '../queries';

const MainForm = ({ setError, setFormVisible }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [createPerson] = useMutation(CREATE_PERSON, {
    // refetchQueries: [{ query: ALL_PERSONS }],
    // name must be unique
    onError: error => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setFormVisible(false);
    },
    //update cache concatenating the result of the useMutation
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        };
      });
    },
  });

  const submit = async event => {
    event.preventDefault();

    createPerson({
      variables: {
        name,
        street,
        city,
        phone: phone.length > 0 ? phone : undefined,
      },
    });

    setName('');
    setPhone('');
    setStreet('');
    setCity('');
    //setFormVisible(false);
  };

  return (
    <div id="mainForm">
      <h2>Inserisci nuovo contatto</h2>
      <form onSubmit={submit}>
        <div>
          <div>
            <div>name</div>
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            <div>phone</div>
            <input
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <div>street</div>
            <input
              value={street}
              onChange={({ target }) => setStreet(target.value)}
            />
          </div>
          <div>
            <div>city</div>
            <input
              value={city}
              onChange={({ target }) => setCity(target.value)}
            />
          </div>
        </div>
        <button type="submit">salva</button>
      </form>
    </div>
  );
};

export default MainForm;

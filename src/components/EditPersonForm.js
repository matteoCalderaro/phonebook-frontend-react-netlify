import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { EDIT_NUMBER, USER } from '../queries';
import { ALL_PERSONS } from '../queries';

const EditPersonForm = ({ setError, person, children, setNameToSearch }) => {
  const [newPhone, setNewPhone] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    setNewPhone(person.phone);
    setNewStreet(person.address.street);
    setNewCity(person.address.city);
  }, [person.address.city, person.address.street, person.phone]);

  const [changeContact] = useMutation(EDIT_NUMBER, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
    onError: error => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setNameToSearch(null);
      setError('success');
    },
  });
  const submit = event => {
    event.preventDefault();
    changeContact({
      variables: { name: person.name, newPhone, newStreet, newCity },
    });
  };
  return (
    <>
      <div id="name">
        <span style={{ marginRight: 8 }}>name:</span>
        <span>{person.name}</span>
      </div>
      <form onSubmit={submit}>
        <div>
          <div>phone:</div>
          <input
            defaultValue={person.phone}
            onChange={({ target }) => setNewPhone(target.value)}
          />
        </div>
        <div>
          <div>street:</div>
          <input
            defaultValue={person.address.street}
            onChange={({ target }) => setNewStreet(target.value)}
          />
        </div>
        <div>
          <div>city:</div>
          <input
            defaultValue={person.address.city}
            onChange={({ target }) => setNewCity(target.value)}
          />
        </div>
        <button style={{ marginTop: '20px', fontSize: '15px' }} type="submit">
          salva
        </button>
      </form>
    </>
  );
};

export default EditPersonForm;

import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { EDIT_NUMBER, USER } from '../queries';
import { ALL_PERSONS } from './../queries';

const PhoneForm = ({ setError, name }) => {
  const [newName, setNewName] = useState('');
  const [phone, setPhone] = useState('');

  const [changeNumber, result] = useMutation(EDIT_NUMBER, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
    onError: error => {
      setError(error.graphQLErrors[0].message);
    },
  });
  //console.log(result.data);

  const submit = event => {
    event.preventDefault();

    changeNumber({ variables: { name, newName, phone } });

    //setName('');
    setPhone('');
  };
  // ???????????
  // useEffect(() => {
  //   if (result.data && result.data.editNumber === null) {
  //     setError('person not found');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [result.data]);

  return (
    <div
      style={{
        margin: '20px 0px 0px',
        paddingBottom: '5px',
        borderTop: '1px solid black',
      }}
    >
      <h4>Modifica dati contatto</h4>
      <form onSubmit={submit}>
        {/* <div>
          name <input value={name} />
        </div> */}
        <div>
          newName{' '}
          <input
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
          />
        </div>
        <div>
          phone{' '}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button style={{ marginTop: '20px' }} type="submit">
          salva
        </button>
      </form>
    </div>
  );
};

export default PhoneForm;

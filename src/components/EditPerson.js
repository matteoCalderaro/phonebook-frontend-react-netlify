import { useMutation, useQuery } from '@apollo/client';
import {
  ALL_PERSONS,
  CREATE_FRIEND,
  REMOVE_COLLEGUE,
  REMOVE_FRIEND,
  USER,
} from '../queries';
import EditPersonBox from './EditPersonBox.js';
//import EditPersonTab2 from './EditPersonTab2';
import { CREATE_COLLEGUE } from './../queries';

const EditPerson = ({ persons, person, setNameToSearch, show, setError }) => {
  console.log(persons);
  console.log(person);
  // CREAZIONE AMICO
  const [createFriend] = useMutation(CREATE_FRIEND, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const addFriend = name => {
    createFriend({ variables: { name } });
    //setNameToSearch(null);
    //setPage('amici');
  };
  // CREAZIONE COLLEGA
  const [createCollegue] = useMutation(CREATE_COLLEGUE, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const addCollegue = name => {
    createCollegue({ variables: { name } });
    //setNameToSearch(null);
    //setPage('amici');
  };

  // CANCELLAZIONE AMICO -----
  const [removeFriend] = useMutation(REMOVE_FRIEND, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const deleteFriend = name => {
    removeFriend({ variables: { name } });
    //setNameToSearch(null);
    //setPage('amici');
  };
  // CANCELLAZIONE COLLEGA -----
  const [removeCollegue] = useMutation(REMOVE_COLLEGUE, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const deleteCollegue = name => {
    removeCollegue({ variables: { name } });
    //setNameToSearch(null);
    //setPage('amici');
  };

  // TUTTE LE PERSONE-------
  console.log('tutte le persone', persons);

  // AMICI ATTUALI-----
  const amici = useQuery(USER);
  const amiciAttuali = amici.data.me.friends.map(a => a.name);
  console.log('amici attuali', amiciAttuali);

  // COLLEGHI ATTUALI-----
  const colleghi = useQuery(USER);
  if (colleghi.loading) {
    return null;
  }
  if (amici.loading) {
    return null;
  }
  const colleghiAttuali = colleghi.data.me.collegues.map(a => a.name);
  console.log('amici attuali', colleghiAttuali);

  // VERIFICA SE LA PERSONA E' AMICA----
  console.log('persona attuale', person.name);
  const isFriend = amiciAttuali.includes(person.name);
  console.log('è amico?', isFriend);

  // VERIFICA SE LA PERSONA E' COLLEGA----
  console.log('persona attuale', person.name);
  const isCollegue = colleghiAttuali.includes(person.name);
  console.log('è collega?', isCollegue);

  if (!show) return null;
  return (
    <div id="editPersonContainer">
      <EditPersonBox
        person={person}
        addFriend={addFriend}
        deleteFriend={deleteFriend}
        isFriend={isFriend}
        addCollegue={addCollegue}
        deleteCollegue={deleteCollegue}
        isCollegue={isCollegue}
        setError={setError}
      />
      <button id="closeButton" onClick={() => setNameToSearch(null)}>
        torna ai contatti
      </button>
    </div>
  );
};

export default EditPerson;

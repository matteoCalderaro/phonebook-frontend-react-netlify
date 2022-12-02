import { useMutation, useQuery } from '@apollo/client';
import { ALL_PERSONS, CREATE_FRIEND, REMOVE_FRIEND, USER } from '../queries';
import PersonDetailTab1 from './PersonDetailTab1';
import PersonDetailTab2 from './PersonDetailTab2';

const PersonDetail = ({ persons, person, setNameToSearch, show, setError }) => {
  // CREAZIONE AMICO
  const [createFriend, result] = useMutation(CREATE_FRIEND, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const addFriend = name => {
    createFriend({ variables: { name } });
    //setNameToSearch(null);
    //setPage('amici');
  };
  console.log(result.data);

  // CANCELLAZIONE AMICO -----
  const [removeFriend] = useMutation(REMOVE_FRIEND, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const deleteFriend = name => {
    removeFriend({ variables: { name } });
    //setNameToSearch(null);
    //setPage('amici');
  };

  // TUTTE LE PERSONE-------
  console.log('tutte le persone', persons);

  // AMICI ATTUALI-----
  const amici = useQuery(USER);
  if (amici.loading) {
    return null;
  }
  const amiciAttuali = amici.data.me.friends.map(a => a.name);
  console.log('amici attuali', amiciAttuali);

  // VERIFICA SE LA PERSONA E' AMICA----
  console.log('persona attuale', person.name);
  const isFriend = amiciAttuali.includes(person.name);
  console.log('è amico?', isFriend);

  if (!show) return null;
  return (
    <div id="personDetailContainer">
      <div id="personDetailBox">
        <PersonDetailTab1
          person={person}
          isFriend={isFriend}
          deleteFriend={deleteFriend}
          addFriend={addFriend}
        />
        <PersonDetailTab2 setError={setError} name={person.name} />

        <button id="closeButton" onClick={() => setNameToSearch(null)}>
          torna ai contatti
        </button>
      </div>
    </div>
  );
};

export default PersonDetail;

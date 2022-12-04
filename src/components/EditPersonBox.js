import ButtonFriends from './ButtonFriends';
import EditPersonForm from './EditPersonForm';
import ButtonCollegues from './ButtonCollegues';
const EditPersonBox = ({
  person,
  isFriend,
  deleteFriend,
  addFriend,
  setError,
  addCollegue,
  deleteCollegue,
  isCollegue,
  setNameToSearch,
}) => {
  return (
    <div id="editPersonBox">
      <h4>Modifica dati contatto</h4>

      <EditPersonForm
        setError={setError}
        person={person}
        setNameToSearch={setNameToSearch}
      >
        <ButtonFriends
          person={person}
          addFriend={addFriend}
          deleteFriend={deleteFriend}
          isFriend={isFriend}
        />
        <ButtonCollegues
          person={person}
          addCollegue={addCollegue}
          deleteCollegue={deleteCollegue}
          isCollegue={isCollegue}
        />
      </EditPersonForm>
    </div>
  );
};

export default EditPersonBox;

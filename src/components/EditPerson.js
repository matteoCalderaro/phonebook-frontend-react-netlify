import EditPersonForm from './EditPersonForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const EditPerson = ({ person, setNameToSearch, show, setError }) => {
  if (!show) return null;
  return (
    <div className="standardContainer">
      <div className="editPersonBox">
        <h2>Modifica dati contatto</h2>
        <div id="editPersonForm">
          <EditPersonForm
            setError={setError}
            person={person}
            setNameToSearch={setNameToSearch}
          />
        </div>
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          size="2x"
          style={{ color: 'black' }}
          onClick={() => {
            setNameToSearch(null);
          }}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default EditPerson;

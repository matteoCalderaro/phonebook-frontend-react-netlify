import { useQuery } from '@apollo/client';
import { USER } from '../../queries';
import PersonCard from './PersonCard';

const Collegues = ({ persons, show, setPage }) => {
  const result = useQuery(USER);
  console.log(result);

  if (result.loading) {
    return null;
  }
  if (!show) {
    return null;
  }
  console.log('tutti', persons);
  console.log('amici', result.data.me.collegues);
  const contactsSorted = result.data.me.collegues.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  console.log(contactsSorted);

  if (contactsSorted.length === 0)
    return (
      <>
        <div className="headerList" style={{ top: '40px' }}>
          <h2>Colleghi</h2>
        </div>
        <div className="personsList">
          <div style={{ position: 'fixed' }}>nessun collega</div>
        </div>
      </>
    );

  return (
    <>
      <div className="headerList" style={{ top: '40px' }}>
        <h2>Colleghi</h2>
      </div>
      <div className="personsList">
        <PersonCard contactsSorted={contactsSorted} />
      </div>
    </>
  );
};

export default Collegues;

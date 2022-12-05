import { useQuery } from '@apollo/client';
import { USER } from '../../queries';
import PersonCard from './PersonCard';

const Friends = ({ persons, show, setPage }) => {
  const result = useQuery(USER);
  console.log(result);

  if (result.loading) {
    return null;
  }
  if (!show) {
    return null;
  }
  console.log('tutti', persons);
  console.log('amici', result.data.me.friends);
  const contactsSorted = result.data.me.friends.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  console.log(result.data.me.friends);

  if (contactsSorted.length === 0)
    return (
      <>
        <div className="header" style={{ top: '40px' }}>
          <h2>Amici</h2>
        </div>
        <div className="listContainer">
          <h2 style={{ color: '#E9E9E6' }}>nessun amico inserito...</h2>
        </div>
      </>
    );

  return (
    <>
      <div className="header" style={{ top: '40px' }}>
        <h2>Amici</h2>
      </div>
      <div className="listContainer">
        <PersonCard contactsSorted={contactsSorted} />
      </div>
    </>
  );
};

export default Friends;

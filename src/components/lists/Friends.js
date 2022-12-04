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
      <div id="listContainer">
        <div style={{ position: 'fixed' }}>nessun amico</div>
      </div>
    );

  return (
    <div id="listContainer">
      <PersonCard contactsSorted={contactsSorted} />
    </div>
  );
};

export default Friends;

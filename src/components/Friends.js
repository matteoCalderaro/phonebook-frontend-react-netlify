import { useQuery } from '@apollo/client';
import { USER } from '../queries';

const Friends = ({ persons, show }) => {
  const result = useQuery(USER);

  if (result.loading) {
    return null;
  }
  if (!show) {
    return null;
  }
  console.log('tutti', persons);
  console.log('amici', result.data.me.friends);
  const amici = result.data.me.friends;

  return (
    <div>
      {amici.map((a, index) => (
        <div key={index}>{a.name}</div>
      ))}
    </div>
  );
};

export default Friends;

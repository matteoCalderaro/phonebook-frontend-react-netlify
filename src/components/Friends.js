import { useQuery } from '@apollo/client';
import { USER } from '../queries';

const Friends = ({ persons, show, setPage }) => {
  const result = useQuery(USER);

  if (result.loading) {
    return null;
  }
  if (!show) {
    return null;
  }
  console.log('tutti', persons);
  console.log('amici', result.data.me.friends);
  const amiciSorted = result.data.me.friends.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  console.log(amiciSorted);

  return (
    <div id="friendsList">
      {amiciSorted.map((a, index) => (
        <div
          key={index}
          style={{
            borderBottom: 'dotted 1px #0b0a0a',
            paddingBottom: '8px',
          }}
        >
          <h3
            style={{
              marginBottom: '0',
              marginTop: '8px',
            }}
          >
            name: {a.name}
          </h3>
          <div>phone: {a.phone}</div>
          <div>street: {a.address.street}</div>
          <div>city: {a.address.city}</div>
          {/* <button onClick={() => setPage('persons')}>boo</button> */}
        </div>
      ))}
    </div>
  );
};

export default Friends;

const PersonCard = ({ contactsSorted }) => {
  return (
    <>
      {contactsSorted.map((a, index) => (
        <table className="personCard" key={index}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>name:</td>
              <td style={{ fontWeight: 600 }}>{a.name}</td>
            </tr>
            <tr>
              <td>phone:</td>
              <td>{a.phone}</td>
            </tr>
            <tr>
              <td>street:</td>
              <td>{a.address.street}</td>
            </tr>
            <tr>
              <td>city:</td>
              <td>{a.address.city}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
};

export default PersonCard;

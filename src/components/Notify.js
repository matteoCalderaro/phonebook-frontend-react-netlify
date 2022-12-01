const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div id="notify" style={{ color: 'red' }}>
      {errorMessage}
    </div>
  );
};
export default Notify;

const Notification = ({ message, successMessage }) => {
  if (message === null) {
    return null;
  }

  return (
    <div>
      <div className="error">{message}</div>
      <div className="success">{successMessage}</div>
    </div>
  );
};
export default Notification;

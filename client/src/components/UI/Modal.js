import "./Modal.css";

const Modal = (props) => {
  function cancelHandler() {
    props.onCancel();
  }

  function confirmHandler() {
    props.onConfirm();
  }

  return (
    <div className="modal">
      <div className="modal__title">{props.title}</div>
      <div className="modal__content">{props.children}</div>
      <button className="modal__cancel" onClick={cancelHandler}>
        Cancel
      </button>
      <button className="modal__confirm" onClick={confirmHandler}>
        Confirm
      </button>
    </div>
  );
};

export default Modal;

import "./modal.css"

const Modal = (props:AppProps) => {
  const showHideClassName = props.show ? "mdl132Modal mdl133DisplayBlock" : "mdl132Modal mdl136DisplayNone";

  return (
    <div className={showHideClassName}>
      <section className="mdl134ModalMain">
        <div>{props.children}</div>
        <div className="mdl135ModalButton" onClick={props.hideModal}>✘</div>
      </section>
    </div>
  );
};

type AppProps = {
  show: boolean;
  children: React.ReactNode;
  hideModal: any;
}

export default Modal;
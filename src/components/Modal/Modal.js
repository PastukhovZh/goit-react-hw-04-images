import { Backdrop,ModalPictures } from "./Modal.styled";
import { PropTypes } from 'prop-types';
import { useEffect } from "react";



export const Modal = ({imageURL, onClose, tags }) => {
 
  useEffect(() => {

const handleClick = e => {
    if(e.code === 'Escape') {
      onClose()
    }
  }

     window.addEventListener('keydown', handleClick)
  
    return () => {
      window.removeEventListener('keydown', handleClick)
    }
  }, [onClose])
 
  
  return (
      <Backdrop onClick={onClose}>
        <ModalPictures src={imageURL} alt={tags} />
      </Backdrop>
    );
}
Modal.propTypes = {
  imageURL: PropTypes.string,
  onClose: PropTypes.func,
};

import { Img } from "./ImageGalleryItem.styled";
import { PropTypes } from 'prop-types';



export const ImageGalleryItem = ({image, onClick}) => {

    const openModal = () => {
      onClick(image.largeImageURL)
    }

  return (
        <Img
          src={image.webformatURL}
          alt={image.tags}
          onClick={openModal} />
      )
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired, 
  onClick: PropTypes.func.isRequired, 
};
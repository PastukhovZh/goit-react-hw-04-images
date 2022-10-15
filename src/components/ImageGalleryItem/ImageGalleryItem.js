import { Component, useEffect } from "react";
import { Img } from "./ImageGalleryItem.styled";
import { PropTypes } from 'prop-types';

export class OldImageGalleryItem extends Component {

  openModal = () => {
  this.props.onClick(this.props.image.largeImageURL)
  }
  
  render() {
    const { image } = this.props
    return (

        <Img
          src={image.webformatURL}
          alt={image.tags}
          onClick={this.openModal} />

      )
}
}

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
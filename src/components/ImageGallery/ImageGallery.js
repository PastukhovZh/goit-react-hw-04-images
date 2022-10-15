import { getPictures } from "api";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryItem } from "components/ImageGalleryItem/ImageGalleryItem.styled";
import { Loader } from "components/Loader/Loader";
import { Component } from "react"
import { toast } from "react-toastify";
import { Gallery } from "./ImageGallery.styled";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { ButtonWrap } from "components/Button/Button.styled";

import { PropTypes } from 'prop-types';

export class ImageGallery extends Component {
    state = {
    page: 1,
    pictures: [],
    loading: false,
    imageURL: null,
    isModalOpen: false,
    }

    componentDidUpdate(prevProps, _) {
        if (prevProps.input !== this.props.input) {
      this.setState({ loading: true });
            getPictures(this.props.input, this.state.page).then(response => {
        if (response.length > 0) {
            this.setState({ pictures: [...response], loading: false });
        } else {
          this.setState({ loading: false });
          toast.error('Wrong request');
          this.setState({ pictures: [] })
        } 
      });
        }
    }
        openModal = imageURL => {
    this.setState({ isModalOpen: true, imageURL: imageURL });
  };
    closeModal = () => this.setState({ isModalOpen: false, modalUrl: null });
    

    loadMore = () => {
    // this.setState(prevState => ({ page: prevState.page + 1 }));
    this.setState({ loading: true });
    getPictures(this.props.input, this.state.page + 1).then(response => {
      this.setState({
        pictures: [...this.state.pictures, ...response],
        loading: false,
      });
    });
      return
  };
    render() {
        return (
            <>
                {this.state.loading && <Loader/>}
            <Gallery className="gallery">
                {this.state.pictures.map(picture => (
                <GalleryItem key={picture.id}>
                    <ImageGalleryItem image={picture} onClick={this.openModal} />
                </GalleryItem>
                ))}
            </Gallery>
                {this.state.isModalOpen && <Modal imageURL={this.state.imageURL} onClose={this.closeModal} />}
                <ButtonWrap>
                {this.state.pictures.length > 0 && <Button loadMore={this.loadMore} />}
                </ButtonWrap>
            </>
        )
    }
}


ImageGallery.propTypes = {
  input: PropTypes.string.isRequired,
};
import { getPictures } from "api";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryItem } from "components/ImageGalleryItem/ImageGalleryItem.styled";
import { Loader } from "components/Loader/Loader";
import { Component, useEffect, useState } from "react"
import { toast } from "react-toastify";
import { Gallery } from "./ImageGallery.styled";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { ButtonWrap } from "components/Button/Button.styled";

import { PropTypes } from 'prop-types';

export class OldImageGallery extends Component {
    state = {
    page: 1,
    pictures: [],
    loading: false,
    imageURL: null,
    isModalOpen: false,
    }

    componentDidUpdate(prevProps, _) {
      if (prevProps.input !== this.props.input) {
        this.setState({ page: 1})
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
    this.setState(prevState => ({ page: prevState.page + 1 }));
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


export const ImageGallery = ({input}) => {
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([])
  const [loading, setLoading] = useState(false)
  const [imageURL, setImageURL] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)


  
  
  useEffect(() => {
    if (input!== '') {
          setLoading(true)
      getPictures(input, page).then(response => {
        if (response.length > 0) {

          setPictures([...response], setLoading(false))

        } else {
          setLoading(false)
          toast.error('Wrong request');
        }
      });
    }

      return () => {
        setPage(1)
        setPictures([])
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input])
  
  const openModal = (imageURL) => {
    setIsModalOpen(true)
    setImageURL(imageURL)
  }
  const closeModal = () => {
  setIsModalOpen(false)
  
}
// const pictureId =pictures.filter(picture=>console.log(picture.id))
  const loadMore = () => {
    setLoading(true)
    
    getPictures(input, page + 1).then(response => {
      setPictures([...pictures, ...response])
      setPage(page + 1)
      setLoading(false)
    });
    return
  }
  
   return (
            <>
                {loading && <Loader/>}
            <Gallery className="gallery">
                {pictures.map(picture => (
                <GalleryItem key={picture.id}>
                    <ImageGalleryItem image={picture} onClick={openModal} />
                </GalleryItem>
                ))}
            </Gallery>
                {isModalOpen && <Modal imageURL={imageURL} onClose={closeModal} />}
                <ButtonWrap>
                {pictures.length > 0 && <Button loadMore={loadMore} />}
                </ButtonWrap>
            </>
        )
}

ImageGallery.propTypes = {
  input: PropTypes.string.isRequired,
};
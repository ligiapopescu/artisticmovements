import React, { Component } from "react";
import axios from "axios";
import './UploadArtwork.css';

const ImageWithLabel = (props) => {
    const classes = 'image-with-label ' + props.className;

    return (
        <div className={classes}>
            <div className="section__title">{props.title}</div>
            <div className="section__description">{props.description}</div>
            <div className="section__content" >
                {props.children} 
            </div>
        </div>);
};


class UploadArtwork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaded: false,
            file: null
        };

        this.handleChange = this.handleChange.bind(this);
    } 

    handleChange(change) {
        const loadedFile = change.target.files[0];//
        
        let formData = new FormData();
        formData.append("title", "Uploaded by user");
        formData.append("artwork_image", loadedFile);
        formData.append("uploaded_by_user", true);

        axios.post('/api/artworks/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log('response success', response);
            })
            .catch((response) => {
                console.log('response error:', response)
            });


        this.setState({
            file: URL.createObjectURL(loadedFile)
        });
    }

    addBanner() {

    }

    render() {
        return (
            <div className={"upload " + this.props.className}>
                {!this.state.file ?
                    (<div>
                        <label className="upload__image" for="imageUpload"></label>
                        <input
                            id="imageUpload"
                            ref="file"
                            type="file"
                            name="user[image]"
                            multiple={false}
                            onChange={this.handleChange} />
                    </div>) :
                    (<div>
                        <img className="uploaded__image" src={this.state.file} />
                        <div className="image-label"></div>
                    </div>)}
            </div>
        );
    }
}

export default UploadArtwork;
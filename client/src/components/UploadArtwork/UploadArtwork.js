import React, { Component } from "react";
import axios from "axios";
import './UploadArtwork.css';
import ImageWithLabel from '../UI/ImageWithLabel'

class UploadArtwork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaded: false,
            file: null,
            label: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
                const predictions = response.data.map(prediction =>
                    prediction.className + " - " +
                    Number(prediction.classPercent).toFixed(2) + "%")
                this.setState({
                    label: predictions.join(" \n")
                });
            })
            .catch((response) => {
                console.log('response error:', response)
            });


        this.setState({
            file: URL.createObjectURL(loadedFile),
        });
    }

    handleClick() {
        this.setState({
            file: null,
            label: null
        });
    }

    render() {
        return (
            <div className={"upload " + this.props.className}>
                {!this.state.file ?
                    (<div className="upload__image-container">
                        <label className="upload__image" for="imageUpload"></label>
                        <input
                            id="imageUpload"
                            ref="file"
                            type="file"
                            name="user[image]"
                            multiple={false}
                            onChange={this.handleChange} />
                    </div>) :
                    (
                        <div className="upload__loaded-image">
                            <div className="upload__clear-image" onClick={this.handleClick}></div>
                            <ImageWithLabel
                                image={this.state.file}
                                label={this.state.label}
                            />
                        </div>
                    )}
            </div>
        );
    }
}

export default UploadArtwork;
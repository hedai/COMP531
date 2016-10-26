import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadArticle } from './articleActions'

class NewArticle extends Component {

    handleImageChange(e) {
        e.preventDefault()

        let reader = new window.FileReader();
        reader.onloadend = () => {
            this.preview = reader.result
            this.forceUpdate();
        }

        this.file = e.target.files[0];
        if (typeof(this.file) == 'Blob')
            reader.readAsDataURL(this.file)
    }

    render() { return (
        <div className="well" id="uploadBox">

            <div className="form-group">

                <label>Upload Image</label>
                <input type="file" id="articleImage" className="btn btn-default form-control" accept="image/*" onChange={(e) => this.handleImageChange(e)}/>

                <br/>
                    <label>New post:</label>
                    <textarea className="form-control"
                      rows="3" placeholder="Your post here"
                      value={ this.message }
                      onChange={(e) => {
                        this.message = e.target.value
                        this.forceUpdate();
                    }}>
                    </textarea>

                { !this.file && !this.message ? '' :
                    <div className="col-sm-2">
                        <div className="text-right">
                            <input className="btn btn-primary" type="button" value="Post"
                                onClick={() => {
                                    this.props.dispatch(uploadArticle(this.message, this.file))
                                    this.message = ''
                                    this.file = undefined
                                    this.forceUpdate()
                                }}/>
                        </div>
                    </div>
                }
                
            </div>

        </div>
    )}
}

export default connect()(NewArticle)
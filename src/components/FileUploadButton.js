import React from 'react';
import { Button } from '@material-ui/core';

class FileUploadButton extends React.Component {
    constructor(props) {
        super(props);

        // Refs.
        this.nativeInputRef = React.createRef();

        // Method Bindings.
        this.handleClick = this.handleClick.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    render() {
        let nativeInputStyle = {
            display: 'none'
        }

        return (
            <React.Fragment>
                <Button variant="contained" onClick={this.handleClick}> Upload </Button>
                <input style={nativeInputStyle} ref={this.nativeInputRef} type="file" onChange={this.handleFileChange}/>
            </React.Fragment>
        )
    }
    
    handleFileChange(e) {
        if (e.target.files.length > 0) {
            let file = e.target.files[0];
            this.props.onFileUpload(file);
        }
    }

    handleClick() {
        if (this.nativeInputRef.current !== null) {
            this.nativeInputRef.current.click();
        }
    }
}

export default FileUploadButton;
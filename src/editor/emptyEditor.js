import React from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import './editor.css'

function EmptyEditorComponent() {


        return(
            <div className='editorContainer'>
                <BorderColorIcon className='editIcon' />
                <input
                    className='titleInput'
                    placeholder='Please select or create a note...'
                    disabled>
                </input>
                <ReactQuill>
                </ReactQuill>
            </div>
        );
}
export default EmptyEditorComponent;
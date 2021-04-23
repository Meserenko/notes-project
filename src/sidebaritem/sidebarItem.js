import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';
import './sidebarItem.css'

class SidebarItemComponent extends React.Component {

    render() {


        function getTime(timestamp) {
            let date = new Date(timestamp * 1000);
            let year = date.getFullYear();
            let month = ("0" + (date.getMonth() + 1)).substr(-2);
            let day = ("0" + date.getDate()).substr(-2);
            let hour = ("0" + date.getHours()).substr(-2);
            let minutes = ("0" + date.getMinutes()).substr(-2);
            let seconds = ("0" + date.getSeconds()).substr(-2);

            return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        }

        const { _index, _note, selectedNoteIndex } = this.props;

        return(
            <div key={_index}>
                <ListItem
                    className='listItem'
                    selected={selectedNoteIndex === _index}>
                    <div
                        className='textSection'
                        onClick={() => this.selectNote(_note, _index)}>
                        <p><b>{_note.title}</b></p>
                        <p className='textSectionBody'>{removeHTMLTags(_note.body.substr(0, 20)) + '...'}</p>
                        <p>{getTime(_note.timestamp)}</p>
                    </div>
                    <DeleteIcon onClick={() => this.deleteNote(_note)}
                                className='deleteIcon' />
                </ListItem>
            </div>
        );
    }
    selectNote = (n, i) => this.props.selectNote(n, i);
    deleteNote = (note) => {
        if(window.confirm(`Are you sure you want to delete: ${note.title}`)) {
            this.props.deleteNote(note);
        }
    }

}

export default SidebarItemComponent;
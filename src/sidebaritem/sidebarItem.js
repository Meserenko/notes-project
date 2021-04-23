import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';
import './sidebarItem.css'

class SidebarItemComponent extends React.Component {

    render() {

       function timeConverter(timestamp) {
            let a = new Date(timestamp * 1000),
                months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                year = a.getFullYear(),
                month = months[a.getMonth()],
                date = a.getDate(),
                hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours(),
                min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
                sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds(),
                time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec

            return time;
        }

        const { _index, _note, selectedNoteIndex } = this.props;

        return(
            <div key={_index} onClick={() => this.selectNote(_note, _index)}>
                <ListItem
                    className='listItem'
                    selected={selectedNoteIndex === _index}>
                    <div className='textSection'>
                        <p><b>{_note.title}</b></p>
                        <p className='textSectionBody'>{removeHTMLTags(_note.body.substr(0, 20)) + '...'}</p>
                        <p>{timeConverter(_note.timestamp)}</p>
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
import React from 'react';
import SidebarItemComponent from '../sidebaritem/sidebarItem';
import './sidebar.css'
import {BsPlusSquare} from 'react-icons/bs'
import {ImCancelCircle} from 'react-icons/im'
import {MdDone} from 'react-icons/md'

class SidebarComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            addingNote: false,
            title: null,
            search: ''
        };
    }

    updateSearch = (e) => {
        this.setState({search: e.target.value})
    }

    render() {

        const {notes, selectedNoteIndex} = this.props;

        if (notes) {
            notes.sort((a, b) => b.timestamp - a.timestamp)
            let filteredNotes = notes.filter(note => {
                return note.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || note.body.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            });
            return (
                <div className='sidebarContainer'>
                    <button
                        onClick={this.newNoteBtnClick}
                        className='newNoteBtn'>{this.state.addingNote ? <BsPlusSquare className='addingNoteDisplayNone'/> : <BsPlusSquare />}</button>

                    {
                        this.state.addingNote ?
                            <div>
                                <div>
                                    <input type='text'
                                           className='newNoteInput'
                                           placeholder='Enter note title'
                                           onKeyUp={(e) => this.updateTitle(e.target.value)}>
                                    </input>
                                </div>
                                <div className='cancelSubmitBtn'>
                                    <button onClick={this.newNoteBtnClick} className='newNoteBtn'><ImCancelCircle /></button>
                                    <button className='newNoteSubmitBtn' onClick={this.newNote}><MdDone/></button>
                                </div>
                            </div>:
                            null
                    }
                    <input type="text"
                           className='newNoteInput'
                           value={this.state.search}
                           onChange={this.updateSearch}
                           placeholder='Search note by name or body'/>
                    <div className='notesList'>
                        {  filteredNotes.length ?
                            filteredNotes.map((_note, _index) => {
                                return (
                                    <div key={_index} className='note'>
                                        <SidebarItemComponent
                                            _note={_note}
                                            _index={_index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            selectNote={this.selectNote}
                                            deleteNote={this.deleteNote}>
                                        </SidebarItemComponent>
                                    </div>
                                )
                            }) :
                            <div><b>Nothing was found for your request</b></div>
                        }
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

    newNoteBtnClick = () => {
        this.setState({title: 'New note', addingNote: !this.state.addingNote});
    }
    updateTitle = (txt) => {
        this.setState({title: txt});
        if(!txt) {
            this.setState({title: 'New note'})
        }
    }
    newNote = () => {
        this.props.newNote(this.state.title);
        this.setState({title: null, addingNote: false});
    }
    selectNote = (n, i) => this.props.selectNote(n, i);
    deleteNote = (note) => this.props.deleteNote(note);

}

export default SidebarComponent;
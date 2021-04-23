import React from 'react';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import firebase from 'firebase'
import './App.css';
import {AiOutlineUnorderedList, AiOutlineTable} from 'react-icons/ai'
import { IoChevronBack } from 'react-icons/io5'
import EmptyEditorComponent from "./editor/emptyEditor";



class App extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedNoteIndex: null,
            selectedNote: null,
            notes: null,
            tableLook: false
        };
    }

    clickToNotes = () => {
        this.setState({selectedNote: !this.state.selectedNote})
    }

    switchToTable = () => {
        this.setState({list: true})
    }

    switchToList = () => {
        this.setState({list: false})
    }

    tableLook = () => {
        return (
            <div className="app-container">
                {
                    this.state.selectedNote ?
                        <div className='editorContainer'>
                            <button onClick={this.clickToNotes} className='switchBtn'> <IoChevronBack /></button>
                            <EditorComponent selectedNote={this.state.selectedNote}
                                             selectedNoteIndex={this.state.selectedNoteIndex}
                                             notes={this.state.notes}
                                             noteUpdate={this.noteUpdate}/>
                        </div>
                        :
                        <SidebarComponent
                            selectedNoteIndex={this.state.selectedNoteIndex}
                            notes={this.state.notes}
                            deleteNote={this.deleteNote}
                            selectNote={this.selectNote}
                            newNote={this.newNote}/>
                }
            </div>
        )
    }



    render() {

        return (
        <div id='root'>
            <div className='switchBtnContainer'>
                <button className='switchBtn' onClick={this.switchToTable}><AiOutlineUnorderedList /></button>
                <button className='switchBtn' onClick={this.switchToList}><AiOutlineTable /></button>
            </div>
            <div className="app-container">


                { this.state.list ?
                    <div className="app-container">
                        <SidebarComponent
                            selectedNoteIndex={this.state.selectedNoteIndex}
                            notes={this.state.notes}
                            deleteNote={this.deleteNote}
                            selectNote={this.selectNote}
                            newNote={this.newNote} />
                        {
                            this.state.selectedNote ?
                                <EditorComponent selectedNote={this.state.selectedNote}
                                                 selectedNoteIndex={this.state.selectedNoteIndex}
                                                 notes={this.state.notes}
                                                 noteUpdate={this.noteUpdate} /> :
                                <div><EmptyEditorComponent /></div>
                        }
                    </div> :
                    this.tableLook()
                }

            </div>
        </div>

        );
    }

    componentDidMount = () => {
        firebase
            .firestore()
            .collection('notes')
            .onSnapshot(serverUpdate => {
                const notes = serverUpdate.docs.map(_doc => {
                    const data = _doc.data();
                    data['id'] = _doc.id;
                    return data;
                });
                    this.setState({notes: notes});
            });
    }


    selectNote = (note, index) => this.setState({selectedNoteIndex: index, selectedNote: note});
    noteUpdate = async (id, noteObj) => {
       await firebase
            .firestore()
            .collection('notes')
            .doc(id)
            .update({
                title: noteObj.title,
                body: noteObj.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
    }
    newNote = async (title) => {
        const note = {
            title: title,
            body: ''
        };
        const newFromDB = await firebase
            .firestore()
            .collection('notes')
            .add({
                title: note.title,
                body: note.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        const newID = newFromDB.id;
        await this.setState({notes: [...this.state.notes, note]});
        const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
        this.setState({selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
    }
    deleteNote = async (note) => {
        const noteIndex = this.state.notes.indexOf(note);
        await this.setState({notes: this.state.notes.filter(_note => _note !== note)});
        if (this.state.selectedNoteIndex === noteIndex) {
            this.setState({selectedNoteIndex: null, selectedNote: null});
        } else {
            this.state.notes.length > 1 ?
                this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
                this.setState({selectedNoteIndex: null, selectedNote: null});
        }

        await firebase
            .firestore()
            .collection('notes')
            .doc(note.id)
            .delete();
    }
}

export default App;
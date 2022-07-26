import React, { useEffect, useState } from 'react'
import './App.scss'

// Component
import Editor from './components/Editor/index'
import Sidebar from './components/Sidebar/index'
import Split from 'react-split'
import { nanoid } from 'nanoid'

function App() {
  const [notes, setNotes] = useState(JSON.parse(() => localStorage.getItem('notes')) || [])
  const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || '')

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: `# Type your makedown note's title here`
    }

    setNotes((prev) => [newNote, ...prev])
    setCurrentNoteId(newNote.id)

    console.log(`create new note`)
  }

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId ? { ...oldNote, body: text } : oldNote
      })
    )
  }

  function findCurrentNote() {
    return notes.find((note) => note.id === currentNoteId) || notes[0]
  }

  return (
    <main className="c-container">
      <div className="c-container__wrap"></div>
      {notes.length > 0 ? (
        <Split
          sizes={[20, 80]}
          minSize={200}
          expandToMin={false}
          gutterSize={20}
          gutterAlign="center"
          // snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
          className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="c-no-notes">
          <h1 className="c-title">You have no notes</h1>
          <button className="c-create-btn pointer" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  )
}

export default App

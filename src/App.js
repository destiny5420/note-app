import React, { useEffect, useState } from 'react'
import './App.scss'

// Plugin
import Split from 'react-split'
import { nanoid } from 'nanoid'

// Component
import Editor from 'components/Editor/index'
import Sidebar from 'components/Sidebar/index'
import Button from '@mui/material/Button'

function App() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || [])
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
  }

  function noteIsFirst(id) {
    return notes[0].id === id
  }

  function updateNote(text) {
    setNotes((oldNotes) => {
      let newArray = null

      if (noteIsFirst(currentNoteId)) {
        newArray = oldNotes.map((oldNote) => {
          return oldNote.id === currentNoteId ? { ...oldNote, body: text } : oldNote
        })

        return newArray
      }

      newArray = []
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i]
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text })
        } else {
          newArray.push(oldNote)
        }
      }

      return newArray
    })
  }

  function deleteNote(event, noteId) {
    // console.log(`delete note / noteID: `, noteId)
    event.stopPropagation()

    // 1. way 01
    // setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId))

    // 2. way 02
    // const newAay = notes
    const newAry = notes.filter((note) => note.id !== noteId)
    setNotes(newAry)
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
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="c-no-notes">
          <h1 className="c-title">✏️ This is a note app built with react</h1>
          <h2 className="c-subTitle">
            maybe you can use it to record your life or do something your want
          </h2>
          <Button
            className="c-create-btn"
            variant="contained"
            color="success"
            onClick={createNewNote}>
            Create one now
          </Button>
        </div>
      )}
    </main>
  )
}

export default App

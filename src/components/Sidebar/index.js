import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const SideBar = (props) => {
  const { notes, currentNote, setCurrentNoteId, newNote, deleteNote } = props

  const noteElements = notes.map((note, index) => {
    const snippetText = note.body.split('\n')[0]

    return (
      <div
        key={note.id}
        className={`c-title relative pointer ${note.id === currentNote.id ? 'is-selected' : ''}`}
        onClick={() => {
          setCurrentNoteId(note.id)
        }}>
        <h4 className="c-text-snippet">{snippetText}</h4>
        <button className="c-delete-btn pointer" onClick={(e) => deleteNote(e, note.id)}>
          刪除
        </button>
      </div>
    )
  })

  return (
    <section className="c-sidebar">
      <div className="c-header relative">
        <h3 className="c-title">Notes</h3>
        <button className="c-new-btn pointer" onClick={newNote}>
          +
        </button>
      </div>
      <div className="c-list">{noteElements}</div>
    </section>
  )
}

SideBar.propTypes = {
  notes: PropTypes.array,
  currentNote: PropTypes.object,
  setCurrentNoteId: PropTypes.func,
  newNote: PropTypes.func,
  deleteNote: PropTypes.func
}

export default SideBar

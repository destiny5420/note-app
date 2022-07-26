import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const SideBar = (props) => {
  const { notes, currentNote, setCurrentNoteId, newNote } = props

  const snippetText = currentNote.body.split('\n')[0]

  const noteElements = notes.map((note, index) => {
    return (
      <div key={note.id}>
        <div
          className={`c-title pointer ${note.id === currentNote.id ? 'is-selected' : ''}`}
          onClick={() => {
            setCurrentNoteId(note.id)
          }}>
          <h4 className="c-text-snippet">{snippetText}</h4>
        </div>
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
  newNote: PropTypes.func
}

export default SideBar

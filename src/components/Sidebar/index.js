/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import DeleteIcon from '@mui/icons-material/Delete'

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
          <DeleteIcon />
        </button>
      </div>
    )
  })

  return (
    <section className="c-sidebar">
      <div className="c-header relative">
        <h3 className="c-title">
          <div className="c-icon">
            <div className="o-image relative">
              <picture className="image-obj">
                <source media="(max-width: 640px)" srcSet={require('images/pencil-01.png')} />
                <img src={require('images/pencil-01.png')} alt="icon" className="w-full" />
              </picture>
            </div>
          </div>
          <span className="o-text">Note</span>
        </h3>
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

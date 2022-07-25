import React, { useState } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'
import PropTypes from 'prop-types'
import 'react-mde/lib/styles/css/react-mde-all.css'

const Editor = (props) => {
  const { currentNote, updateNote } = props

  const [selectedTab, setSelectTab] = useState('write')

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  })

  return (
    <section className="pane editor">
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectTab}
        generateMarkdownPreview={(markdown) => {
          Promise.resolve(converter.makeHtml(markdown))
        }}
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  )
}

Editor.propTypes = {
  currentNote: PropTypes.object,
  updateNote: PropTypes.func
}

export default Editor

import React, { lazy, useReducer } from "react"

const NoteList = lazy(() => import('./NoteList'))

const ACTION = {
  NOTES: 'note',
  TITLE: 'title',
  CONTENT: 'content',
  IS_ADD_NOTE: 'is_add_note',
  SEARCH: 'search'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.NOTES:
      return { ...state, notes: action.payload }
    case ACTION.TITLE:
      return { ...state, title: state.title}
    case ACTION.CONTENT:
      return { ...state, content: state.content }
    case ACTION.IS_ADD_NOTE:
      return { ...state, isAddNote: state.isAddNote }
    case ACTION.SEARCH:
      return { ...state, search: action.payload }
    default:
      throw new Error()
  }
}

const Home = ({ notes }) => {
  const [state, dispatch] = useReducer(reducer, { notes: notes, title: '', content: '', isAddNote: false, search: '' })

  return (
    <main>
      <NoteList notes={state.notes} />
      {/* <section className="note-detail">
        {
          state.isAddNote && (
            <NoteModal
              setTitle={setTitle}
              setContent={setContent}
              handleSubmit={handleSubmit}
              handleCancel={() => setIsAddNote(false)}
            />
          )
        }
        {!isAddNote && <NoteDetail handleAddNote={() => setIsAddNote(true)} />}
      </section> */}
    </main>
  )
}

export default Home
import './NoteList.css'
import NoteListItem from "./NoteListItem"

const NoteList = ({ notes }) => {
  return (
    <section className="note-list">
      <ul>
        {notes.map(note => (
          <NoteListItem note={note} key={note.noteId} />
        ))}
      </ul>
    </section>
  )
}

export default NoteList

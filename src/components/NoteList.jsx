import './NoteList.css'
import NoteListItem from "./NoteListItem"
import { useRecoilValue } from 'recoil'
import { NoteSelector } from '../recoil/NoteAtom'

const NoteList = ({ notes }) => {
  const selectedNoteId = useRecoilValue(NoteSelector);
  
  return (
    <section className="note-list">
      <ul>
        {notes.map(note => (
          <NoteListItem note={note} key={note.noteId} selectedNoteId={selectedNoteId} />
        ))}
      </ul>
    </section>
  )
}

export default NoteList

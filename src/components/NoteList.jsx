import { useState, useEffect } from 'react'
import NoteListItem from "./NoteListItem"
import { useRecoilValue } from 'recoil'
import { NoteSelector } from '../recoil/NoteAtom'
import './NoteList.scss'

const NoteList = ({ notes }) => {
  const selectedNoteId = useRecoilValue(NoteSelector);
  const [sortedNotes, setSortedNotes] = useState([])

  useEffect(() => {
    const sortedNoteLists = () => {
      const sortedObjects = [...notes].sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateA < dateB ? 1 : -1;
      });
      setSortedNotes(sortedObjects);
    };

    sortedNoteLists();
  }, [notes])

  return (
    <section className="note-list">
      <div className="grid-container"> 
        {sortedNotes.map(note => (
          <NoteListItem note={note} key={note.noteId} selectedNoteId={selectedNoteId} />
        ))}
      </div>
      <p>더보기</p>
    </section>
  )
}

export default NoteList

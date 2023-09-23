import { useState, useEffect, useCallback, useMemo } from 'react'
import NoteListItem from "./NoteListItem"
import NoteDetail from './NoteDetail'
import { useRecoilValue, useRecoilState } from 'recoil'
import { NoteAtom, NoteSelector } from '../recoil/NoteAtom'
import './NoteList.scss'

const NoteList = ({ notes }) => {
  const selectedNoteId = useRecoilValue(NoteSelector);
  const [noteItem, ] = useRecoilState(NoteAtom)
  const [sortedNotes, setSortedNotes] = useState([])

  // 계산 결과를 기억하고 매번 다시 계산되지 않도록 함
  // Compute sortedNotes2 using useMemo
  const memorizedSortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA;
    });
  }, [notes]);

  useEffect(() => {
    setSortedNotes(memorizedSortedNotes);
  }, [memorizedSortedNotes])

  const handleAddNote = useCallback(() => {

  }, [])

  return (
    <>
      <section className="note-list">
        <div className="grid-container"> 
          {sortedNotes.map(note => (
            <NoteListItem note={note} key={note.noteId} selectedNoteId={selectedNoteId} />
          ))}
        </div>
        <div>더보기</div>
      </section>
      {/* {noteItem &&
        <section className="note-detail">
          <NoteDetail handleAddNote={handleAddNote} />
        </section>
      } */}
    </>
  )
}

export default NoteList

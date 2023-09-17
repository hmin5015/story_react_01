import Typography from "@mui/material/Typography"
import { useRecoilState } from 'recoil'
import { NoteAtom } from '../recoil/NoteAtom'

const NoteListItem = ({ note }) => {
  const [, setNoteItem] = useRecoilState(NoteAtom)

  const defaultNote = {
    noteId: "발번되지 않음",
    userId: "발번되지 않음",
    title: "제목없음",
    content: "내용없음",
    createdAt: "미정",
    updatedAt: "미정",
  }

  note = { ...defaultNote, ...note };
  
  const AddToNote = () => {
    setNoteItem(note)
  }

  return (
    <li>
      <article className="p-15px" onClick={AddToNote}>
        <Typography variant="subtitle1" display="block" lineHeight={1.5} gutterBottom className="fc-blue">
          {note.title === "" || note.title === null || note.title === undefined ? "제목없음" : note.title}
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          {note.userId}
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          {note.noteId}
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          3 days ago
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          {note.content.length ? note.content.substring(0, 15) + "..." : "컨텐츠 없음"}
        </Typography>
      </article>
    </li>
  )
}

export default NoteListItem

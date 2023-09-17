import Typography from "@mui/material/Typography"
import { useRecoilState } from 'recoil'
import { NoteAtom } from '../recoil/NoteAtom'
import './NoteListItem.css'
import { formatDistance } from 'date-fns'
import { es, ru, enUS } from 'date-fns/locale'

const NoteListItem = ({ note, selectedNoteId }) => {
  const [, setNoteItem] = useRecoilState(NoteAtom)

  const AddToNote = () => {
    setNoteItem(note)
  }

  const FormatDate = (dateString) => {
    if (dateString!== undefined) {
      const date = new Date(note?.createdAt);
      return formatDistance(new Date(), date, { addSuffix: true, locale: enUS })
    }
    return "미정"
  }

  return (
    <li style={{ backgroundColor: note.noteId === selectedNoteId ? "#D7E9FB" : "#FFF"}}>
      <article className="p-15px" onClick={AddToNote}>
        <Typography variant="overline" display="block" lineHeight={1.5} fontSize="14px" fontWeight={600} gutterBottom className="fc-blue">
          {note.title === "" ? "제목없음" : note.title}
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          유저번호: {note.userId}
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          노트번호: {note.noteId}
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          생성일: {FormatDate(note.createdAt)}
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          수정일: {FormatDate(note.updatedAt)}
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          {note.content.length ? (note.content.length > 250 ? note.content.substring(0, 250) + "..." : note.content) : "컨텐츠 없음"}
        </Typography>
      </article>
    </li>
  )
}

export default NoteListItem

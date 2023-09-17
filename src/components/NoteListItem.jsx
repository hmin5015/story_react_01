import Typography from "@mui/material/Typography"
import { useRecoilState } from 'recoil'
import { NoteAtom } from '../recoil/NoteAtom'
import NumbersIcon from '@mui/icons-material/Numbers';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Face5Icon from '@mui/icons-material/Face5';
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
      const date = new Date(dateString);
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
          <div className="item-icons-wrapper">
            <NumbersIcon fontSize="small" htmlColor="#555" />
            <span style={{ paddingLeft: "5px" }}>{note?.noteId}</span>
          </div>
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          <div className="item-icons-wrapper">
            <Face5Icon fontSize="small" htmlColor="#555" />
            <span style={{ paddingLeft: "5px" }}>{note?.userId}</span>
          </div>
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          <div className="item-icons-wrapper">
            <DateRangeIcon fontSize="small" htmlColor="#555" />
            <span style={{ paddingLeft: "5px" }}>{FormatDate(note?.createdAt)}</span>
          </div>
        </Typography>
        <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          <div className="item-icons-wrapper">
            <EditCalendarIcon fontSize="small" htmlColor="#555" />
            <span style={{ paddingLeft: "5px" }}>{FormatDate(note?.updatedAt)}</span>
          </div>
        </Typography>
        {/* <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
          {note.content.length ? (note.content.length > 150 ? note.content.substring(0, 150) + "..." : note.content) : "컨텐츠 없음"}
        </Typography> */}
      </article>
    </li>
  )
}

export default NoteListItem

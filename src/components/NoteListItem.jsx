import Typography from "@mui/material/Typography"
import { useRecoilState } from 'recoil'
import { NoteAtom } from '../recoil/NoteAtom'
import NumbersIcon from '@mui/icons-material/Numbers';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CardMedia from '@mui/material/CardMedia';
import Face5Icon from '@mui/icons-material/Face5';
import './NoteListItem.css'
import { formatDistance } from 'date-fns'
import { es, ru, enUS } from 'date-fns/locale'
import AlarmIcon from '@mui/icons-material/Alarm';

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
    <div className="grid-item" style={{ backgroundColor: note.noteId === selectedNoteId ? "#D7E9FB" : "#FFF"}}>
      <article onClick={AddToNote}>
        {/* <CardMedia
          component="img"
          height="194"
          image={`/${note.noteId === 1 ? "noimage" : `test${note.noteId}`}.jpg`}
          alt="Paella dish"
          style={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px", objectFit: "cover" }}
        /> */}
        <div className="note-item-wrapper" style={{ padding: "15px" }}>
          <Typography variant="overline" display="block" lineHeight={1.5} fontSize="12px" fontWeight={400} letterSpacing={-.5} color={"gray"} gutterBottom>
            {"나만의 레시피"}
          </Typography>
          <Typography variant="overline" display="block" lineHeight={1.5} fontSize="20px" fontWeight={400} letterSpacing={-.5} gutterBottom>
            {note.title === "" ? "제목없음" : note.title}
          </Typography>
          <article style={{ display: "flex", flexDirection: "row", margin: "15px 0px" }}>
            <div style={{ backgroundColor: "#F2F2F2", width: "30px", height: "30px" , border: "1px solid #E5E5E5", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              JM
            </div>
            <div style={{ marginLeft: "5px" }}>
              <div>가시장미연화</div>
              <div style={{ fontSize: "12px", color: "#777" }}>{FormatDate(note?.createdAt)}<span style={{ marginLeft: "7px" }}>조회 946</span></div>
            </div>
          </article>
          <Typography variant="overline" display="block" lineHeight={1.5} color={"#777"} letterSpacing={-.3} gutterBottom>
            <span>{note.content.length > 350 ? note.content.substr(0, 350) + "..." : note.content}</span>
          </Typography>
          {/* <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
            <div className="item-icons-wrapper">
              <Face5Icon fontSize="small" htmlColor="#555" />
              <span style={{ paddingLeft: "5px" }}>{"민현우"}</span>
            </div>
          </Typography> */}
          {/* <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
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
          </Typography> */}
          {/* <Typography variant="overline" display="block" lineHeight={1.5} gutterBottom>
            {note.content.length ? (note.content.length > 150 ? note.content.substring(0, 150) + "..." : note.content) : "컨텐츠 없음"}
          </Typography> */}
        </div>
      </article>
    </div>
  )
}

export default NoteListItem

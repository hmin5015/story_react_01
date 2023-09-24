import Typography from "@mui/material/Typography"
import { useRecoilState } from 'recoil'
import { NoteAtom } from '../recoil/NoteAtom'
import { formatDistance } from 'date-fns'
import { enUS } from 'date-fns/locale'
import EditNoteIcon from '@mui/icons-material/EditNote'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import './NoteListItem.scss'

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
    <div 
      className="grid-item" 
      style={{ 
        backgroundColor: note.noteId === selectedNoteId ? "#E5EFEC" : "#FFF",
        border: note.noteId === selectedNoteId ? "2px solid #00754A" : "2px solid transparent"
      }}
    >
      <article style={{ position: "relative" }} onClick={AddToNote}>
        <div className="note-action-wrapper" style={{ position: "absolute", top: "0px", right: "10px", display: "flex", flexDirection: "row" }}>
            <Typography variant={"overline"} display={"block"} paddingLeft={2} gutterBottom>
              <div className="item-icons-wrapper">
                <FavoriteBorderIcon fontSize="medium" htmlColor="#777" />
              </div>
            </Typography>
            <Typography variant={"overline"} display={"block"} paddingLeft={2} gutterBottom>
              <div className="item-icons-wrapper">
                <EditNoteIcon fontSize="medium" htmlColor="#777" />
              </div>
            </Typography>
        </div>
        <div className="note-item-wrapper" style={{ padding: "15px" }}>
          <Typography variant="overline" display="block" lineHeight={1.5} fontSize="14px" fontWeight={600} letterSpacing={-.5} maxWidth={"75%"} gutterBottom>
            {note.title === "" ? "제목없음" : note.title}
          </Typography>
          <article style={{ display: "flex", flexDirection: "row", margin: "5px  0px 15px 0px" }}>
            <div style={{ backgroundColor: "#00754A", color: "#FFF", width: "30px", height: "30px" , border: "1px solid #00754A", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              JM
            </div>
            <div style={{ marginLeft: "5px" }}>
              <div>{note.userId}</div>
              <div style={{ fontSize: "12px", color: "#777" }}>{FormatDate(note?.createdAt)}<span style={{ marginLeft: "7px" }}>조회 946</span></div>
            </div>
          </article>
          <Typography variant="overline" display="block" lineHeight={1.5} color={"#777"} letterSpacing={-.3} gutterBottom>
            <span>{note.content.length ? (note.content.length > 350 ? note.content.substr(0, 350) + "..." : note.content) : "컨텐츠 없음"}</span>
          </Typography>
        </div>
      </article>
    </div>
  )
}

export default NoteListItem

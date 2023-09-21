import Typography from "@mui/material/Typography"
import { useRecoilState } from 'recoil'
import { NoteAtom } from '../recoil/NoteAtom'
import './NoteListItem.scss'
import { formatDistance } from 'date-fns'
import { enUS } from 'date-fns/locale'

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
        <div className="note-item-wrapper" style={{ padding: "15px" }}>
          <Typography variant="overline" display="block" lineHeight={1.5} fontSize="12px" fontWeight={400} letterSpacing={-.5} color={"gray"} gutterBottom>
            {"노트정리"}
          </Typography>
          <Typography variant="overline" display="block" lineHeight={1.5} fontSize="20px" fontWeight={400} letterSpacing={-.5} gutterBottom>
            {note.title === "" ? "제목없음" : note.title}
          </Typography>
          <article style={{ display: "flex", flexDirection: "row", margin: "15px 0px" }}>
            <div style={{ backgroundColor: "#EC5C03", color: "#FFF", width: "30px", height: "30px" , border: "1px solid #E5E5E5", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "center" }}>
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

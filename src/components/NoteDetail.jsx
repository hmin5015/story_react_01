import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRecoilValue } from 'recoil'
import { NoteAtom } from '../recoil/NoteAtom'
import './NoteDetail.css'

const NoteDetail = ({ handleAddNote }) => {
  let noteItem = useRecoilValue(NoteAtom)

  const defaultNote = {
    noteId: "발번되지 않음",
    userId: "발번되지 않음",
    title: "제목없음",
    content: "내용없음",
    createdAt: "미정",
    updatedAt: "미정",
  }

  noteItem = { ...defaultNote, ...noteItem };

  return (
    <>
    <ArrowBackIcon />
      <Typography variant={"h5"} display={"block"}  paddingLeft={1} gutterBottom>
        {noteItem.title === "" ? "제목없음" : noteItem.title}
      </Typography>
      <Typography variant={"overline"} display={"block"}  paddingLeft={1} gutterBottom>
        {"노트작성일: " + noteItem?.createdAt}
      </Typography>
      <Button variant = "contained" type="button" onClick={() => handleAddNote()}>
        Add Note
      </Button>
    </>
  )
}

export default NoteDetail

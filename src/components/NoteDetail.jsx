import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRecoilValue } from 'recoil'
import { NoteAtom } from '../recoil/NoteAtom'
import FloatingActionButtons from "./common/FloatingButton";

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
      <Typography variant={"h5"} display={"block"}  paddingLeft={1} gutterBottom>
        {noteItem.title === "" ? "제목없음" : noteItem.title}
      </Typography>
      <Typography variant={"overline"} display={"block"}  paddingLeft={1} gutterBottom>
        {"노트작성일: " + noteItem?.createdAt}
      </Typography>
      <Button 
        style={{
          borderRadius: 25,
          textTransform: "none"
        }}
        variant="contained" 
        type="button"
      >
        {"Cancel"}
      </Button>
      <FloatingActionButtons 
        style={{
          position: "absolute",
          top: "25px",
          right: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
        handleAddNote={handleAddNote}
      />
    </>
  )
}

export default NoteDetail

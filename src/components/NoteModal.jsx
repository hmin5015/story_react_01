import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './NoteModal.css'

const NoteModal = ({ setTitle, setContent, handleSubmit, handleCancel }) => {
  return (
    <>
      <ArrowBackIcon onClick={handleCancel} />
      <form className="noteForm" onSubmit={(e) => e.preventDefault()}>
        <TextField
          required
          fullWidth
          error={false}
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
          variant="standard"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-multiline-static"
          label="Content"
          multiline
          fullWidth
          rows={4}
          defaultValue="Note"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant = "contained" type="button" onClick={() => handleSubmit()}>
          추가하기
        </Button>
      </form>
    </>
  )
}

export default NoteModal

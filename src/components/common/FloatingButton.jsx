import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function FloatingActionButtons({
  style,
  handleAddNote
}) {
  return (
    <Box 
      style={style}
      sx={{ '& > :not(style)': { m: 1 } }}
    >
      <Fab size="small" aria-label="add">
        <AddIcon onClick={() => handleAddNote()} />
      </Fab>
      <Fab size="small" aria-label="edit">
        <EditIcon />
      </Fab>
      <Fab size="small" aria-label="like">
        <FavoriteIcon />
      </Fab>
    </Box>
  );
}
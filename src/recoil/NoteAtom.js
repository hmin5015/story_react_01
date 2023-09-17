import { atom, selector } from "recoil";

export const NoteAtom = atom({
  key: "NoteAtom",
  default: [],
});

export const NoteSelector = selector({
  key: "NoteSelector",
  get: ({ get }) => {
    const CurrentNote = get(NoteAtom);
    return CurrentNote.noteId;
  },
});

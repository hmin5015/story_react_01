import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import './Nav.scss'

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: alpha(theme.palette.common.white, 0.90),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.90),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "14px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 0, 0, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
    paddingRight: `calc(1em + ${theme.spacing(2.5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "38ch",
    },
  },
}));

const Nav = () => {
  return (
    <nav>
      <section className="header-search-section">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </section>
      <section className="header-filter-section" style={{ marginTop: "10px" }}>
        <ul>
          <li style={{ fontSize: "14px", border: "1px solid #E5E5E5", borderRadius: "25px", margin: "0px 5px", padding: "7px 12px", backgroundColor: "#0a66c2", color: "#FFF" }}>#전체</li>
          <li style={{ fontSize: "14px", border: "1px solid #E5E5E5", borderRadius: "25px", margin: "0px 5px", padding: "7px 12px", backgroundColor: "#FFF" }}>#노트</li>
          <li style={{ fontSize: "14px", border: "1px solid #E5E5E5", borderRadius: "25px", margin: "0px 5px", padding: "7px 12px", backgroundColor: "#FFF" }}>#알림</li>
          <li style={{ fontSize: "14px", border: "1px solid #E5E5E5", borderRadius: "25px", margin: "0px 5px", padding: "7px 12px", backgroundColor: "#FFF" }}>#할일</li>
        </ul>
      </section>
    </nav>
  )
}

export default Nav

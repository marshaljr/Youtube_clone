import { Stack, Box } from "@mui/material";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm, mainRef }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already on Feed → just scroll
      if (window.innerWidth < 900) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        mainRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (location.pathname.startsWith("/video")) {
      // On video detail → go home, then scroll
      navigate("/");
      setTimeout(() => {
        if (window.innerWidth < 900) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          mainRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate("/");
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={3}
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "space-between",
        zIndex: 10,
      }}>
      <Box
        component="a"
        href="/"
        onClick={handleLogoClick}
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <img src={logo} alt="logo" height={45} />
      </Box>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </Stack>
  );
};

export default Navbar;

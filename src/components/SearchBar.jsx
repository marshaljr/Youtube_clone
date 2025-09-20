import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchBar = ({ style }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((searchTerm || "").trim()) {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
        width: style?.width,
        height: 30,
      }}>
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={searchTerm || ""}
        onChange={(e) => setSearchTerm(e.target.value || "")}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          color: "black",
          fontSize: 16,
        }}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px", color: "#FC1503" }}
        aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

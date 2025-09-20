import { Stack } from "@mui/material";
import { categories } from "../utils/constants";
import { Typography } from "@mui/material";

const Categories = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
    }}>
    <div
      style={{
        overflowY: "auto",
        height: "95%",
        display: "flex",
        flexDirection: "column",
      }}>
      {categories.map((category) => (
        <button
          key={category.name}
          className="category-btn"
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background: category.name === selectedCategory && "#FC1503",
            color: "white",
          }}>
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "#FC1503",
              marginRight: "15px",
              display: "flex",
              alignItems: "center",
            }}>
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}>
            {category.name}
          </span>
        </button>
      ))}
    </div>
  </Stack>
);

export default Categories;

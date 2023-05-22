import React, { useState } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import Box from "@mui/material/Box";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [searchText, SetSearchText] = useState("");

  let searchButton = () => {
    console.log(searchText);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: { xs: 350, sm: 370, md: 550, lg: 800, xl: 1000 },
        }}
        className="search-bar"
      >
        <Box
          sx={{
            alignSelf: "center",
            pl: { xs: 1, sm: 2 },
            pr: { xs: 1, sm: 2 },
            fontSize: { xs: 25, sm: 30 },
            fontWeight: "medium",
          }}
        >
          🔍
        </Box>
        <TextField
          sx={{
            width: { xs: 350, sm: 370, md: 550, lg: 800, xl: 1000 },
            maxWidth: "100%",
            alignSelf: "center",
          }}
          placeholder="Search products"
          variant="standard"
          className="searchText"
          name="search"
          onChange={(e) => SetSearchText(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => searchButton()}
          className="searchButton"
          sx={{
            fontSize: { xs: 10, sm: 14, md: 14 },
            pl: { xs: 4, sm: 4 },
            pr: { xs: 4, sm: 4 },
            pt: { xs: 2, sm: 2 },
            pb: { xs: 2, sm: 2 },
            width: { xs: 100, sm: 150 },
          }}
        >
          search
        </Button>
      </Box>
    </div>
  );
};

export default SearchBar;

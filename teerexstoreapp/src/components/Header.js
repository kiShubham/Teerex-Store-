import React from "react";
import Button from "@mui/material/Button";
import SearchBar from "./SearchBar";
import "./Header.css";
import { Box } from "@mui/material";

const Header = ({ children }) => {
  return (
    <header className="header">
      <nav className="colors"></nav>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: { xs: "0.5rem 1rem ", md: "1rem 2rem 1rem 2rem" },
          alignItems: "center",
          gap: 2,
        }}
        className="sub-header"
      >
        <p className="BrandName">Teerex store</p>
        <div className="desktop-View">
          {/* <SearchBar /> */}
          {children}
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: { xs: 1, sm: 1, md: 1, lg: 2, xl: 3 },
          }}
          className="Action-buttons"
        >
          <Button
            variant="outlined"
            sx={{
              color: "black",
              borderRadius: 0,
              border: "1px solid black",
              fontFamily: "Poppins",
              fontWeight: "bold",
            }}
          >
            products
          </Button>
          <Button
            variant="contained"
            sx={{ fontSize: 26, bgcolor: "grey", borderRadius: 0 }}
            className="cartButton"
          >
            🛒
          </Button>
        </Box>
      </Box>
      <Box className="mobile-View">
        {/* <SearchBar /> */}
        {children}
      </Box>
    </header>
  );
};

export default Header;

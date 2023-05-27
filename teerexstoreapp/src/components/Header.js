import React from "react";
import Button from "@mui/material/Button";
import SearchBar from "./SearchBar";
import "./Header.css";
import { Box, Typography } from "@mui/material";
// import { Link } from "react-router-dom"; using useNavigate;
import { useNavigate } from "react-router-dom";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const Header = ({ children }) => {
  const navigate = useNavigate();

  const handleCartButton = () => {
    // console.log("cartButton Clicked");
    navigate("/checkout");
  };
  const handleProducts = () => {
    navigate("/");
    //console.log("products clicked");
  };
  const numProducts = () => {
    let str = localStorage.getItem("cartArray");
    let total = 0;
    if (str) {
      let arr = JSON.parse(str);
      // console.log(arr);

      arr.forEach((e) => {
        total = total + e.QTY;
      });
    }
    return total;
  };
  let count;
  if (numProducts()) {
    // only show when item added to cart  ;
    count = numProducts();
  }

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
        <Typography className="BrandName" onClick={handleProducts}>
          Teerex store
        </Typography>
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
            sx={{
              color: "black",
              borderRadius: 0,
              border: "1px solid black",
              fontFamily: "Poppins",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
            onClick={handleProducts}
          >
            products
          </Button>
          <Box className="cartParent">
            <Button
              variant="contained"
              sx={{ fontSize: 26, borderRadius: 0 }}
              className="cartButton"
              onClick={handleCartButton}
            >
              <div style={{ zIndex: 2 }}>🛒</div>
            </Button>
            <span className={count > 9 ? "highBadge" : "badge"}>{count}</span>
          </Box>
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

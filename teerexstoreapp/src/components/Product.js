import { Box, Button, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Product.css";
import Header from "./Header";
import SearchBar from "./SearchBar";

const Product = () => {
  const [productList, setProductList] = useState([]);

  const fetchProducts = async () => {
    let res = await axios(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    );
    if (res && res.data) {
      setProductList(res.data);
    }
  };
  // console.log(productList);

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <Header>
        <SearchBar />
      </Header>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Box
          className="filter"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            // border: "1px solid black",
            justifyContent: "space-evenly",
            gap: 2,
            padding: 1,
            width: "80vw",
          }}
        >
          <Box className="filterItems">
            <Typography
              variant="h8"
              sx={{ fontFamily: "'Press Start 2P',cursive" }}
            >
              color
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Red"
                value="Red"
                onChange={() => {}}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Blue"
                value="Blue"
                onChange={() => {}}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Green"
                value="Green"
                onChange={() => {}}
              />
            </FormGroup>
          </Box>
          <Box className="filterItems">
            <Typography
              variant="h8"
              sx={{ fontFamily: "'Press Start 2P',cursive" }}
            >
              Gender
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Men"
                value="Men"
                onChange={() => {}}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Women"
                value="Women"
                onChange={() => {}}
              />
            </FormGroup>
          </Box>
          <Box className="filterItems">
            <Typography
              variant="h8"
              sx={{ fontFamily: "'Press Start 2P',cursive" }}
            >
              Price
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="0-Rs.250"
                value="250"
                onChange={() => {}}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rs.251-450"
                value="251-450"
                onChange={() => {}}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rs.450"
                value="450"
                onChange={() => {}}
              />
            </FormGroup>
          </Box>
          <Box className="filterItems">
            <Typography
              variant="h8"
              sx={{ fontFamily: "'Press Start 2P',cursive" }}
            >
              Type
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Polo"
                value="Polo"
                onChange={() => {}}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Hoodie"
                value="Hoodie"
                onChange={() => {}}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Basic"
                value="Basic"
                onChange={() => {}}
              />
            </FormGroup>
          </Box>
        </Box>
      </Box>
      {productList.length > 0 ? (
        <div className="productGrid">
          {productList.map((e) => {
            return (
              <div key={e.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 1,
                  }}
                  className="items"
                >
                  <img src={e.imageURL} alt={e.name} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px 5px 0 5px",
                      gap: 2,
                    }}
                    className="action-space"
                  >
                    <p>Rs.{e.price}</p>
                    <Button
                      variant="contained"
                      onClick={() => console.log(e.id)}
                    >
                      Add to cart
                    </Button>
                  </Box>
                </Box>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Product;

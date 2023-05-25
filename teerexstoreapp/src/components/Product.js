import { Box, Button, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import "./Product.css";
import Header from "./Header";
import SearchBar from "./SearchBar";
import filterimg from "../filter_emoji.png";
import { CleaningServicesOutlined } from "@mui/icons-material";
import { SnackbarProvider, enqueueSnackbar, useSnackbar } from "notistack";
import Filter from "./Filter";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filterInputs, setFilterInputs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterIcon, setFilterIcon] = useState(false);

  const fetchProducts = async () => {
    let res = await axios(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    );
    if (res && res.data) {
      setProductList(res.data);
    }
    return res.data;
  };
  // console.log(productList);

  useEffect(() => {
    const onLoadHandler = async () => {
      const productData = await fetchProducts();
      setFilteredList(productData);
    };
    onLoadHandler();

    console.log("run");
  }, []);

  let captureSearchTerm = (e) => {
    // filter the product LIst on the basis of search term and show on viewPort ;

    let searchTxt = e.target.value.trim(); // use trim() to remove white spaces ;oftenly given by mistake ;
    // console.log(filterInputs);

    if (!searchTxt.length) {
      setSearchTerm("");
      return setFilteredList(productList);
    }

    /**
     * case insensitive string comparison ;im using toUpperCase for both string for comparison ;
     * regular search in order, eg: black , polo , blue hoddie ;
     * irregular search term like, eg: hoodie blue ;
     */

    const words = searchTxt.split(" ").toReversed().join(" "); //"hoodie blue"->["hoodie" , "blue"]->["blue" , "hoodie"]->"blue hoodie";

    let result = productList.filter((e) => {
      if (e.color.toUpperCase() === searchTxt.toUpperCase()) return true;
      if (e.type.toUpperCase() === searchTxt.toUpperCase()) return true;
      if (e.name.toUpperCase() === searchTxt.toUpperCase()) return true;
      if (e.name.toUpperCase() === words.toUpperCase()) return true;
    });

    if (result.length) {
      setFilteredList(result);
      setSearchTerm(searchTxt);
    }
  };

  const filterHandler = (e) => {
    let overSearch = []; // for Filter can be applied on top of the search results.
    if (searchTerm.length) {
      const words = searchTerm.split(" ").toReversed().join(" "); //"hoodie blue"->["hoodie" , "blue"]->["blue" , "hoodie"]->"blue hoodie";

      overSearch = productList.filter((e) => {
        if (e.color.toUpperCase() === searchTerm.toUpperCase()) return true;
        if (e.type.toUpperCase() === searchTerm.toUpperCase()) return true;
        if (e.name.toUpperCase() === searchTerm.toUpperCase()) return true;
        if (e.name.toUpperCase() === words.toUpperCase()) return true;
      });

      if (overSearch.length) {
        setFilteredList(overSearch);
      }
    }
    let checks = e.target.value;

    if (filterInputs.includes(checks)) {
      let idx = filterInputs.indexOf(checks);
      filterInputs.splice(idx, 1);
    } else {
      filterInputs.push(checks);
    }
    // console.log(searchTerm);
    // console.log(searchTerm.length);
    if (filterInputs.length === 0 && !searchTerm.length) {
      setFilteredList(productList);
      return;
    }
    // for color ,gender,type ;
    let result = [];
    let tempfilterList = [];
    if (overSearch.length) {
      tempfilterList = [...overSearch]; // filter applied on the top of search result ;
    } else {
      tempfilterList = [...productList]; // filter applied by itself;
    }

    filterInputs.forEach((input) => {
      if (input === "0 250" || input === "251 450" || input === "451 500") {
        let range = input.split(" "); // ["0" , "250" ];
        result = tempfilterList.filter((e) => {
          let min = range[0] * 1; // converting string into no. // can use parseInt/float also;
          let max = range[1] * 1;
          if (min <= e.price && e.price <= max) return true;
        });
      } else {
        result = tempfilterList.filter((e) => {
          if (e.color === input) return true;
          if (e.type === input) return true;
          if (e.gender === input) return true;
        });
      }

      tempfilterList = [...result]; // from second loop it will search inside the filtered array based on first element;
    });
    // console.log(result);

    if (result.length) {
      setFilteredList(result);
    } else {
      enqueueSnackbar("no result found ,showing previous result", {
        variant: "error",
      });
    }
  };
  const filterIconHandle = () => {
    if (!filterIcon) setFilterIcon(true);
    else setFilterIcon(false);
  };

  // const newLocal = "filter";
  return (
    <div>
      <Header handleProducts={() => {}}>
        <SearchBar searchTxt={captureSearchTerm} />
        <Button
          sx={{
            ml: 1,
            border: "1px solid black",
            borderRadius: 0,
          }}
          className="filterIcon"
          onClick={filterIconHandle}
        >
          <img src={filterimg} alt="filterlogo" />
        </Button>
      </Header>
      <Filter classNameBoolean={filterIcon} filterHandle={filterHandler} />
      {filteredList.length > 0 ? (
        <div className="productGrid">
          {filteredList.map((e) => {
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
                  <Typography
                    sx={{
                      fontFamily: "'Bungee Shade', cursive",
                      alignSelf: "center",
                      fontSize: 22,
                      fontWeight: "bold",
                      mt: 1,
                    }}
                  >
                    {e.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 5px",
                      gap: 2,
                    }}
                    className="action-space"
                  >
                    <p>Rs.{e.price}</p>
                    <Button
                      variant="contained"
                      onClick={() =>
                        enqueueSnackbar("That was easy!", {
                          variant: "success",
                        })
                      }
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
        <Typography
          variant="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          sorry no Products found
        </Typography>
      )}
    </div>
  );
};

export default Product;
/*
[
  {
    id: 1,
    imageURL:
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-polo-men.png",
    name: "Black Polo",
    type: "Polo",
    price: 250,
    currency: "INR",
    color: "Black",
    gender: "Men",
    quantity: 3,
  },
  {
    id: 4,
    imageURL:
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-hoodie-men.png",
    name: "Black Hoodie",
    type: "Hoodie",
    price: 500,
    currency: "INR",
    color: "Black",
    gender: "Men",
    quantity: 2,
  },
  {
    id: 8,
    imageURL:
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-hoodie-women.png",
    name: "Black Hoodie",
    type: "Hoodie",
    price: 500,
    currency: "INR",
    color: "Black",
    gender: "Women",
    quantity: 5,
  },
  {
    id: 15,
    imageURL:
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-round-men.png",
    name: "Black Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Black",
    gender: "Men",
    quantity: 7,
  },
  {
    id: 29,
    imageURL:
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-round-women.png",
    name: "Black Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Black",
    gender: "Women",
    quantity: 0,
  },
  {
    id: 30,
    imageURL:
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-polo-women.png",
    name: "Black Polo",
    type: "Polo",
    price: 300,
    currency: "INR",
    color: "Black",
    gender: "Women",
    quantity: 4,
  },
];
*/

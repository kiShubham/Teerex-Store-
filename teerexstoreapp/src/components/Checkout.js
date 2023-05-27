import React, { useEffect, useState } from "react";
import "./Checkout.css";
import Header from "./Header";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";

import background from "../assests/choi-nara-04.jpg";
import myGif from "../assests/itami-moti.gif";
import image1 from "../assests/now.jpg";
import { enqueueSnackbar } from "notistack";
import Divider from "@mui/material/Divider";
import Sorry from "./Sorry";
// import background from "../cosmin-hrincu-nimsocstudio-coastalalley.jpg";

const Checkout = () => {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);
  const [boolean, setBoolean] = useState(true);
  const [show, setShow] = useState(false);
  const fetchProducts = async () => {
    let res = await axios(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    );
    if (res && res.data) {
      // setProductList(res.data);
    }
    return res.data;
  };

  useEffect(() => {
    const onLoadHandler = async () => {
      const productData = await fetchProducts();
      getCartItem(productData);
    };
    onLoadHandler();
  }, []);

  let getCartItem = (productData) => {
    let tempCart = localStorage.getItem("cartArray"); // for getting the array back (its currnt string format);
    let tempDetail = JSON.parse(tempCart); //
    // console.log(tempDetail); //working ;

    if (!tempDetail) return; // dont write !tempDetail.length as it will give error as tempCart will undefined if no products added and so for tempDetail ;
    let cartDetail = tempDetail.map((e) => ({
      ...e,
      ...productData.find((elem) => elem.id === e.ID),
    }));

    // console.log(cartDetail); //getting full object for particular cart item;
    setCart(cartDetail);
  };
  // console.log(cart);
  const handleBoolean = () => {
    if (boolean === true) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };
  const handleQty = (i, item) => {
    if (i === true && item.QTY === item.quantity) {
      enqueueSnackbar("Maximum limit reached,for particular product", {
        variant: "warning",
      });
      return;
    }
    let arr = [...cart];
    let object = { ...item }; //copying the item obj ,for update
    // console.log(object);
    // console.log("oldArray");
    // console.log(cart);

    /**
     * task => item.Qty ko increase dec karna h ;
     * pehle check karna h ki available quantity ko cross na kare(for increase);
     * fir item ka QTY inc / dec kar do ;arr array mai ,cartarray m nhi;
     * then finally setcart(arr);cartArray ko update kardo;
     * search obj in arr , replace with splice,splice to replace old obje with new obj;in cart;
     */
    let currQty = object.QTY;
    if (i === true) {
      object.QTY = currQty + 1; //working ;
    }
    if (i === false) {
      object.QTY = currQty - 1;
    }
    // console.log(object); // now as object is modified ,as with new QTY , replace it with existing {same id} object from arr;
    // console.log(object.QTY);
    // index of id obj;
    let idx = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].ID === item.ID) {
        idx = i;
        break;
      }
    }
    let tempCart = localStorage.getItem("cartArray");
    let tempDetail = JSON.parse(tempCart);
    // console.log(tempDetail); // [{"ID": 1,"QTY": 3} ,...]
    // updateit
    if (object.QTY > 0) {
      arr.splice(idx, 1, object);
      tempDetail.splice(idx, 1, { ID: item.ID, QTY: object.QTY });
    } else {
      arr.splice(idx, 1);
      tempDetail.splice(idx, 1);
    }
    let stirngArr = JSON.stringify(tempDetail); // saving the array of object in string format in local Storage ;
    if (tempDetail.length) {
      localStorage.setItem("cartArray", stirngArr);
    } else {
      localStorage.removeItem("cartArray");
    }
    // console.log("newarr");
    // console.log(arr);
    //now set new value for cart ;
    setCart(arr);
  };
  const AmountCalculte = () => {
    let total = 0;
    cart.forEach((e) => {
      total = total + e.QTY * e.price;
    });
    return total;
  };
  let totalAmount = AmountCalculte();

  const handleDelete = (id) => {
    let arr = [...cart];
    let tempCart = localStorage.getItem("cartArray");
    let tempDetail = JSON.parse(tempCart);
    let idx = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].ID === id) {
        idx = i;
        break;
      }
    }
    arr.splice(idx, 1);
    tempDetail.splice(idx, 1);

    let stirngArr = JSON.stringify(tempDetail); // saving the array of object in string format in local Storage ;
    if (tempDetail.length) {
      localStorage.setItem("cartArray", stirngArr);
    } else {
      localStorage.removeItem("cartArray");
    }
    setCart(arr);
  };
  // console.log(show);
  return (
    <div>
      <Header />
      <Box
        className="checkout"
        sx={{
          border: "1px solid rgba(0,0,0,0)",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "bottom",
          minHeight: "100vh",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "'Bungee Shade', cursive",
            fontSize: 30,
            fontWeight: "bold",
            color: "Black",
            mt: 5,
          }}
        >
          {cart.length ? (
            <>Your Shopping cart 🛒</>
          ) : (
            <>Your cart 🛒 is Empty</>
          )}
        </Typography>
        <Box
          className="grid"
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "center", md: "flex-start" },
            mt: 5,
          }}
        >
          {cart.length ? (
            <div>
              {cart.map((item) => {
                return (
                  <div key={item.id}>
                    <Box
                      className="singleItem"
                      sx={{
                        flexDirection: { xs: "column", sm: "row" },
                        alignSelf: { xs: "center", sm: "center" },
                        gap: { xs: 1, sm: 2, md: 3, lg: 5, xl: 7 },
                        padding: {
                          xs: 2.5,
                          sm: 1,
                          md: 1,
                          lg: "8px 2px",
                          xl: 1,
                        },
                        mb: 4,
                        ml: { md: "11vw" },
                        borderRadius: 2.5,
                        width: { xs: 250, sm: 570, md: 600, lg: 680, xl: 700 },
                      }}
                    >
                      <img src={item.imageURL} alt={item.name} />
                      <Box
                        sx={{
                          display: "block",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Rs {item.price}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          sx={{ fontSize: 20 }}
                          onClick={() => handleQty(true, item)}
                        >
                          🔼
                        </Button>
                        <Typography
                          sx={{
                            alignSelf: "center",
                            fontFamily: " 'Press Start 2P', cursive;",
                            color: "white",
                          }}
                        >
                          {item.QTY}
                        </Typography>
                        <Button
                          sx={{ fontSize: 20 }}
                          onClick={() => handleQty(false, item)}
                        >
                          🔽
                        </Button>
                      </Box>
                      <Button
                        sx={{
                          border: "1px solid Black",
                          bgcolor: "black",
                          color: "White",
                          borderRadius: { xs: 1, sm: 0 },
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          letterSpacing: 2,
                          padding: { xs: "0.3rem 4.6rem", sm: "0.5rem 1.4rem" },
                          "&:hover": {
                            color: "black",
                            fontWeight: "bold",
                          },
                        }}
                        onClick={() =>
                          setTimeout(() => {
                            handleDelete(item.ID);
                          }, 500)
                        }
                      >
                        Delete
                      </Button>
                    </Box>
                  </div>
                );
              })}
              <Box
                className="sumOfProducts"
                sx={{
                  ml: { md: "11vw" },
                  width: { xs: 290, sm: 586, md: 616, lg: 0, xl: 0 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 300, sm: 586, md: 616, lg: 310 },
                    padding: { xs: 2.5, sm: 1, md: 1, lg: 1, xl: 1 },
                    height: { xs: 363, sm: 335 },
                    borderRadius: 2.5,
                  }}
                  className="sumContainer"
                >
                  <Typography
                    style={{
                      fontFamily: "'Bungee Inline', cursive",
                      fontSize: "20px",
                      fontWeight: 900,
                      textAlign: "center",
                      WebkitTextStroke: "black",
                      letterSpacing: 2,
                      margin: "10px",
                    }}
                  >
                    order Summary 📃
                  </Typography>
                  <Box className="orderdetials">
                    <Divider />
                    <div>
                      <p>Items:</p>
                      <p>₹{totalAmount}</p>
                    </div>
                    <div>
                      <p>Delivery:</p>
                      <p>₹40</p>
                    </div>
                    <div>
                      <p>Total:</p>
                      <p>₹{totalAmount + 40}</p>
                    </div>
                    <div>
                      <p>Promotion:</p>
                      <p>- ₹80.00</p>
                    </div>
                    <Divider sx={{ mb: 0.5 }} />
                    <div
                      style={{
                        color: "gold",
                        fontSize: "15px",
                        backgroundColor: "rgba(0,0,0,0.45)",
                      }}
                    >
                      <p>Order Total:</p>
                      <p>₹{totalAmount - 40}</p>
                    </div>
                    <Divider sx={{ mt: 0.5 }} />
                    <Button
                      sx={{
                        color: "white",
                        borderRadius: 0,
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        letterSpacing: 2,
                        bgcolor: "black",
                        borderRadius: 2,
                        pt: 1,
                        pb: 1,
                        mt: 1.5,
                        mb: "10px",
                        "&:hover": { bgcolor: "black" },
                      }}
                      variant="contained"
                      onClick={() => setShow(true)}
                    >
                      place order
                    </Button>
                  </Box>
                </Box>
              </Box>
            </div>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: { xs: 250, sm: 300, md: 300, lg: 400, xl: 400 },
                  height: { xs: 250, sm: 300, md: 300, lg: 400, xl: 400 },
                  border: "1px solid black",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  backdropFilter: "blur(5px)",
                  cursor: "pointer",
                }}
                onClick={handleBoolean}
              >
                {boolean ? (
                  <>
                    <img
                      style={{
                        maxWidth: "80%",
                        alignSelf: "center",
                        maxHeight: "80%",
                        objectFit: "contain",
                        borderRadius: "20px",
                      }}
                      src={myGif}
                      alt="myGif"
                    />
                  </>
                ) : (
                  <>
                    <img
                      style={{
                        maxWidth: "100%",
                        alignSelf: "center",
                        maxHeight: "80%",
                        objectFit: "contain",
                        borderRadius: "20px",
                      }}
                      src={image1}
                      alt="myGif"
                    />
                  </>
                )}
              </Box>
              <Typography
                sx={{
                  mt: "30px",
                  fontFamily: "Poppins",
                  fontSize: { xs: 12, sm: 20, md: 27 },
                  fontWeight: "1000",
                  padding: { xs: 1, sm: 2 },
                  border: "1px solid black",
                  color: "yellow",
                  borderRadius: 5,
                  bgcolor: "rgba(245, 245, 244, 0.1)",
                  backdropFilter: "blur(5px)",
                }}
              >
                You should visit homepage and add some products .
              </Typography>
            </Box>
          )}
        </Box>
        <Box className={show ? "sorryShow" : "sorryHide"}>
          <Sorry cancelBTN={() => setShow(false)} />
        </Box>
      </Box>
    </div>
  );
};

export default Checkout;

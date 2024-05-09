import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CART } from "./Navbar";

// Styles
const cardStyle = {
  maxWidth: 90,
  minWidth: 90,
  minHeight: 80,
  maxHeight: 80,
  color: "#ff8928",
  borderRadius: "10px",
};

const productNameStyle = {
  color: "#ff8928",
  WebkitTextStroke: "0.2px white",
  textShadow: "0px 0px 0.5px white",
  fontWeight: "bold",
  fontSize: "1rem",
  fontFamily: "Comic Sans MS",
};

const quantityStyle = {
  color: "#ff8928",
  textShadow: "0px 0px 0.5px white",
  fontSize: "0.85rem",
  fontFamily: "Comic Sans MS",
};

const priceStyle = {
  color: "#ff8928",
  textShadow: "0px 0px 5px white",
  fontWeight: "bold",
  fontSize: "0.9rem",
  fontFamily: "Comic Sans MS",
  marginLeft: "180px",
  marginBottom: "30px",
};

const buttonStyle = {
  fontFamily: "Comic Sans MS",
  fontWeight: "bold",
  borderRadius: "10px",
  left: "350px",
  backgroundColor: "transparent",
  color: "#ff8928",
  border: "1px solid #ff8928",
  marginTop: "-100px",
  "&:hover": {
    backgroundColor: "#ff8928",
    textShadow: "0px 0px 9px black",
    boxShadow: "0px 0px 5px #ff8928",
    color: "white",
    border: "1px solid white",
  },
  boxShadow: "0px 0px 5px white",
};

const Cart: React.FC<CART & { updateCartData: () => void }> = ({
  image,
  price,
  product,
  quantity,
  updateCartData,
}) => {
  axios.defaults.withCredentials = true;

  const [userID, setUserID] = useState<string>();

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:2100/userauth/")
      .then((res) => {
        if (res.data.validUser) {
          setUserID(res.data.userId);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const handleRemoveFromCart = () => {
    setLoading(true);
    const encodedProduct = encodeURIComponent(product);
    axios
      .delete(
        `http://localhost:2100/home/removeItem?userID=${userID}&product=${encodedProduct}`
      )
      .then(() => {
        updateCartData();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Card
          sx={{
            ...cardStyle,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Card>

        <div style={{ padding: "5px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={productNameStyle}
          >
            {product}
          </Typography>
          <Typography gutterBottom component="div" sx={quantityStyle}>
            Quantity: {quantity} x
          </Typography>
          <Typography gutterBottom component="div" sx={priceStyle}>
            Price: Rs.{price}-/-
          </Typography>
          <Button
            size="small"
            variant="contained"
            disabled={loading}
            onClick={handleRemoveFromCart}
            sx={buttonStyle}
          >
            <span>Remove</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;

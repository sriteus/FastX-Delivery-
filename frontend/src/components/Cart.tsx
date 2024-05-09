import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CART } from "./Navbar";

// Styles
const cardStyle = {
  width: 500,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  color: "#ff8928",
  borderRadius: "10px",
  border: "3px solid #ff8928",
};

const imageStyle: React.CSSProperties = {
  width: 80,
  height: 80,
  objectFit: "cover",
  borderRadius: "10px",
};

const contentWrapperStyle: React.CSSProperties = {
  marginLeft: "20px",
  marginRight: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  height: "100%", // Ensure the wrapper takes full height of the card
  width: "calc(100% - 140px)",
};

const productNameStyle = {
  color: "#ff8928",
  fontFamily: "Comic Sans MS",
  fontWeight: "bold",
  fontSize: "1rem",
  marginBottom: "5px", // Add some space between product name and quantity
};

const quantityStyle = {
  color: "#ff8928",
  fontFamily: "Comic Sans MS",
  fontSize: "0.85rem",
};

const priceStyle = {
  color: "#ff8928",
  fontFamily: "Comic Sans MS",
  fontWeight: "bold",
  fontSize: "0.9rem",
};

const buttonStyle = {
  fontFamily: "Comic Sans MS",
  fontWeight: "bold",
  borderRadius: "10px",
  backgroundColor: "transparent",
  color: "#ff8928",
  border: "1px solid #ff8928",
  "&:hover": {
    backgroundColor: "#ff8928",
    color: "white",
  },
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
  const [loading, setLoading] = useState<boolean>(false);
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
    <Card sx={cardStyle}>
      <img src={image} alt={product} style={imageStyle} />
      <div
        style={{
          ...contentWrapperStyle,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <Typography variant="h5" sx={productNameStyle}>
            {product}
          </Typography>
          <Typography sx={quantityStyle}>Quantity: {quantity} x</Typography>
          <Typography sx={priceStyle}>Price: Rs.{price}-/-</Typography>
        </div>
        <Button
          size="small"
          variant="contained"
          disabled={loading}
          onClick={handleRemoveFromCart}
          sx={buttonStyle}
        >
          Remove
        </Button>
      </div>
    </Card>
  );
};

export default Cart;

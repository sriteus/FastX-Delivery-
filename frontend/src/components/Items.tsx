import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SmallCat } from "./CardItems";

// Styles
const cardStyle = {
  maxWidth: 150,
  minWidth: 150,
  minHeight: 120,
  maxHeight: 120,
  color: "white",
  borderRadius: "20px",
};

const itemNameStyle = {
  color: "white",
  WebkitTextStroke: "0.9px black",
  textShadow: "0px 0px 9px black",
  fontWeight: "bold",
  fontSize: "1.2rem",
  fontFamily: "Comic Sans MS",
};

const itemDescriptionStyle = {
  color: "white",
  WebkitTextStroke: "0.2px white",
  textShadow: "0px 0px 2px black",
  fontSize: "0.8rem",
  fontFamily: "Comic Sans MS",
};

const itemPriceStyle = {
  color: "white",
  WebkitTextStroke: "0.9px black",
  textShadow: "0px 0px 9px black",
  fontWeight: "bold",
  fontSize: "0.9rem",
  fontFamily: "Comic Sans MS",
};

const buttonStyle = {
  fontFamily: "Comic Sans MS",
  fontWeight: "bold",
  borderRadius: "10px",
  left: "250px",
  backgroundColor: "transparent",
  color: "white",
  border: "1px solid white",
  marginTop: "-100px",
  "&:hover": {
    backgroundColor: "green",
    textShadow: "0px 0px 9px black",
    boxShadow: "0px 0px 5px green",
  },
  boxShadow: "0px 0px 5px white",
};

const Items: React.FC<SmallCat> = ({ name, description, image, price }) => {
  axios.defaults.withCredentials = true;

  const [userID, setUserID] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:2100/userauth/")
      .then((res) => {
        if (res.data.validUser) {
          console.log("Hello", res.data.userId);
          setUserID(res.data.userId);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCart = async (name: string, price: number) => {
    try {
      const apiCall = await axios.post("http://localhost:2100/home/addcart", {
        userID: userID,
        product: name,
        price: price,
        quantity: quantity,
      });
      if (apiCall.data.success) {
        alert(apiCall.data.message);
      } else {
        alert(apiCall.data.message);
      }
    } catch (error) {
      alert("Already in cart");
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Card
          sx={{
            ...cardStyle,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("${image}")`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></Card>

        <div style={{ marginTop: "2px", padding: "10px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={itemNameStyle}
          >
            {name}
          </Typography>
          <Typography gutterBottom component="div" sx={itemDescriptionStyle}>
            {description}
          </Typography>
          <Typography gutterBottom component="div" sx={itemPriceStyle}>
            Price: Rs.{price}-/-
          </Typography>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleCart(name, price)}
            sx={buttonStyle}
          >
            <span>Add To Cart &#8680;</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Items;

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import Card from "@mui/material/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export interface CART {
  image: string;
  price: number;
  product: string;
  quantity: number;
}

export default function Navbar() {
  axios.defaults.withCredentials = true;
  const [userID, setUserID] = useState<string>();
  const [cartData, setCartData] = useState<CART[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (cartData.length > 0) {
      let totalPrice = 0;
      for (let i = 0; i < cartData.length; i++) {
        totalPrice += cartData[i].price;
      }
      setTotal(totalPrice);
    }
  }, [cartData]);

  const updateCartData = () => {
    axios
      .get(`http://localhost:2100/home/getCart?userID=${userID}`)
      .then((res) => {
        setCartData(res.data);
        let totalPrice = 0;
        res.data.forEach((item: any) => {
          totalPrice += item.price * item.quantity;
        });
        setTotal(totalPrice);
      })
      .catch((err) => console.log(err));
  };

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

  useEffect(() => {
    axios
      .get(`http://localhost:2100/home/getCart?userID=${userID}`)
      .then((res) => {
        setCartData(res.data);
      })
      .catch((err) => console.log(err));
  }, [openDialog]);
  console.log(cartData);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#ff8928", color: "white" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontFamily: "'Arial', sans-serif",
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            FastX
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ border: "2px solid white", borderRadius: "10px" }}
            />
          </Search>
          <IconButton sx={{ marginLeft: "20px" }} onClick={handleOpenDialog}>
            <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            PaperProps={{
              sx: {
                display: "flex",
                minHeight: 520,
                maxHeight: 520,
                minWidth: 600,
                backgroundColor: "#fceed1",
                border: "4px solid #ff8928",
                backgroundSize: "cover",
                color: "#ff8928",
                borderRadius: "20px",
              },
            }}
          >
            <DialogTitle sx={{ textAlign: "center" }}>
              Shopping Cart
            </DialogTitle>
            <DialogContent>
              {cartData.map((value, index) => (
                <div key={value.image} style={{ padding: "10px" }}>
                  <Cart
                    image={value.image}
                    price={value.price}
                    product={value.product}
                    quantity={value.quantity}
                    updateCartData={updateCartData}
                  />
                </div>
              ))}
              Total Bill is of Rs. {total}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>

          <IconButton sx={{ marginLeft: "5px" }}>
            <AccountCircleOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { BigCat } from "../pages/Home";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import Items from "./Items";

export interface SmallCat {
  name: string;
  description: string;
  image: string;
  price: number;
}

// Styles
const cardStyle = {
  maxWidth: 300,
  minWidth: 300,
  minHeight: 150,
  color: "white",
  borderRadius: "20px",
};

const titleStyle = {
  color: "white",
  WebkitTextStroke: "0.9px #ff8928",
  textShadow: "0px 0px 9px black ",
  fontWeight: "bold",
  fontSize: "1.95rem",
  fontFamily: "Comic Sans MS",
};

const descriptionStyle = {
  color: "white",
  WebkitTextStroke: "0.6px #ff8928",
  textShadow: "0px 0px 9px black ",
  fontWeight: "bold",
  fontSize: "1rem",
  fontFamily: "Comic Sans MS",
};

const cardActionsStyle = {
  marginLeft: "200px",
  mt: "40px",
};

const buttonStyle = {
  fontFamily: "Comic Sans MS",
  fontWeight: "bold",
  borderRadius: "10px",
  backgroundColor: "transparent",
  color: "white",
  border: "4px solid #ff8928",
  "&:hover": {
    backgroundColor: "#ff8928",
    textShadow: "0px 0px 9px #ff8928",
    boxShadow: "0px 0px 5px #ff8928",
  },
  boxShadow: "0px 0px 5px #ff8928",
};

const dialogContentStyle = {
  minHeight: "600px",
  minWidth: "600px",
  maxWidth: "700px",
  maxHeight: "600px",
  overflowY: "auto",
  scrollBehavior: "smooth",
  backgroundSize: "contain",
  backgroundPosition: "center",
};

const dialogTitleStyle = {
  color: "white",
  WebkitTextStroke: "0.2px black",
  textShadow: "0px 0px 9px black ",
  fontWeight: "bold",
  fontSize: "1.9rem",
  fontFamily: "Comic Sans MS",
};

const CardItems: React.FC<BigCat> = ({ name, description, image }) => {
  const [open, setOpen] = React.useState(false);
  const [smallCat, setSmallCat] = React.useState<SmallCat[]>([]);

  const handleOpen = (name: string) => {
    setOpen(true);
    console.log(name);
    axios
      .get(`http://localhost:2100/home/smallCat?name=${name}`)
      .then((res) => {
        console.log(res.data);
        setSmallCat(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          ...cardStyle,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "5px solid #ff8928",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={titleStyle}>
            {name}
          </Typography>
          <Typography component="div" sx={descriptionStyle}>
            - {description}
          </Typography>
        </CardContent>
        <CardActions sx={cardActionsStyle}>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleOpen(name)}
            sx={buttonStyle}
          >
            <span>GO &#8680;</span>
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            ...dialogContentStyle,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${image}")`,
          }}
        >
          <DialogTitle sx={dialogTitleStyle}>
            All Products of {name}
          </DialogTitle>
          {smallCat.map((value, index) => (
            <div key={value.name} style={{ padding: "10px" }}>
              <Items
                name={value.name}
                description={value.description}
                price={value.price}
                image={value.image}
              />
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardItems;

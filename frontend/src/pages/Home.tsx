import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardItems from "../components/CardItems";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminCategory from "../components/AdminCategory";

export interface BigCat {
  name: string;
  description: string;
  image: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState<number | undefined>();
  const [bigCat, setBigCat] = useState<BigCat[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:2100/home/bigCategory")
      .then((res) => {
        setBigCat(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:2100/userauth/")
      .then((res) => {
        if (res.data.validUser) {
          console.log(
            "Logged In " + res.data.username + "User Id: " + res.data.userId
          );
          setUserID(res.data.userId);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("BigCat", bigCat);
  return (
    <div>
      <Navbar />
      {userID === 2 && (
        <div>
          Hi Category Admin (FastX Executive)
          <AdminCategory />
        </div>
      )}
      <Grid container spacing={2} padding={2}>
        {bigCat.map((value, index) => (
          <Grid item xs={12} marginTop={4} sm={6} md={3} key={index}>
            <CardItems
              name={value.name}
              description={value.description}
              image={value.image}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;

import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import axios from "axios";

interface FormData {
  name: string;
  description: string;
  image: File | null;
}

const AddCategoryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    image: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:2100/home/addCategory",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setFormData({ name: "", description: "", image: null });
      alert("Category added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category. Please try again later.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h5"
        gutterBottom
        style={{ color: "#ff8928", fontFamily: "Comic Sans MS" }}
      >
        Hi Category Admin (FastX Executive)
      </Typography>
      <Typography
        variant="h3"
        gutterBottom
        style={{ color: "#ff8928", fontFamily: "Comic Sans MS" }}
      >
        Add New Category
      </Typography>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
          style={{
            marginBottom: "1rem",
            fontFamily: "Comic Sans MS",
            color: "#ff8928",
          }}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={4}
          style={{
            marginBottom: "1rem",
            fontFamily: "Comic Sans MS",
            color: "#ff8928",
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "1rem" }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            fontFamily: "Comic Sans MS",
            fontWeight: "bold",
            borderRadius: "10px",
            backgroundColor: "transparent",
            color: "#ff8928",
            border: "1px solid #ff8928",
          }}
        >
          Add Category
        </Button>
      </form>
    </Container>
  );
};

export default AddCategoryForm;

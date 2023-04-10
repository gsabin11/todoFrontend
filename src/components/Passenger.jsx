import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Button, Paper } from "@mui/material";

export default function Passenger() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [errors, setErrors] = useState({});

  const handleClick = (e) => {
    e.preventDefault();
    const passenger = { name, address, number };
    console.log(passenger);
    fetch("http://localhost:8080/passenger/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passenger),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log("new passenger is added");
        setName("");
        setAddress("");
        setNumber("");
        setErrors({});
      })
      .catch((error) => {
        console.error("Error adding passenger:", error);
        setErrors({
          name: "Please enter a name",
          address: "Please enter an address",
          number: "Please enter a valid number",
        });
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/passenger/getAll")
      .then((res) => res.json())
      .then((result) => {
        setPassengers(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>Add Passenger</u>
        </h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            id="outlined-basic"
            label="Passenger Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name !== undefined}
            helperText={errors.name}
          />
          <TextField
            id="outlined-basic"
            label="Passenger Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={errors.address !== undefined}
            helperText={errors.address}
          />
          <TextField
            id="outlined-basic"
            label="Passenger Number"
            variant="outlined"
            fullWidth
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            error={errors.number !== undefined}
            helperText={errors.number}
          />
          <Button variant="contained" onClick={handleClick}>
            Save
          </Button>
        </Box>
      </Paper>
      <Paper elevation={3} style={paperStyle}>
        {passengers.map((passenger) => (
          <Paper
            key={passenger.id}
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
          >
            ID: {passenger.id}
            <br />
            Name: {passenger.name}
            <br />
            Address: {passenger.address}
            <br />
            Number: {passenger.number}
          </Paper>
        ))}
      </Paper>
      </Container>
  )}

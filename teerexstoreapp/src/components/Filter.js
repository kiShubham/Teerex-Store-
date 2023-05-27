import React from "react";
import "./Filter.css";
import { Box, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Filter = (props) => {
  const newLocal = "filter";
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          mb: 3,
        }}
        className={props.classNameBoolean ? "desktop_view" : "mobile_view"}
      >
        <Box
          className={newLocal}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            // border: "1px solid black",
            justifyContent: "space-evenly",
            gap: 2,
            padding: "8px 0px",
            width: "80vw",
          }}
        >
          <Box className="filterItems">
            <Typography
              variant="h8"
              sx={{ fontFamily: "'Press Start 2P',cursive" }}
            >
              color
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Red"
                value="Red"
                onChange={props.filterHandle}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Blue"
                value="Blue"
                onChange={props.filterHandle}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Green"
                value="Green"
                onChange={props.filterHandle}
              />
            </FormGroup>
          </Box>
          <Box className="filterItems">
            <Typography
              variant="h8"
              sx={{ fontFamily: "'Press Start 2P',cursive" }}
            >
              Gender
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Men 🤵"
                value="Men"
                onChange={props.filterHandle}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Women 💃"
                value="Women"
                onChange={props.filterHandle}
              />
            </FormGroup>
          </Box>
          <Box className="filterItems">
            <Typography
              variant="h8"
              sx={{ fontFamily: "'Press Start 2P',cursive" }}
            >
              Price
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="0-Rs.250"
                value="0 250"
                onChange={props.filterHandle}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rs.251-450"
                value="251 450"
                onChange={props.filterHandle}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rs.450 🔼"
                value="451 500"
                onChange={props.filterHandle}
              />
            </FormGroup>
          </Box>
          <Box className="filterItems">
            <Typography
              variant="h8"
              sx={{ fontFamily: "'Press Start 2P',cursive" }}
            >
              Type
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Polo "
                value="Polo"
                onChange={props.filterHandle}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Hoodie"
                value="Hoodie"
                onChange={props.filterHandle}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Basic"
                value="Basic"
                onChange={props.filterHandle}
              />
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Filter;

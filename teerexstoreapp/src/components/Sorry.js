import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import srryGif from "../assests/naragif.gif";
import "./Sorry.css";
import sound1 from "../assests/Bb.mp3";

const Sorry = ({ cancelBTN }) => {
  const [sound, setSound] = useState(0);

  const handleSound = () => {
    setSound((e) => e + 1);

    if (sound > 1) {
      new Audio(sound1).play();
    } // the setSound always took some time to update the value ;which is more than executable time of this code
    //means in time it set setSound(4);the complier is so fast that it had already executes the code ;so (sound > ) it takes previous value of sound;
  };
  // console.log(sound);

  return (
    <div>
      <Box
        sx={{
          width: { xs: "70vw", sm: "100vw" },
          ml: { xs: "10vw", sm: "auto" },
          // position: "stick",
          top: 410,
        }}
        className="sorryContainer"
      >
        <Box
          className="sorryPage"
          sx={{
            width: { xs: "100%", sm: 500, md: 600, lg: 800, xl: 1000 },
            height: { xs: 440, sm: 440 },
            mt: { xs: 35, sm: 0 },
            p: { xs: 1.5, sm: "12px 12px 0px 12px" },
          }}
        >
          <img src={srryGif} alt="sad" />
          <Box className="sorryFooter">
            <Typography
              className="sorryText"
              sx={{ fontSize: { xs: 13, sm: 20 }, mt: { xs: 0, sm: 1 } }}
              onClick={handleSound}
            >
              {sound > 1 ? (
                <>Paisa laya</>
              ) : (
                <>Sorry our service is not Available !</>
              )}
            </Typography>
            <Button
              className="cancel"
              sx={{
                fontSize: "30px",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.5)",
                  bgcolor: "rgba(0,0,0,0)",
                },
              }}
              onClick={cancelBTN}
            >
              ❎
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Sorry;

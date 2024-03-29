import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(max-width: 960px)");
  return (
    <Box>
      <Typography
        variant={isNonMediumScreens ? "h4" : "h2"}
        color={theme.palette.secondary[200]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[200]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;

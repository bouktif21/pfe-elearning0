import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px" pt="15px">
      <Typography
        variant="h2"
        fontWeight="bold"
        fontSize="30px"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
// MUI (UI components)
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// The top-bar menu
export default function Menu({ setIsAddProdModalOpen, productTotal }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        backgroundColor: "#003366",
        boxShadow: "0px 1px 4px 0px #727272",
        WebkitBoxShadow: "0px 1px 4px 0px #727272",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Container
        maxWidth="xl"
        // root edited to remove default horizontal padding
        sx={{
          "&.MuiContainer-root": { padding: "0px" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* Logo and title */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <a href="https://github.com/onions41/Kwan-Lee-ecc-dssb-IS21-code-challenge-req101408">
            <img
              src="round_bird_192x192.png"
              alt="A Logo"
              width="36"
              style={{ borderRadius: "50%" }}
            />
          </a>
          <Typography
            pt="1px"
            variant="body1"
            component="h1"
            color="grey.200"
          >
            Kwan-Lee-ecc-dssb-IS21-code-challenge-req101408
          </Typography>
        </Stack>
        {/* Displays total number of products */}
        <Typography
          variant="body1"
          component="h1"
          color="success.contrastText"
          sx={{
            padding: "2px 6px 0",
            borderRadius: "4px",
            backgroundColor: "success.main"
          }}
        >
          {`Total number of products: ${productTotal}`}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          {/* Add new product button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddProdModalOpen(true)}
            color="success"
          >
            Add New Product
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

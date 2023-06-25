// MUI (UI components)
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// The top-bar menu
export default function Menu({ setIsAddProdModalOpen }) {
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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAddProdModalOpen(true)}
          color="success"
        >
          Add Product
        </Button>
      </Container>
    </Box>
  );
}

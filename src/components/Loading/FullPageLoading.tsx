import { Box, Grid2 as Grid, Skeleton } from "@mui/material";

const FullPageLoading = () => {
  return (
    <Grid container spacing={2} padding={2} minHeight="100vh">
      <Grid
        size={1}
        minHeight="100%"
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            width: "120px",
          },
        }}
      >
        <Skeleton variant="rectangular" height="100%" />
      </Grid>
      <Grid
        sx={{
          width: { xs: "100%", sm: "100%", md: "calc(100% - 140px)" },
        }}
        minHeight="100%"
      >
        <Box sx={{ height: "100%", paddingX: 2 }}>
          <Grid container spacing={2} sx={{ height: "100%" }}>
            <Grid size={12} height="10%">
              <Skeleton variant="rectangular" height="100%" />
            </Grid>
            <Grid size={12} height="90%">
              <Skeleton variant="rectangular" height="100%" />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FullPageLoading;

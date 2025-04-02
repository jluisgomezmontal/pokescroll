import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

export const Pokemon = ({ pokeProp }) => {
  return (
    <Card sx={{ m: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#07F2F2" }} aria-label="recipe">
            {pokeProp.id}
          </Avatar>
        }
        title={pokeProp.name.toUpperCase()}
      />
      <CardMedia
        component="img"
        sx={{
          height: 150,
          width: "auto",
          mx: "auto",
          my: 1,
          objectFit: "contain",
        }}
        image={pokeProp.sprites.other.dream_world.front_default}
        title={pokeProp.name}
      />
      <CardActions
        sx={{
          mt: 5,
        }}
      >
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

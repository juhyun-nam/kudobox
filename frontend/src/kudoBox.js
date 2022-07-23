import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function KudoBox({ title, status, date }) {
  return (
    <Box sx={{ minWidth: 275, maxWidth: 512 }}>
      <Card variant="outlined">
        <CardActionArea
          onClick={() => {
            window.console.log("box click");
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {status}
            </Typography>
            <Typography variant="body2">{date}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

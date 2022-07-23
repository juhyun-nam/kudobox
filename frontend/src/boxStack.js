import * as React from "react";
import KudoBox from "./kudoBox";
import Stack from "@mui/material/Stack";

export default function BoxStack() {
  return (
    <Stack spacing={2} mt={4}>
      <KudoBox title="title" status="status" date="date" />
    </Stack>
  );
}

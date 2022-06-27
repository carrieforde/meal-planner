import { Box, Paper, PaperProps, styled } from "@mui/material";

export const StyledForm = styled(Paper)<PaperProps & { component: string }>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    maxWidth: "100%",
    width: "500px",
  })
);

export const FormBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

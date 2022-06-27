import { Box, Typography } from "@mui/material";
import React, { FormEvent, ReactNode } from "react";
import { StyledForm, FormBody } from "./Form.styles";

export type FormProps = {
  title: string;
  children: ReactNode;
  actions: ReactNode;
  onSubmit: (e: FormEvent) => void;
};

export const Form: React.FC<FormProps> = ({
  title,
  children,
  actions,
  onSubmit,
}) => (
  <StyledForm component="form" onSubmit={onSubmit}>
    <Typography component="h1" variant="h6" mb={1} textAlign="center">
      {title}
    </Typography>

    <FormBody>{children}</FormBody>

    <Box>{actions}</Box>
  </StyledForm>
);

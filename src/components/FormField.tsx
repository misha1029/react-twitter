import React from 'react';
import { TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { useStylesSignIn } from '../pages/SignIn';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type }) => {
  const classes = useStylesSignIn();
  const { register, formState } = useFormContext();

  return (
    <TextField
      {...register(name)}
      error={!!formState.errors[name]?.message}
      helperText={formState.errors[name]?.message}
      name={name}
      className={classes.loginSideField}
      type={type}
      size="small"
      label={label}
      variant="filled"
      fullWidth
    />
  );
};
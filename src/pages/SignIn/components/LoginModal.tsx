/* import { Button, FormControl, FormGroup, TextField } from "@material-ui/core";
import React from "react";
import { useStylesSignIn } from "..";
import { ModalBlock } from "../../../components/ModalBlock";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import * as yup from "yup";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}


export interface LoginFormProps {
    email: string;
    password: string;
  }
  
const LoginFormSchema = yup.object().shape({
  email: yup.string().email("Неверная почта").required("Введите почту"),
  password: yup
    .string()
    .min(6, "​Минимальная длина пароля 6 символов")
    .required(),
});

export const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
}): React.ReactElement => {
  const classes = useStylesSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: yupResolver(LoginFormSchema),
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <ModalBlock
      visible={open}
      onClose={onClose}
      classes={classes}
      title="Войти в аккаунт"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          className={classes.loginFormControl}
          component="fieldset"
          fullWidth
        >
          <FormGroup aria-label="position" row>
            <TextField
              className={classes.loginSideField}
              autoFocus
              id="email"
              label="E-Mail"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="email"
              fullWidth
            />
            <TextField
              className={classes.loginSideField}
              autoFocus
              id="password"
              label="Пароль"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="password"
              fullWidth
            />
            <Button
              onClick={onClose}
              variant="contained"
              color="primary"
              fullWidth
            >
              Войти
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </ModalBlock>
  );
}; */

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, FormGroup } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { FormField } from "../../../components/FormField";
import * as yup from "yup";
import { useStylesSignIn } from "../index";
import { ModalBlock } from "../../../components/ModalBlock";
import {useDispatch, useSelector} from "react-redux";
import { fetchSignIn } from "../../../store/ducks/user/actionCreators";
import { selectUserStatus } from "../../../store/ducks/user/selectors";
import { LoadingStatus } from "../../../store/types";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export interface LoginFormProps {
  email: string;
  password: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
}): React.ReactElement => {
  const classes = useStylesSignIn();

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserStatus);
  
  const [errorMessage, setErrorMessage] = React.useState("");

  const LoginFormSchema = yup.object().shape({
    email: yup.string().email("Неверная почта").required("Введите почту"),
    password: yup
      .string()
      .min(6, "​Минимальная длина пароля 6 символов")
      .required(),
  });

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      dispatch(fetchSignIn(data))
      setErrorMessage("");
    } catch (error) {
      console.warn("Register error", error);
      if (error) {
/*         setErrorMessage("Неверный логин или пароль"); */
      }
    }
  };

  React.useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      onClose();
    } else if (loadingStatus === LoadingStatus.ERROR) {
      setErrorMessage('Неверный логин или пароль');
    }
  }, [loadingStatus]);


  return (
    <ModalBlock
      visible={open}
      onClose={onClose}
      classes={classes}
      title="Войти в аккаунт"
    >
      <div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormControl
              className={classes.loginFormControl}
              component="fieldset"
              fullWidth
            >
              <FormGroup aria-label="position" row>
                <FormField name="email" label="Почта" />
                <FormField name="password" label="Пароль" />
                <div className={classes.errorMessageContainer}>

                    <div className={classes.errorMessage}>
                      {errorMessage && (
                        <Alert severity="error" className="">
                          {errorMessage}
                        </Alert>
                      )}
                  </div>
                  <div>
                    <Button
                      disabled={
                        !form.formState.isValid || form.formState.isSubmitting
                      }
                      type="submit"
                      color="primary"
                      variant="contained"
                    >
                      Войти
                    </Button>
                  </div>
                </div>
              </FormGroup>
            </FormControl>
          </form>
        </FormProvider>
      </div>
    </ModalBlock>
  );
};

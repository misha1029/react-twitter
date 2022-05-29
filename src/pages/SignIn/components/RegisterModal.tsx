import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, FormGroup } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { FormField } from "../../../components/FormField";
import * as yup from "yup";
import { useStylesSignIn } from "../index";
import { ModalBlock } from "../../../components/ModalBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignUp } from "../../../store/ducks/user/actionCreators";
import { selectUserStatus } from "../../../store/ducks/user/selectors";
import { LoadingStatus } from "../../../store/types";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export interface RegisterFormProps {
  fullname: string;
  username: string;
  email: string;
  password: string;
  password2: string;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onClose,
}): React.ReactElement => {
  const classes = useStylesSignIn();

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserStatus);

  const [errorMessage, setErrorMessage] = React.useState("");

  const RegisterFormSchema = yup.object().shape({
    fullname: yup.string().required("Введите своё имя"),
    email: yup.string().email("Неверная почта").required("Введите почту"),
    username: yup.string().required("Введите логин"),
    password: yup
      .string()
      .min(6, "​Минимальная длина пароля 6 символов")
      .required(),
    password2: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не соответствуют"),
  });

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      dispatch(fetchSignUp(data));
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
      setErrorMessage("Ощибка при регистрации");
    }
  }, [loadingStatus]);

  return (
    <ModalBlock
      visible={open}
      onClose={onClose}
      classes={classes}
      title="Регистрация"
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
                <FormField name="username" label="Логин" />
                <FormField name="fullname" label="Ваше имя" />
                <FormField name="password" label="Пароль" />
                <FormField name="password2" label="Подтверждение пароля" />
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
                      Зарегистрироваться
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

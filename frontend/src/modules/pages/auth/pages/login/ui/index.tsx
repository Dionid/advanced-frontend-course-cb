import * as React from "react";
import {useState} from "react";
import {MainLayout} from "../../../../common/ui/MainLayout";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {LoginFormContextProvider, useLoginFormContext} from "./contexts/LoginFormContext";
import {Controller} from "react-hook-form";

const LoginPageInner = () => {
  const {state, fns} = useLoginFormContext()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Grid container justify={"center"} style={{padding: 15}}>
      <Grid item xs={12} sm={4}>
        <Paper style={{padding: 15}}>
          <h2>Login</h2>
          <form onSubmit={fns.onSubmit} style={{display: "flex", flexDirection: "column"}}>
            <Controller
              control={state.control}
              name="email"
              render={
                ({ field: { onChange, value }, fieldState: { error }  }) => {
                  return (
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      error={!!error}
                      helperText={error?.message}
                      onChange={onChange}
                      value={value}
                    />
                  )
                }
              }
            />
            <Controller
              control={state.control}
              name="password"
              render={
                ({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <FormControl error={!!error} variant={"outlined"}>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        onChange={onChange}
                        value={value}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText error={!!error}>
                        { error?.message }
                      </FormHelperText>
                    </FormControl>
                  )
                }
              }
            />
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export const LoginPage = function LoginPage() {
  return (
    <MainLayout>
      <LoginFormContextProvider>
        <LoginPageInner/>
      </LoginFormContextProvider>
    </MainLayout>
  )
}

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormField from "components/FormField";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "util/auth.js";
import { useForm } from "react-hook-form";
import "components/AuthSocial.scss";


function AuthForm(props) {
  const auth = useAuth();

  const [pending, setPending] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const { handleSubmit, register, errors, getValues } = useForm();

  const submitHandlersByType = {
    signin: ({ email, pass }) => {
      return auth.signin(email, pass).then((user) => {
        // Call auth complete handler
        if(!isChecked){
          console.log("wer", isChecked)
          localStorage.clear();
          sessionStorage.clear();

        }
        props.onAuth(user);
        
      });
    },
    signup: ({ email, pass }) => {
      return auth.signup(email, pass).then((user) => {
        // Call auth complete handler
        props.onAuth(user);
      });
    },
    forgotpass: ({ email }) => {
      return auth.sendPasswordResetEmail(email).then(() => {
        // Show success alert message
        props.onFormAlert({
          type: "success",
          message: "Password reset email sent",
        });
      });
    },
    changepass: ({ pass }) => {
      return auth.confirmPasswordReset(pass).then(() => {
        // Show success alert message
        props.onFormAlert({
          type: "success",
          message: "Your password has been changed",
        });
      });
    },
  };

  const onChangeCheckbox = () =>{
    setChecked(!isChecked)
  }
  // Handle form submission
  const onSubmit = ({ email, pass }) => {
    // Show pending indicator
    setPending(true);

    // Call submit handler for auth type
    submitHandlersByType[props.type]({
      email,
      pass,
    })
      .catch((error) => {
        // Show error alert message
        props.onFormAlert({
          type: "error",
          message: error.message,
        });
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {["signup", "signin", "forgotpass"].includes(props.type) && (
        <Form.Group controlId="formEmail">
          <FormField
            size={props.inputSize}
            name="email"
            type="email"
            placeholder="Email"
            error={errors.email}
            inputRef={register({
              required: "Please enter an email",
            })}
          ></FormField>
        </Form.Group>
      )}

      {["signup", "signin", "changepass"].includes(props.type) && (
        <Form.Group controlId="formPassword">
          <FormField
            size={props.inputSize}
            name="pass"
            type="password"
            placeholder="Password"
            error={errors.pass}
            inputRef={register({
              required: "Please enter a password",
            })}
          ></FormField>
        </Form.Group>
      )}


      {["signin"].includes(props.type) && (
        <Form.Group controlId="remember">
          <input type="checkbox" checked={isChecked} name="lsRememberMe" onChange={onChangeCheckbox} className="rememberme" />
          <label>Remember me</label>
        </Form.Group>
      )}

      {["signup", "changepass"].includes(props.type) && (
        <Form.Group controlId="formConfirmPass">
          <FormField
            size={props.inputSize}
            name="confirmPass"
            type="password"
            placeholder="Confirm Password"
            error={errors.confirmPass}
            inputRef={register({
              required: "Please enter your password again",
              validate: (value) => {
                if (value === getValues().pass) {
                  return true;
                } else {
                  return "This doesn't match your password";
                }
              },
            })}
          ></FormField>
        </Form.Group>
      )}

      <Button
        variant="primary"
        block={true}
        size={props.inputSize}
        type="submit"
        disabled={pending}
      >
        {!pending && <span>{props.typeValues.buttonText}</span>}

        {pending && (
          <Spinner
            animation="border"
            size="sm"
            role="status"
            aria-hidden={true}
            className="align-baseline"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </Button>
    </Form>
  );
}

export default AuthForm;
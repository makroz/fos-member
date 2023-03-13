import { useEffect } from "react";
import Input from "../../src/components/forms/Input";
import InputCode from "../../src/components/forms/InputCode";
import Card from "../../src/components/ui/Card";

const LoginView = ({
  formState,
  errors,
  handleChange,
  handleSubmit,
  setCode,
}) => {
  useEffect(() => {
    if (formState.password.length === 4) {
      handleSubmit({ preventDefault: () => {} });
    }
  }, [formState.password]);

  return (
    <>
      <Card>
        <h1 className="mb-4 text-center">Iniciar sesión</h1>
        <Input
          label="CI"
          type="text"
          name="email"
          error={errors}
          value={formState.email}
          onChange={(e) => handleChange(e)}
          placeholder="Ingrese su CI"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              document.getElementById("code1")?.focus();
            }
          }}
        ></Input>
        <InputCode
          label="PIN"
          type="password"
          name="password"
          error={errors}
          setCode={setCode}
          placeholder=""
          digits={4}
          value={formState.password}
        ></InputCode>
      </Card>
    </>
  );
};

export default LoginView;

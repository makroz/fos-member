import { Card } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "../../src/components/forms/Input";
import useAuth from "../../src/hooks/useAuth";
import t from "../../src/utils/traductor";
import InputCode from "../../src/components/forms/InputCode";

const LoginCode = () => {
  const { user, error, login, config }: any = useAuth();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const validaciones = () => {
    let errors = {};
    if (!formState.email) {
      errors = { ...errors, email: t("Documento de Identidad es Requerido") };
    }

    if (formState.password.length != 4) {
      errors = { ...errors, email: "PIN debe tener 4 digitos" };
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validaciones();
    setErrors(valid);
    if (Object.keys(valid).length > 0) {
      setCode("");
      return;
    }

    login(formState).then((data) => {
      if (user || data?.user) {
        router.push((config?.app.link || "") + config?.auth.success);
      } else {
        setErrors({ email: data.message, ...data.errors });
        console.log("====================================");
        console.log("Error222", errors, data.errors);
        console.log("====================================");
      }
      return;
    });
  };

  const setCode = (code) => {
    setFormState((prev) => ({ ...prev, password: code }));
  };

  useEffect(() => {
    if (formState.password.length === 4) {
      handleSubmit({ preventDefault: () => {} });
    }
  }, [formState.password]);

  return (
    <Card className="p-2">
      <h1>{t("Wellcome")}!</h1>
      <h2>{t("Please sign-in to your account and start the adventure")}</h2>
      <br />
      <Input
        label={config?.app.loginLabel || "Email"}
        type="text"
        name="email"
        error={errors}
        value={formState.email}
        onChange={(e) => handleChange(e)}
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
  );
};

export default LoginCode;

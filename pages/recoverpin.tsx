import Head from "../components/layout/Head";
import image1 from "../public/assets/images/recover.webp";
import Image from "next/image";
import Card from "../src/components/ui/Card";
import Input from "../src/components/forms/Input";
import useConfig from "../src/hooks/useConfig";
import { useState } from "react";

const recoverpin = () => {
  const config = useConfig();
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Head return="/" className="opacity-0"></Head>
      <div className="m-5 mt-[75px]">
        <div className="relative flex justify-center mb-5">
          <Image src={image1} alt="recover" />
        </div>
        <Card>
          <h1 className="text-center">Olvide mi PIN</h1>
          <Input
            label={config?.app.loginUser || "Email"}
            type="text"
            name="email"
            error={errors}
            value={formState.email}
            onChange={(e) => handleChange(e)}
            placeholder="Ingrese su CI"
          ></Input>
          <button
            className="btn btn-primary flex-shrink w-full"
            onClick={(e) => {}}
          >
            RESTABLECER
          </button>
        </Card>
      </div>
    </>
  );
};

export default recoverpin;
recoverpin.noAuth = true;

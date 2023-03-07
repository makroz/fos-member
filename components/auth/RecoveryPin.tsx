import Input from "../../src/components/forms/Input";
import Card from "../../src/components/ui/Card";
import Image from "next/image";
import image1 from "../../public/assets/images/recover.webp";

const RecoveryPin = ({ formState, errors, handleChange }) => {
  return (
    <div className="m-5 mt-[75px]">
      <div className="relative flex justify-center mb-5">
        <Image src={image1} alt="recover" />
      </div>
      <Card>
        <h1 className="text-center">Olvide mi PIN</h1>
        <Input
          label="CI"
          type="text"
          name="ci"
          error={errors}
          value={formState.ci}
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
  );
};

export default RecoveryPin;

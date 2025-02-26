import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  label: string;
  inputType: string;
};

export const FormInput = ({ name, label, inputType }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <section className={"flex flex-col"}>
      <div className={"flex mb-3"}>
        <label className={"w-[100px]"} htmlFor={name}>
          {label}:
        </label>
        <input
          className={
            "ml-3 w-[300px] border border-dark_pink bg-transparent rounded-lg text-sm px-3 py-3"
          }
          {...getInputProps({
            id: name,
            type: inputType,
          })}
        />
      </div>
      {error && <span className="text-sm text-red-400 mb-3">{error}*</span>}
    </section>
  );
};

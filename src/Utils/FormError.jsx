import { ErrorMessage } from "formik";

export const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-[12px] mt-1"
    />
  );
};


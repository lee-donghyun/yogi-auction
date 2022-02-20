import { useState } from "react";

const useForm = <T>(
  initialData: T,
  submitForm: (data: T) => Promise<any>,
  getIsValid?: (data: T) => boolean
) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = getIsValid ? getIsValid(data) : true;

  const onChange = (e: any) => {
    let { name, value, type, checked, dataset } = e.target;

    if (dataset?.format === "comma") {
      value = value.split(",").join("");
    }

    if (dataset?.type === "number" || type === "number") {
      value = Number(value);
    }

    if (type === "radio" || type === "checkbox") {
      value = checked;
    }

    setData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!isValid) {
      [...e.target]
        .find(
          ({ value, type }) =>
            !value && (type === "text" || type === "password")
        )
        ?.focus();
      return;
    }
    if (!isLoading) {
      try {
        setIsLoading(true);
        await submitForm(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    data,
    isValid,
    onChange,
    onSubmit,
    isLoading,
    setData,
  };
};

export default useForm;

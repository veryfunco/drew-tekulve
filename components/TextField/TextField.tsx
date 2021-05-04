import {
  useCallback,
  ChangeEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import styles from "./TextField.module.css";

interface Props {
  multiline?: boolean;
  placeholder: string;
  required?: boolean;
  type?: "text" | "email";
  value: string;
  onChange(value: string): void;
}

type CommonInputProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextField({
  multiline,
  placeholder,
  value,
  onChange,
  required,
  type = "text",
}: Props) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  if (type !== "text" && multiline) {
    throw new Error(`Cannot use multiline with type other than "text"`);
  }

  const commonProps: CommonInputProps = {
    placeholder,
    required,
    value,
    className: styles.Input,
    onChange: handleChange,
  };

  return multiline ? (
    <textarea {...commonProps} rows={5} />
  ) : (
    <input {...commonProps} type={type} />
  );
}

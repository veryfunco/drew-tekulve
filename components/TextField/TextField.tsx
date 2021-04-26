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
}: Props) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

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
    <input {...commonProps} />
  );
}

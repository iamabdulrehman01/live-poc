import React, { forwardRef } from "react";
import Input, { InputProps } from "../atoms/Input";

//test
export interface FormFieldProps extends InputProps {
  label: string;
  id: string;
  errorText?: string;
  containerClassName?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, id, errorText, containerClassName = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        <label
          htmlFor={id}
          className="text-sm font-semibold text-[#94a3b8] tracking-wide"
        >
          {label}
        </label>
        <Input ref={ref} id={id} error={!!errorText} {...props} />
        {errorText && (
          <span className="text-xs font-medium text-red-400 mt-1">
            {errorText}
          </span>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";
export default FormField;

import clsx from "clsx";

const InputField = ({
  label,
  id,
  type,
  placeholder,
  error,

  errorMessage,
  ...props
}: {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  error: boolean;
  errorMessage?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          {...props}
          placeholder={placeholder}
          className={clsx(
            "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-blue-500 dark:ring-blue-700 dark:focus-visible:outline-0   focus:border-blue-500 dark:focus:border-blue-800    transition duration-200 ease-in-out text-gray-800 dark:text-white/60 placeholder-gray-400 shadow-sm",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
        />
        {/* Display  validation errors */}
        {error && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default InputField;

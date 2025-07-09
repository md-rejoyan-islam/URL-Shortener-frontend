"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({
  text,
  afterSubmit,
}: {
  text: string;
  afterSubmit: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-semibold text-white
                 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                 transition duration-200 ease-in-out transform hover:scale-105
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? afterSubmit : text}
    </button>
  );
}

export default SubmitButton;

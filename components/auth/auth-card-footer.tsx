import Link from "next/link";

const AuthCardFooter = ({
  label,
  linkText,
  link,
}: {
  label: string;
  linkText: string;
  link: string;
}) => {
  return (
    <div className="text-center text-sm">
      <p className="text-gray-600 dark:text-gray-400">
        {label}
        <Link
          href={link}
          className="font-medium text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthCardFooter;

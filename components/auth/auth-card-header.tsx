const AuthCardHeader = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white     mb-2">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg">{subTitle}</p>
    </div>
  );
};

export default AuthCardHeader;

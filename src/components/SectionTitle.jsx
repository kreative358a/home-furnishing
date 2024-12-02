const SectionTitle = ({ text }) => {
  return (
    <div className="flex stats bg-primary/80 shadow p-2 text-center rounded-md align-middle justify-center justify-items-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] mx-auto">
      <h2 className="text-lg sm-text-xl xl:text-2xl font-medium tracking-wider capitalize text-center mx-auto">
        {text}
      </h2>
    </div>
  );
};
export default SectionTitle;

import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className="btn btn-primary btn-block text-base sm:text-lg xl:text-xl"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner loading-lg text-accent"></span>
          <br />
          <p className="text-base sm:text-lg">sending...</p>
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};
export default SubmitBtn;

import ResetPassword from "../Auth/ResetPassword";

const ForgotPasswordModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="flex justify-end">
        <p
          className="text-sm text-primary hover:text-primary-hover cursor-pointer"
          onClick={toggleModal}
        >
          Forgot password?
        </p>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background rounded-md p-6 w-full max-w-md shadow-md relative">
            <button
              onClick={toggleModal}
              className="absolute top-0 right-3 text-primary hover:text-primary-hover text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl text-center font-semibold mb-4 text-primary">
              Reset Password
            </h2>

            <ResetPassword closeModal={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordModal;

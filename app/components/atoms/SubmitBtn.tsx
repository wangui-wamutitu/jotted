import { useIsSubmitting } from "remix-validated-form";

export const SubmitButton = () => {
  const isSubmitting = useIsSubmitting();
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={
        "bg-dark_pink outline-none text-white rounded-lg mt-2 px-4 py-1"
      }
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};

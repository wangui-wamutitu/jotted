import { Form } from "@remix-run/react";

const WriteCommentForm = () => {
  return (
    <Form method={"POST"} className={"my-2"}>
      <input
        type="text"
        placeholder="Enter your comment..."
        className={
          "w-full bg-transparent outline-none rounded-lg mb-2 border border-dark_pink text-sm px-3 py-2"
        }
      />
      <div className={"w-full flex justify-between"}>
        <input
          type="text"
          placeholder="Enter your name"
          className={
            "w-[48%] bg-transparent outline-none rounded-lg mr-1 border border-dark_pink text-sm px-3 py-2"
          }
        />
        <input
          type="text"
          placeholder="Email (optional)"
          className={
            "w-[48%] bg-transparent outline-none rounded-lg ml-1 border border-dark_pink text-sm px-3 py-2"
          }
        />
      </div>
      <div className={"w-full flex justify-end items-center"}>
        <button
          type="submit"
          className={
            "bg-dark_pink outline-none text-white rounded-lg mt-2 px-4 py-1"
          }
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export default WriteCommentForm;

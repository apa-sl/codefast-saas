"use client";

import { useState, UseState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const FormNewPost = ({ boardId }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default behavior of the form on submission (page refresh)

    // prevent double click and multiple calls
    if (isLoading) return;

    setIsLoading(true);

    try {
      // 1. api call to create a new board
      await axios.post(`/api/post?boardId=${boardId}`, { title, description });

      setTitle(""); // clear the input field
      setDescription(""); // clear the input field

      router.refresh();

      toast.success("Suggestion added");

      // 2. redirect to the new board
    } catch (error) {
      // 1. display err msg (1st check api err from axios, then try cath error, then fallback generic). In 1st added js optional chaining operator so whole app will not crash when tehre is no reponse nor data due to e.g. lack of internet connection
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-base-100 p-8 rounded-3xl space-y-8 w-full md:w-96 shrink-0 md:sticky top-8"
      onSubmit={handleSubmit}
    >
      <p className="font-bold">Suggest a feature</p>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Short decriptive title</span>
        </div>
        <input
          required
          type="text"
          placeholder="e.g. move the button down"
          className="input input-bordered w-full "
          value={title}
          minLength={5}
          maxLength={50}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label className="form-control">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          value={description}
          minLength={5}
          maxLength={1000}
          onChange={(event) => setDescription(event.target.value)}
          className="textarea textarea-bordered h-24"
          placeholder="The login button should be farther away from the top edge of the screen"
        ></textarea>
      </label>
      <button className="btn btn-primary btn-block" type="submit">
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Add Suggestion
      </button>
    </form>
  );
};

export default FormNewPost;

"use client";

import { useState, UseState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const FormNewBoard = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default behavior of the form on submission (page refresh)

    // prevent double click and multiple calls
    if (isLoading) return;

    setIsLoading(true);

    try {
      // 1. api call to create a new board
      const data = await axios.post("/api/board", { name });

      setName(""); // clear the input field

      router.refresh();

      toast.success("Board created");
      // 2. redirect to the new board
    } catch (error) {
      // 1. display err msg (1st check api err from axios, then try cath error, then fallback generic)
      const errorMessage =
        error.response.data.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-base-100 p-8 rounded-3xl space-y-8"
      onSubmit={handleSubmit}
    >
      <p className="font-bold">Create a new board</p>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Board name</span>
        </div>
        <input
          required
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <button className="btn btn-primary btn-block" type="submit">
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Create Board
      </button>
    </form>
  );
};

export default FormNewBoard;

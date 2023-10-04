"use client";
import Rating from "@components/Rating";
import dayjs from "dayjs";
export default function Form({
  value,
  onSubmit,
  onHandleChanged,
  title,
  errors,
}: any) {
  return (
    <>
      <h1 className="text-center font-bold mb-5 text-xl">{title}</h1>
      <form className="w-9/12 mx-auto border p-10 rounded" onSubmit={onSubmit}>
        <div className="my-3">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            value={value?.title}
            onChange={onHandleChanged}
            name="title"
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-full"
          />
          <span className="text-red-500 text-sm">{errors.title}</span>
        </div>
        <div className="my-3">
          <label
            htmlFor="totalPage"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Total Page
          </label>
          <input
            value={value?.totalPage}
            onChange={onHandleChanged}
            name="totalPage"
            type="number"
            placeholder="Type here"
            className="input input-bordered input-info w-full"
          />
          <span className="text-red-500 text-sm">{errors.totalPage}</span>
        </div>
        <div className="my-3">
          <label
            htmlFor="rating"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Rating
          </label>
          <Rating onChange={onHandleChanged} value={value?.rating} />
        </div>
        <div className="my-3">
          <label
            htmlFor="rating"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Published Date
          </label>
          <input
            value={dayjs(value?.publishDate).format("YYYY-MM-DD")}
            name="publishDate"
            type="date"
            onChange={onHandleChanged}
            className="input input-bordered input-info w-full"
          />
          <span className="text-red-500 text-sm">{errors.publishDate}</span>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

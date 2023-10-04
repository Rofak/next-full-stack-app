import { useEffect, useState } from "react";
import { find } from "lodash";
export default function Rating({
  onChange,
  value,
  name,
  disabled = false,
}: any) {
  const [rating, setRating] = useState([
    {
      name: "rating",
      value: 1,
      checked: true,
      class: "bg-red-400",
    },
    {
      name: "rating",
      value: 2,
      checked: false,
      class: "bg-orange-400",
    },
    {
      name: "rating",
      value: 3,
      checked: false,
      class: "bg-yellow-400",
    },
    {
      name: "rating",
      value: 4,
      checked: false,
      class: "bg-lime-400",
    },
    {
      name: "rating",
      value: 5,
      checked: false,
      class: "bg-green-400",
    },
  ]);

  const previous = find(rating, ["checked", true]);

  const changeRating = (current: any) => {
    if (previous) previous.checked = false;
    if (current) current.checked = true;
  };

  if (value) {
    const current = find(rating, ["value", Number(value)]);
    changeRating(current);
  }

  const handleChange = (e: any) => {
    onChange(e);
    const current = find(rating, ["value", Number(e.target.value)]);
    changeRating(current);
  };
  const ratingInput = rating.map((item, index) => {
    return (
      <input
        disabled={disabled}
        key={index}
        value={item.value}
        type="radio"
        onChange={handleChange}
        checked={item.checked}
        name={name ? name : item.name}
        className={`mask mask-heart ${item.class}`}
      />
    );
  });
  return (
    <>
      <div className="rating gap-1">{ratingInput}</div>
    </>
  );
}

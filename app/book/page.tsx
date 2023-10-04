"use client";

import ListTable from "@components/ListTable";
import Rating from "@components/Rating";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { omit } from "lodash";
import { useSession } from "next-auth/react";

export default function Post() {
  const session=useSession()
  const [items, setItems] = useState([{}]);
  const [paginate, setPaginate] = useState({});
  const router = useRouter();
  const headers = [
    { text: "Title", value: "title" },
    { text: "TotalPage", value: "totalPage" },
    { text: "Rating", value: "rating" },
    { text: "PublishDate", value: "publishDate" },
    { text: "Action", value: "action" },
  ];

  const onDeleteBook = async (id: number) => {
    await axios.delete(`/api/book/${id}`);
    getData();
  };

  const buttons = (id: number) => {
    return (
      <>
        <div>
          <Link
            href={`/book/edit/${id}`}
            className="btn btn-primary btn-sm mx-1"
          >
            Edit
          </Link>
          <button
            className="btn btn-secondary btn-sm mx-1"
            onClick={() => onDeleteBook(id)}
          >
            Delete
          </button>
          <button className="btn btn-info btn-sm mx-1">View</button>
        </div>
      </>
    );
  };

  const getData = (limit = 10, page = 1) => {
    fetch(`/api/book?limit=${limit}&page=${page}`)
      .then((res) => res.json())
      .then((data: any) => {
        setPaginate(omit(data, ["result"]));
        const result = data.result.map((item: any) => {
          return {
            ...item,
            rating: (
              <>
                <Rating
                  value={item.rating}
                  name={`${item.id}-rating`}
                  disabled={true}
                />
              </>
            ),
            publishDate: dayjs(item.publishDate).format("YYYY-MM-DD"),
            action: <>{buttons(item.id)}</>,
          };
        });
        setItems(result);
      });
  };
  useEffect(() => {
    getData();
    console.log(session)
  }, []);

  const handlePageClick = ({ selected }: any) => {
    const limit = 10;
    const page = selected + 1;
    getData(limit, page);
  };

  return (
    <>
      <Link href="/book/create" className="btn btn-primary mb-5">
        Create Book
      </Link>
      <ListTable
        headers={headers}
        items={items}
        paginate={paginate}
        handlePageClick={handlePageClick}
      />
    </>
  );
}

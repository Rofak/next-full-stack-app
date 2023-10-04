"use client";
import ListTable from "@components/ListTable";
import { fetchUser } from "@redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { omit } from "lodash";

import { useEffect, useState } from "react";

export default function UserList() {
  const dispatch = useAppDispatch();
  const headers = [
    { text: "Id", value: "id" },
    { text: "Email", value: "email" },
    { text: "Name", value: "name" },
    { text: "Gender", value: "gender" },
    { text: "Action", value: "action" },
  ];
  useEffect(() => {
    dispatch(fetchUser(1));
  }, [dispatch]);
  const users: any = useAppSelector((state) => state.users);
  const handlePageClick = () => {};
  return (
    <>
      <ListTable
        headers={headers}
        items={users.result ? users.result : []}
        paginate={users}
        handlePageClick={handlePageClick}
      />
    </>
  );
}

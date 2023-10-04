"use client";
import ReactPaginate from "react-paginate";
export default function ListTable(props: any) {
  const headers = props.headers.map((item: any, idx: number) => (
    <th key={idx} scope="col" className="px-6 py-3">
      {item.text}
    </th>
  ));
  const items = props.items.map((item: any, idx: number) => (
    <tr
      key={idx}
      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
    >
      {props.headers.map((data: any, index: number) => (
        <th
          key={index}
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {item[data.value]}
        </th>
      ))}
    </tr>
  ));
  const handlePageClick = (event: any) => {
    props.handlePageClick(event);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-center w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>{headers}</tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
        <div className="join mt-5 flex justify-end mb-5 mr-5">
          <ReactPaginate
            onPageChange={handlePageClick}
            containerClassName="flex"
            pageLinkClassName="join-item btn btn-outline btn-info"
            nextLinkClassName="join-item btn btn-outline btn-info"
            previousLinkClassName="join-item btn btn-outline btn-info"
            breakLinkClassName="join-item btn btn-outline btn-info"
            activeLinkClassName="join-item btn btn-outline btn-info btn-active"
            breakLabel="..."
            nextLabel=">"
            pageRangeDisplayed={3}
            pageCount={props.paginate.totalPage ? props.paginate.totalPage : 0}
            previousLabel="<"
            renderOnZeroPageCount={() => null}
          />
        </div>
      </div>
    </>
  );
}

import React from "react";

const ProductsTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl w-full border border-gray-300 mt-6 bg-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="font-semibold text-gray-700">
          <tr>
            <td className="pr-6 py-4">نام کالا</td>
            <td className="py-6">موجودی</td>
            <td className="py-6">قیمت</td>
            <td className="py-6">شناسه کالا</td>
            <td></td>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-gray-700">
          {data?.map((p) => (
            <tr key={p.id}>
              <td className="pr-6 py-4">{p.name}</td>
              <td className="py-4">{p.quantity}</td>
              <td className="py-4">{p.price}</td>
              <td className="py-4">{p.id}</td>
              <td className="py-4 flex items-center gap-2">
                <img
                  src="edit.svg"
                  alt="edit"
                  className="w-6 cursor-pointer"
                  onClick={() => onEdit(p)}
                />
                <img
                  src="trash.svg"
                  alt="delete"
                  className="w-6 cursor-pointer"
                  onClick={() => onDelete(p.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;

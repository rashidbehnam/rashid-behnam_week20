import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cookies from "js-cookie";
import { getProducts } from "../services/products";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import Pagination from "../components/Modal/Pagination";
import { useModal } from "../Context/ModalContext";
import { useConfirm } from "../Context/ConfirmContext";
import ProductForm from "../components/ProductForm";
import { deleteProduct } from "../services/products";
import { toast } from "react-toastify";
import useProfile from "../hooks/useProfile";

const Products = () => {
  const { user } = useProfile();

  const navigate = useNavigate();
  const logOut = () => {
    cookies.remove("jwt-token");
    navigate("/login");
  };
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [searchTerm, setSearchTerm] = React.useState("");
  const filteredProducts = data?.data.data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEdit = (product) => {
    console.log("handle edit", product);
    openModal("", <ProductForm product={product} onClose={closeModal} />);
  };

  const { confirm } = useConfirm();
  const queryClient = useQueryClient();
  const deleteMutaion = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("محصول با موفقیت حذف شد.");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => {
      toast.error("مشکلی در حذف محصول  بوجود آمد.");
      console.log("From delete mutation", err);
    },
  });
  const handleDelete = async (productId) => {
    try {
      const confirmed = await confirm("آیا از حذف محصول اطمینان دارید؟");
      if (confirmed) {
        deleteMutaion.mutate(productId);
      }
    } catch (err) {
      console.log("from delete handler", err);
    }
  };

  const { openModal, closeModal } = useModal();
  const handleNewProduct = () => {
    openModal("", <ProductForm onClose={closeModal} />);
  };

  return (
    <div className="bg-gray-50 min-h-dvh pt-8">
      <main className="max-w-3/4 m-auto">
        <header className="py-2 px-4 w-full flex item-center border border-gray-300 rounded-2xl bg-white">
          <div className="flex items-center grow">
            <img src="search-normal.svg" alt="searchicon" />
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              className="w-full py-2 px-4 border-none outline-none"
              placeholder="جستوجو کالا"
            />
          </div>
          <div className="flex items-center gap-2 border-r pr-4 border-r-gray-300">
            <img src="Felix-Vogel-4.png" alt="profile" />
            <div className="felx fex-col justify-center text-sm">
              <h3 className="font-semibold mb-0">
                {user?.username.split("@")[0]}
              </h3>
              <span
                className="text-gray-700  flex items-center gap-1 cursor-pointer"
                onClick={logOut}
              >
                خروج
                <img src="logout.svg" alt="logout" className="w-4" />
              </span>
            </div>
          </div>
        </header>

        {/* Panel */}

        <div className="flex items-center mt-9">
          <div className="flex items-center gap-1 grow">
            <img src="setting-3.svg" alt="settings" />
            <h3 className="text-2xl font-bold text-gray-700">مدیریت کالا</h3>
          </div>
          <button
            onClick={handleNewProduct}
            className="py-2 px-4 rounded-md text-white bg-blue-400 cursor-pointer"
          >
            افزودن محصول
          </button>
        </div>

        {/* List */}

        <ProductList
          data={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <Pagination data={data} />
      </main>
    </div>
  );
};

export default Products;

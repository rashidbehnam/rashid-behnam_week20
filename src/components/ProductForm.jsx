import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProduct, editProduct } from "../services/products";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

const ProductForm = ({ product, onClose }) => {
  const productSchema = Yup.object().shape({
    name: Yup.string()
      .required("لطفا نام کالا را وارد کنید")
      .min(3, "نام کالا باید حداقل سه حرف داشته باشد."),
    quantity: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("تعداد باید عدد باشد.")
      .positive("تعداد نمیتواند عدد منفی باشد")
      .required("تعداد کالا اجباری است."),
    price: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("قیمت باید عدد باشد.")
      .positive("قیمت نمیتواند عدد منفی باشد")
      .required("قیمت کالا اجباری است"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(productSchema) });

  const queryClient = useQueryClient();

  const createMutaion = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("محصول با موفقیت اضافه شد.");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => {
      toast.error("مشکلی در ایجاد محصول جدید بوجود آمد.");
      console.log("From create mutation", err);
    },
    onSettled: () => {
      onClose();
    },
  });
  const editMutaion = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      toast.success("محصول با موفقیت ویرایش شد.");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => {
      toast.error("مشکلی در ویرایش محصول بوجود آمد.");
      console.log("From edit mutation", err);
    },
    onSettled: () => {
      onClose();
    },
  });
  const onSubmit = (formData) => {
    if (product) {
      editMutaion.mutate({ ...formData, id: product.id });
    } else {
      createMutaion.mutate(formData);
    }
  };
  return (
    <div className="flex flex-col w-90 bg-white  p-6 pb-2 space-y-4">
      {/* Title */}
      <h2 className="text-center text-lg font-bold">
        {product ? "ویرایش محصول" : "ایجاد محصول جدید"}
      </h2>

      {/* Form */}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-1">
        <div className="space-y-1">
          <label htmlFor="name"> نام کالا</label>
          <input
            {...register("name")}
            defaultValue={product?.name}
            placeholder="نام کالا"
            className=" w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className="text-red-400">{errors?.name && errors.name.message}</p>
        </div>
        <div className="space-y-1">
          <label htmlFor="quantity"> تعداد</label>
          <input
            {...register("quantity")}
            defaultValue={product?.quantity}
            placeholder="تعداد"
            className=" w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className="text-red-400">
            {errors?.quantity && errors.quantity.message}
          </p>
        </div>
        <div className="space-y-1">
          <label htmlFor="price"> قیمت </label>
          <input
            {...register("price")}
            defaultValue={product?.price}
            placeholder=" قیمت"
            className=" w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className="text-red-400">
            {errors?.price && errors.price.message}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-around mt-4">
          <button
            className="py-2 px-6 rounded-md text-white bg-blue-400 cursor-pointer "
            type="submit"
          >
            ذخیره
          </button>
          <button
            onClick={onClose}
            className="py-2 px-6 rounded-md text-gray-700 bg-gray-400 cursor-pointer"
            type="button"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

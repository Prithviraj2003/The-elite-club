"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableFooter,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// @ts-ignore
import { Edit, Delete } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: string;
}
interface Row {
  id: string;
  original: Product;
  getVisibleCells: () => any[];
  getIsSelected: () => boolean;
  toggleSelected: (value: boolean) => void;
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    price: 0,
    quantity: "",
  });
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox className="  "
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox className=""
        // checked={row.getIsSelected()}
        // onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.original.name}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price}`,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => row.original.quantity,
    },
    {
      id: "edit",
      header: "Edit",
      cell: ({ row }) => (
        <Button onClick={() => handleEditProduct(row.original)}>Edit</Button>
      ),
    },
    {
      id: "delete",
      header: "Delete",
      cell: ({ row }) => (
        <Button
          variant="destructive"
          onClick={() => handleDeleteProduct(row.original.id)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const handleAddProduct = () => {
    setIsEditMode(false);
    setCurrentProduct({ id: "", name: "", price: 0, quantity: "" });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditMode(true);
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId: String) => {
    await axios.delete(`/api/products/${productId}`);
    fetchProducts();
  };

  const handleDeleteSelectedProducts = async () => {
    const selectedIds = Object.keys(rowSelection).filter(
      (key) => rowSelection[key]
    );
    await Promise.all(
      selectedIds.map((id) => axios.delete(`/api/products/${id}`))
    );
    setRowSelection({});
    fetchProducts();
  };

  const handleSaveProduct = async () => {
    if (isEditMode) {
      await axios.put(`/api/products/${currentProduct.id}`, currentProduct);
    } else {
      await axios.post("/api/products", currentProduct);
    }
    setIsModalOpen(false);
    fetchProducts();
  };

  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      {/* <div className="flex justify-between py-4">
        <Button onClick={handleAddProduct}>Add Product</Button>
        <Button
          variant="destructive"
          onClick={handleDeleteSelectedProducts}
          disabled={Object.keys(rowSelection).length === 0}
        >
          Delete Selected Products
        </Button>
      </div> */}
      <Table className="bg-[#000000] text-[#ffffff] w-full max-w-screen">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-[#a3a3a3] border-opacity-40 w-full flex justify-around">
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row: Row, index) => (
            <Accordion type="single" collapsible className="md:w-auto w-full">
              <AccordionItem value={`item-${row.id}`}>
                <AccordionTrigger className="w-full">
                  <TableRow key={row.id} className="border-[#a3a3a359] border-opacity-35 w-full flex justify-evenly items-center ">
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={cell.id} className={` ${index == 0 ? "40px" : "w-[170px]"} `}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                </AccordionTrigger>
                <AccordionContent className="w-full md:px-4">
                  <div>
                    {/* @ts-ignore */}
                    {products[index].sizes?.map((sizeInfo, index) => (
                      <div className="flex flex-col" key={index}>
                        {index == 0 &&
                          <div className="flex gap-4 md:m-auto ml-8 w-full justify-evenly">
                            <div className="m-2 p-1 w-[150px] md:w-auto"> SIZES </div>
                            <div className="m-2 p-1 w-[150px] md:w-auto"> PRICE </div>
                            <div className="m-2 p-1 w-[170px] md:w-auto"> QUANTITY </div>
                            <div className="m-2 p-1 w-[170px] md:w-auto"> <Edit size={18} /> </div>
                            <div className="m-2 p-1 w-[170px] md:w-auto"> <Delete size={18} /> </div>
                          </div>
                        }
                        <div className="flex">
                          <div className="flex gap-4 md:m-auto ml-10 w-full justify-evenly text-[#ffffff] ">
                            <div className="m-2 p-1 w-[170px] md:w-auto">{sizeInfo.size}</div>
                            <div className="m-2 p-1 w-[170px] md:w-auto">{sizeInfo.price.toFixed().toString()}</div>
                            <div className="m-2 p-1 w-[170px] md:w-auto">{sizeInfo.quantity.toString()}</div>
                            <Dialog>
                              <DialogTrigger>
                                <div className="m-2 p-1 w-[170px] md:w-auto cursor-pointer">EDIT</div>
                              </DialogTrigger>
                              <DialogContent className="bg-[#000000]" >
                                <div className="text-[#ffffff]  " >

                                </div>
                              </DialogContent>
                            </Dialog>
                            <div className="m-2 p-1 w-[170px] md:w-auto">DELETE</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#000000]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogDescription>
              <Input
                value={currentProduct.name}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
                }
                placeholder="Name"
              />
              <Input
                value={currentProduct.price}
                type="number"
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                placeholder="Price"
              />
              <Input
                value={currentProduct.quantity}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    quantity: e.target.value,
                  })
                }
                placeholder="Quantity"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSaveProduct} className="bg-[#ffffff] rounded-lg">
              {isEditMode ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsPage;

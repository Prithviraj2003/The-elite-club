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
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
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
      <div className="flex justify-between py-4">
        <Button onClick={handleAddProduct}>Add Product</Button>
        <Button
          variant="destructive"
          onClick={handleDeleteSelectedProducts}
          disabled={Object.keys(rowSelection).length === 0}
        >
          Delete Selected Products
        </Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
          {table.getRowModel().rows.map((row: Row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
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
            <Button onClick={handleSaveProduct}>
              {isEditMode ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsPage;

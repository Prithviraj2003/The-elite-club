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

interface Quantity {
  id: string,
  size: string;
  quantity: Number;
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setisDeleteMode] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    price: 0,
    description: "",
    imageUrl: "",    //enum
    category: "",    //enum,
    availability: true
  });
  const [AddProduct, setAddCurrentProduct] = useState({
    id: "",
    name: "",
    price: null,
    description: "",
    imageUrl: "",    //enum
    category: "",    //enum,
    availability: true,
    sizes: [
      {
        size: "S",
        price: 0,
        quantity: 0,
        imageUrl: ""
      }, {
        size: "M",
        price: 0,
        quantity: 0,
        imageUrl: ""
      }, {
        size: "L",
        price: 0,
        quantity: 0,
        imageUrl: ""
      }, {
        size: "XL",
        price: 0,
        quantity: 0,
        imageUrl: ""
      },
    ]
  });
  const [setCurrentQuantity, setsetCurrentQuantity] = useState<number | null>(null)
  const [CurrentPrice2, setCurrentPrice2] = useState<number | null>(null)
  const [productAvailability, setproductAvailability] = useState<any>(null)
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [Quantity, setQuantity] = useState<Quantity[]>([])

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data.products);
    const sizes = data.products.sizes
    // setQuantity(sizes)
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
      accessorKey: "description",
      header: "Availability",
      cell: ({ row }) => `${row.original.availability}`,
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
          onClick={() => handleDeleteProduct(row.original)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const handleAddProduct = () => {
    setIsEditMode(false);
    // setCurrentProduct({ id: "", name: "", price: 0, quantity: "" });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditMode(true);
    // @ts-ignore
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateAvailability = async (id: string, availability: boolean, price: number) => {
    try {
      const { data, status } = await axios.put(`/api/changeAvailability`, { id, availability, price })
      if (status) {
        window.location.reload()
      }
    } catch (error) {
    }
  }

  const handleDeleteProduct = async (productId: any) => {
    setisDeleteMode(true)
    setproductAvailability({ id: productId.id, availability: productId.availability! })
    // await axios.delete(`/api/products/${productId}`);
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

  const handleUpdateQuantity = async (id: string, size: string, quantity: number, price: number) => {
    const { data, status } = await axios.put(`/api/products/size/${id}`, {
      size, quantity, price
    })
    console.log(data)
    if (status == 200) {
      window.location.reload()
    }
  }

  const handleSaveProduct = async () => {
    if (isEditMode) {
      await axios.put(`/api/products/${currentProduct.id}`, currentProduct);
    } else {
      await axios.post("/api/products", AddProduct);
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

  const handleSizeChange = (index: any, field: any, value: any) => {
    setAddCurrentProduct((prevProduct) => {
      const updatedSizes = prevProduct.sizes.map((item, idx) => {
        if (idx === index) {
          // Update the specific field of the current size
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      });
      return {
        ...prevProduct,
        size: updatedSizes,
      };
    });
  };
  console.log(AddProduct)
  return (
    <div className=" bg-[#000000] w-full  ">
      <div className="flex items-center justify-between mx-5">
        <div className="flex justify-between py-4 max-w-[150px] ml-9 ">
          <Button onClick={handleAddProduct}
            className="bg-[#5EFD00] rounded-lg font-semibold"
          >Add Product</Button>
        </div>
        <div className="text-[#ffffff] ml-6 p-3"> Total Products ({products.length}) </div>
      </div>
      <Table className="bg-[#000000] text-[#ffffff] w-full max-w-7xl mx-auto">
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
            <Accordion type="single" collapsible className="md:w-auto w-[97%] max-w-7xl mx-auto">
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
                <AccordionContent className="w-[90%] md:px-4">
                  <div>
                    {/* @ts-ignore */}
                    {products[index].sizes?.map((sizeInfo, index) => (
                      <div className="flex flex-col" key={index}>
                        {index == 0 &&
                          <div className="flex gap-4 md:m-auto ml-8 w-full justify-evenly">
                            <div className="m-2 p-1 w-[150px] md:w-auto px-2"> SIZES </div>
                            <div className="m-2 p-1 w-[150px] md:w-auto"> PRICE </div>
                            <div className="m-2 p-1 w-[170px] md:w-auto"> QUANTITY </div>
                            <div className="m-2 p-1 w-[170px] md:w-auto pl-16"> <Edit size={18} /> </div>
                          </div>
                        }
                        <div className="flex">
                          <div className="flex gap-4 md:m-auto ml-10 w-full justify-evenly text-[#ffffff] ">
                            <div className="m-2 p-1 w-[170px] md:w-auto">{sizeInfo.size}</div>
                            <div className="m-2 p-1 w-[170px] md:w-auto text-[#ffffff]">₹{sizeInfo.price.toFixed().toString()}</div>
                            <div className="m-2 p-1 w-[170px] md:w-auto">{sizeInfo.quantity.toString()}</div>
                            <Dialog>
                              <DialogTrigger onClick={() => { setsetCurrentQuantity(sizeInfo.quantity), setCurrentPrice2(sizeInfo.price) }} >
                                <div className="m-2 p-1 w-[170px] md:w-auto cursor-pointer">EDIT</div>
                              </DialogTrigger>
                              <DialogContent className="bg-[#000000]" >
                                <div className="text-[#ffffff] m-5 " >
                                  <div className="mb-3">
                                    Update Product Quantity
                                  </div>
                                  <input type="number" className="border border-[#ffffff]" value={setCurrentQuantity!}
                                    onChange={(e) => setsetCurrentQuantity(Number(e.target.value))} />
                                  <input type="number" className="border border-[#ffffff]" value={CurrentPrice2!}
                                    onChange={(e) => setCurrentPrice2(Number(e.target.value))} />
                                  <button className="my-3 bg-[#ffffff] text-[#000000] text-sm px-4 py-2 rounded-lg"
                                    onClick={() => handleUpdateQuantity(sizeInfo.id, sizeInfo.size, setCurrentQuantity!, CurrentPrice2!)}
                                  >
                                    Update Quantity </button>
                                </div>
                              </DialogContent>
                            </Dialog>


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
        <DialogContent className="bg-[#000000] w-[500px] text-[#ffffff] h-[87vh] overflow-y-scroll">
          <div className="">
            <Input
              value={AddProduct.name}
              onChange={(e) =>
                setAddCurrentProduct((v) => ({ ...v, name: e.target.value }))
              }
              placeholder="Name"
            />
            <Input
              value={AddProduct.description}
              onChange={(e) =>
                setAddCurrentProduct((v) => ({ ...v, description: e.target.value }))
              }
              placeholder="Description"
            />
            <Input
              value={AddProduct.price ?? 0}
              onChange={(e) =>
                setAddCurrentProduct({
                  ...AddProduct,
                  // @ts-ignore
                  price: parseFloat(e.target.value),
                })
              }
              placeholder="Price"
            />
            <Input
              placeholder="Image URL"
              value={AddProduct.imageUrl}
              onChange={(e) => setAddCurrentProduct((v) => ({
                ...v,
                imageUrl: e.target.value
              }))}
            />
            <div className="flex gap-3 flex-col justify-between">
              <div className="flex items-center justify-evenly ">
                <div>S</div>
                <div> <Input
                  placeholder="Quantity"
                  type="number"
                  onChange={(e) =>
                    handleSizeChange(0, "quantity", e.target.value)
                  }
                /></div>
                <div> <Input
                  placeholder="Price"
                  type="number"
                  onChange={(e) =>
                    handleSizeChange(0, "price", parseFloat(e.target.value))
                  }
                /> </div>
              </div>
              <div> <Input placeholder="Image Url"
                onChange={(e) =>
                  handleSizeChange(0, "imageUrl", e.target.value)
                }
              /> </div>
            </div>
            <div className="flex gap-3 flex-col justify-between">
              <div className="flex items-center justify-evenly ">
                <div>M</div>
                <div> <Input placeholder="Quantity" /> </div>
                <div> <Input placeholder="price" type="number" /> </div>
              </div>
              <div> <Input placeholder="Image Url" /> </div>
            </div>
            <div className="flex gap-3 flex-col justify-between">
              <div className="flex items-center justify-evenly ">
                <div>L</div>
                <div> <Input placeholder="Quantity" /> </div>
                <div> <Input placeholder="price" type="number" /> </div>
              </div>
              <div> <Input placeholder="Image Url" /> </div>
            </div>
            <div className="flex gap-3 flex-col justify-between ">
              <div className="flex items-center justify-evenly ">
                <div>XL</div>
                <div> <Input placeholder="Quantity" /> </div>
                <div> <Input placeholder="price" type="number" /> </div>
              </div>
              <div> <Input placeholder="Image Url" /> </div>
            </div>
            <div>
              <select name="Category" id="" className="w-full m-2" onChange={(e) => setAddCurrentProduct((val) => ({
                ...AddProduct,
                category: e.target.value
              })
              )}>
                <option className="bg-[#000000] text-[#fffffff]" value="ELECTRONICS">ELECTRONICS</option>
                <option className="bg-[#000000] text-[#fffffff]" value="CLOTHING">CLOTHING</option>
                <option className="bg-[#000000] text-[#fffffff]" value="BOOKS">BOOKS</option>
                <option className="bg-[#000000] text-[#fffffff]" value="FURNITURE">FURNITURE</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveProduct} className="bg-[#5EFD00] rounded-lg font-semibold">
              {isEditMode ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteMode} onOpenChange={() => setisDeleteMode((val) => !val)} >
        <DialogTrigger >
          <div className="m-2 p-1 w-[170px] md:w-auto"  >DELETE</div>
        </DialogTrigger>
        <DialogContent className="bg-[#000000]" >
          <div className="text-[#ffffff] m-5 " >
            <div className="mb-3">
              Update Product Availability
            </div>
            {productAvailability && productAvailability?.availability == true && <div className="text-[#2bff36]"> Product availability: Public </div>}
            {productAvailability && productAvailability?.availability == false && <div className="text-[#ff2c2c]"> Product availability: Private  </div>}
            <button className="my-3 bg-[#ffffff] text-[#000000] text-sm px-4 py-2 rounded-lg"
              onClick={() => handleUpdateAvailability(productAvailability.id, !productAvailability.availability, productAvailability.price)}
            >
              Change Availability </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsPage;

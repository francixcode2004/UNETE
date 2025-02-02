import { useState } from 'react';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import PropTypes from "prop-types";

// Button Component
function Button({ className = '', variant = 'default', size = 'default', children, ...props }) {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
    const variantStyles = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
    };
    const sizeStyles = {
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
    };

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'ghost']),
    size: PropTypes.oneOf(['default', 'icon']),
    children: PropTypes.node.isRequired,
};

// Input Component
function Input({ className = '', ...props }) {
    const baseStyles = `
    flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background
    file:border-0 file:bg-transparent file:text-sm file:font-medium
    placeholder:text-muted-foreground
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
  `;
    return <input className={`${baseStyles} ${className}`} {...props} />;
}

Input.propTypes = {
    className: PropTypes.string,
};


// Table Components
function Table({ children, className = '', ...props }) {
    return (
        <div className="relative w-full overflow-auto">
            <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
                {children}
            </table>
        </div>
    );
}

Table.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};


function TableHeader({ children, className = '', ...props }) {
    return (
        <thead className={`[&_tr]:border-b ${className}`} {...props}>
        {children}
        </thead>
    );
}

TableHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};


function TableBody({ children, className = '', ...props }) {
    return (
        <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
        {children}
        </tbody>
    );
}

TableBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};


function TableRow({ children, className = '', ...props }) {
    return (
        <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`} {...props}>
            {children}
        </tr>
    );
}

TableRow.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};


function TableHead({ children, className = '', ...props }) {
    return (
        <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
            {children}
        </th>
    );
}

TableHead.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};


function TableCell({ children, className = '', ...props }) {
    return (
        <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
            {children}
        </td>
    );
}

TableCell.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};


// Main Product Table Component
function ProductTable() {
    const [products, setProducts] = useState([
        { id: 1, name: "Pincel", price: 10, stock: 100, imageUrl: "/placeholder.svg" },
        { id: 2, name: "Labial", price: 15, stock: 50, imageUrl: "/placeholder.svg" },
        { id: 3, name: "Base", price: 20, stock: 75, imageUrl: "/placeholder.svg" },
    ]);

    const [editingId, setEditingId] = useState(null);
    const [newProduct, setNewProduct] = useState({});
    const [isAdding, setIsAdding] = useState(false);

    const handleEdit = (product) => {
        setEditingId(product.id);
        setNewProduct(product);
    };

    const handleSave = () => {
        if (editingId) {
            setProducts(products.map((p) => (p.id === editingId ? { ...p, ...newProduct } : p)));
            setEditingId(null);
        }
        setNewProduct({});
    };

    const handleDelete = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    const handleAdd = () => {
        if (newProduct.name && newProduct.price && newProduct.stock) {
            const newId = Math.max(...products.map((p) => p.id), 0) + 1;
            setProducts([
                ...products,
                {
                    id: newId,
                    imageUrl: "/placeholder.svg",
                    ...newProduct,
                },
            ]);
            setIsAdding(false);
            setNewProduct({});
        }
    };

    const handleChange = (field, value) => {
        setNewProduct({
            ...newProduct,
            [field]: field === "name" ? value : Number(value),
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-2">Panel de Administración</h1>
                        <div className="flex space-x-4">
                            <button className="text-gray-600 hover:text-gray-900 font-medium">Productos</button>
                            <button className="text-gray-600 hover:text-gray-900 font-medium">Pedidos</button>
                            <button className="text-gray-600 hover:text-gray-900 font-medium">Usuarios</button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Gestión de Productos</h2>
                        <Button onClick={() => setIsAdding(true)} disabled={isAdding} className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Añadir Producto
                        </Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isAdding && (
                                <TableRow>
                                    <TableCell>Nuevo</TableCell>
                                    <TableCell>
                                        <Input
                                            value={newProduct.name || ""}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            placeholder="Nombre del producto"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={newProduct.price || ""}
                                            onChange={(e) => handleChange("price", e.target.value)}
                                            placeholder="Precio"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={newProduct.stock || ""}
                                            onChange={(e) => handleChange("stock", e.target.value)}
                                            placeholder="Stock"
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={handleAdd}>
                                            <Save className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => setIsAdding(false)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>
                                        {editingId === product.id ? (
                                            <Input
                                                value={newProduct.name || ""}
                                                onChange={(e) => handleChange("name", e.target.value)}
                                            />
                                        ) : (
                                            product.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingId === product.id ? (
                                            <Input
                                                type="number"
                                                value={newProduct.price || ""}
                                                onChange={(e) => handleChange("price", e.target.value)}
                                            />
                                        ) : (
                                            `$${product.price}`
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingId === product.id ? (
                                            <Input
                                                type="number"
                                                value={newProduct.stock || ""}
                                                onChange={(e) => handleChange("stock", e.target.value)}
                                            />
                                        ) : (
                                            product.stock
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {editingId === product.id ? (
                                            <>
                                                <Button variant="ghost" size="icon" onClick={handleSave}>
                                                    <Save className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => setEditingId(null)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default ProductTable;
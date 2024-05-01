import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Products = (props) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        sizes: '',
        imageUrl: '',
    });

    const { name, price, sizes, imageUrl } = formData;

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        await addProduct(event);
        await updateProduct (event);
    };
   

    const handleChange = (e) => {
        if (e.target.name === 'imageUrl') {
            setFormData({
                ...formData,
                imageUrl: e.target.files[0],
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const addProduct = async (event) => {
        event.preventDefault();
        const ownerId = props.userLogged.userID;
        if (!ownerId) {
            alert('Please Login again!');
            navigate('/getloginotp');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('ownerId', ownerId);
        formData.append('sizes', sizes);
        formData.append('imageUrl', imageUrl);

        try {
            const response = await fetch('http://localhost:3200/api/products/', {
                method: 'POST',
                headers: {
                    Authorization: props.userLogged.token,
                },
                body: formData,
            });
            if (!response.ok) {
                console.log('Failed to Save!!');
                return;
            }
            const responseData = await response.json();
            console.log(responseData);
            Swal.fire({
                icon: 'success',
                title: name + ' added successfully!',
                showConfirmButton: false,
                timer: 3000,
            });
            getProducts();
            setFormData({
                name: '',
                price: '',
                sizes: '',
                imageUrl: '',
            });
        } catch (error) {
            console.error('Error saving details:', error.message);
        }
    };

    const getProducts = useCallback(async () => {
        const ownerId = props.userLogged.userID;
        if (!ownerId) {
            alert('Please Login again!');
            navigate('/getloginotp');
            return;
        }

        try {
            const formData = { ownerId: ownerId };
            const response = await fetch('http://localhost:3200/api/products/myProducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: props.userLogged.token,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                console.log('Failed to load products!!');
                navigate('/getloginotp');
                return;
            }
            const responseData = await response.json();
            setProducts(responseData);
        } catch (error) {
            console.error('Error loading Products:', error.message);
        }
    }, [props, navigate]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const confirmDelete = (productName, productId) => {
        Swal.fire({
            icon: 'question',
            text: `Are you sure you want to delete ${productName}?`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(productName, productId);
            }
        });
    };

    const deleteProduct = async (prodName, prodId) => {
        const userId = props.userLogged.userID;
        if (!userId) {
            alert('Please Login again!');
            navigate('/getloginotp');
            return;
        }

        try {
            const url = 'http://localhost:3200/api/products/' + prodId;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: props.userLogged.token,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            Swal.fire({
                icon: 'success',
                title: prodName + ' deleted successfully!',
                showConfirmButton: false,
                timer: 3000,
            });
            getProducts();
        } catch (error) {
            console.error('Error deleting product:', error.message);
            navigate('/getloginotp');
        }
    };

    const updateProduct = async (prodId, updatedData) => {
        const userId = props.userLogged.userID;
        if (!userId) {
            alert('Please Login again!');
            navigate('/getloginotp');
            return;
        }

        try {
            const url = 'http://localhost:3200/api/products/' + prodId;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: props.userLogged.token,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            Swal.fire({
                icon: 'success',
                title: 'Product updated successfully!',
                showConfirmButton: false,
                timer: 3000,
            });

            getProducts();
        } catch (error) {
            console.error('Error updating product:', error.message);
            navigate('/getloginotp');
        }
    };

    return (
        <>
            <div className="card">
                <div className="card-header text-white" style={{ backgroundColor: '#2a5c99' }}>
                    <h3 className="tm-hero-title mb-0">
                        My Products
                        <button className='btn btn-sm bg-info rounded-pill position-absolute end-0 me-3' data-bs-toggle="modal" data-bs-target='#AddProdModal'><i className="bi bi-plus-circle"></i> Add New</button>
                    </h3>
                </div>
                <div className="card-body row">
                <form class="d-flex " role="search">
        <input class="form-control me-2" type="search" placeholder="Search by name" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>

      <hr />
                    {products.map((product, index) => (
                        <div className='col-sm-6' key={index}>
                            <div className="card m-3 border-0">
                                <div className="menu-item">
                                    <div className="menu-item-thumbnail">
                                        <img src={'http://localhost:3200/uploads/' + product.imageUrl} className="img-fluid rounded-start w-100 h-100" alt="..." />
                                    </div>
                                    <div className="menu-item-description position-relative">
                                        <h5>{product.name}</h5>
                                        <p>Size: {product.sizes.map((size, idx) => <span key={idx}>{size}</span>)}</p>
                                    </div>
                                    <div className="menu-item-price">
                                        <h6>Rs.{product.price}/-</h6>
                                    </div>
                                    <div className='position-absolute top-0 end-0 m-3'>
                                        <button type='button' className='btn btn-sm btn-danger rounded-pill float-end' onClick={() => confirmDelete(product.name, product._id)}><i className="bi bi-trash"></i></button>
                                        <button className='btn btn-sm btn-danger rounded-pill float-end' data-bs-toggle="modal" data-bs-target='#UpdateProdModal' onClick={() => setFormData({ ...formData, name: product.name, price: product.price, sizes: product.sizes.join(', ') })}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add product modal */}
            <div className="modal fade" id="AddProdModal" tabIndex="-1" aria-labelledby="AddProdModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddProdModalLabel">Add a Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control rounded-pill" placeholder="Name" name="name" value={name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control rounded-pill" placeholder="Price" name="price" value={price} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control rounded-pill" placeholder="Sizes" name="sizes" value={sizes} onChange={handleChange} required />
                                </div>
                                <input type="file" name="imageUrl" onChange={handleChange} required />
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-success rounded-pill">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update product modal */}
            <div className="modal fade" id="UpdateProdModal" tabIndex="-1" aria-labelledby="UpdateProdModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="UpdateProdModalLabel">Update Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control rounded-pill" placeholder="Name" name="name" value={name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control rounded-pill" placeholder="Price" name="price" value={price} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control rounded-pill" placeholder="Sizes" name="sizes" value={sizes} onChange={handleChange} required />
                                </div>
                                <input type="file" name="imageUrl" onChange={handleChange} required />
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-success rounded-pill">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;

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
            const response = await fetch('https://qmunuback.onrender.com/api/products/', {
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
            const response = await fetch('https://qmunuback.onrender.com/api/products/myProducts', {
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
        if (window.confirm(`Are you sure you want to delete ${productName}?`)) {
            deleteProduct(productName, productId);
        }
    };

    const deleteProduct = async (prodName, prodId) => {
        const userId = props.userLogged.userID;
        if (!userId) {
            alert('Please Login again!');
            navigate('/getloginotp');
            return;
        }

        try {
            const url = 'https://qmunuback.onrender.com/api/products/' + prodId;
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

    return (
        <>
            <div className="card">
                <div className="card-header text-white" style={{ backgroundColor: '#2a5c99' }}>
                    <h3 className="tm-hero-title mb-0">
                        My Products
                        <button className='btn btn-sm bg-info rounded-pill position-absolute end-0 me-3' data-bs-toggle="modal" data-bs-target='#editProdModal'><i className="bi bi-plus-circle"></i> Add New</button>
                    </h3>
                </div>
                <div className="card-body row">
                    {products.map((product, index) => (
                        <div className='col-sm-6' key={index}>
                            <div className="card m-3 border-0">
                                <div className="menu-item">
                                    <div className="menu-item-thumbnail">
                                        <img src={'https://qmunuback.onrender.com/uploads/' + product.imageUrl} className="img-fluid rounded-start w-100 h-100" alt="..." />
                                    </div>
                                    <div className="menu-item-description position-relative">
                                        <h5>{product.name}</h5>
                                        <p>Size: {product.sizes.map((size, idx) => <span key={idx}>{size}</span>)}</p>
                                    </div>
                                    <div className="menu-item-price">
                                        <p>Rs.{product.price}/-</p>
                                    </div>
                                    <div className='position-absolute top-0 end-0 m-3'>
                                        <button type='button' className='btn btn-sm btn-danger rounded-pill float-end' onClick={() => confirmDelete(product.name, product._id)}><i className="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div class="modal fade" id={'prodIMGModal_' + product._id} tabIndex="-1" aria-labelledby="prodIMGModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="prodIMGModalLabel">Modal title</h5>
                                        </div>
                                        <div class="modal-body">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    ))}
                </div>
            </div>

            {/* Add product modal */}
            <div className="modal fade" id="editProdModal" tabIndex="-1" aria-labelledby="editProdModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editProdModalLabel">Add a Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addProduct}>
                                <div className="mb-3">
                                    <input type="text" className="form-control rounded-pill" placeholder="Name" name="name" value={name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control rounded-pill" placeholder="Price" name="price" value={price} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control rounded-pill" placeholder="Sizes" name="sizes" value={sizes} onChange={handleChange} required />
                                </div>
                                <input type="file" name="imageUrl" onChange={handleChange} />

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

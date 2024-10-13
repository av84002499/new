import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../Loader';

const Products = (props) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)



    const [formData, setFormData] = useState({
        name: '',
        price: '',
        sizes: '',
        imageUrl: '',
        productId: '', // Added productId field for update form
    });

    const { name, price, sizes, imageUrl, productId } = formData;

    const resetForm = () => {
        setFormData({
            ...formData,
            name: '',
            price: '',
            sizes: '',
            imageUrl: '',
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (event.target.id === 'addForm') {
            await addProduct();
        } else if (event.target.id === 'updateForm') {
            await updateProduct(productId, {
                name,
                price,
                sizes: sizes.split(',').map(size => size.trim()),
                imageUrl,
            });
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'imageUrl' && e.target.files) {
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


    const addProduct = async () => {
        const ownerId = props.userLogged.userID;
        if (!ownerId) {
            alert('Please Login again!');
            navigate('/Signin');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('ownerId', ownerId);
        formData.append('sizes', sizes);
        formData.append('imageUrl', imageUrl);

        try {
            setLoading(true)
            const response = await fetch('https://quickcatalog.online/api/products/', {
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
            resetForm(); // Reset form fields after successful addition
        } catch (error) {
            console.error('Error saving details:', error.message);
        } finally{
            setLoading(false)
        }
    };

    const getProducts = useCallback(async () => {
        const ownerId = props.userLogged.userID;
        if (!ownerId) {
            alert('Please Login again!');
            navigate('/Signin');
            return;
        }

        try {
            setLoading(true)
            const formData = { ownerId: ownerId };
            const response = await fetch('https://quickcatalog.online/api/products/myProducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: props.userLogged.token,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                console.log('Failed to load products!!');
                navigate('/Signin');
                return;
            }
            const responseData = await response.json();
            setProducts(responseData);
        } catch (error) {
            console.error('Error loading Products:', error.message);
        } finally{
            setLoading(false)
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
            navigate('/Signin');
            return;
        }

        try {
            setLoading(true)
            const url = 'https://quickcatalog.online/api/products/' + prodId;
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
            navigate('/Signin');
        } finally{
            setLoading(false)
        }
    };

    const editProduct = (productId, name, price, sizes, imageUrl) => {
        setFormData({
            ...formData,
            productId: productId,
            name: name,
            price: price,
            sizes: sizes.join(', '),
            imageUrl: imageUrl,
        });
    };

    const updateProduct = async (prodId, updatedData) => {
        const userId = props.userLogged.userID;
        if (!userId) {
            alert('Please Login again!');
            navigate('/Signin');
            return;
        }

        try {
            setLoading(true)
            const url = 'https://quickcatalog.online/api/products/' + prodId;
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
            navigate('/Signin');
        } finally{
            setLoading(false)
        }
    };

    const saveimageurl = async (e) => {
        e.preventDefault() // Prevent form from submitting the traditional way

        const userId = props.userLogged.userID;
        if (!userId) {
            alert('Please Login again!');
            navigate('/Signin');
            return;
        }

        const prodId = e.target.prodId.value;  // Get the prodId from form input
        if (!prodId) {
            alert("Product ID is required!");
            return;
        }

        try {
            setLoading(true)
            const formDataToSend = new FormData(e.target); // Include form fields

            const response = await fetch('https://quickcatalog.online/api/imagurl/prodimg', {
                method: 'POST',
                headers: {
                    Authorization: props.userLogged.token,  // Authorization token
                },
                body: formDataToSend,  // Automatically sets appropriate content type for FormData
            });

            if (!response.ok) {
                console.log('Failed to Save!!');
                return;
            }

            const responseData = await response.json();
            console.log(responseData);

            Swal.fire({
                icon: 'success',
                title: 'Details updated successfully!',
                showConfirmButton: false,
                timer: 3000, // 3 seconds
            });

            getProducts();  // Update products after successful save
        } catch (error) {
            console.error('Error saving details:', error.message);
            alert(error.message);
        } finally{
            setLoading(false)
        }
    };




    return (
        <>
            <div className="card">
                <div className="card-header text-white" style={{ backgroundColor: '#2a5c99' }}>
                    <h3 className="tm-hero-title mb-0">
                        My Products
                        <button className='btn btn-sm bg-info rounded-pill position-absolute py-1 px-2 end-0 me-3' data-bs-toggle="modal" data-bs-target='#AddProdModal'><i className="bi bi-plus-circle"></i> Add New</button>
                    </h3>
                </div>

                <div className="card-body row">
                    <hr />
                    <div className="row row-cols-1  row-cols-md-2 row-cols-lg-4 g-4">
                        {products.map((product, index) => (
                            <div className="col" key={index}>
                                <div className="card">
                                    <img src={'https://quickcatalog.online/uploads/' + product.imageUrl} className="card-img-top" style={{ maxHeight: '250px', objectFit: 'cover' }} alt="Product" />
                                    <button type="button" className="btn btn-warning rounded-pill position-absolute top-0 end-0 m-1 p-1" data-bs-toggle="modal" data-bs-target={"#prodModal" + product._id}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <div className="modal fade" id={"prodModal" + product._id} tabIndex="-1" aria-labelledby="prodModalLabel" aria-hidden="true">

                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="prodModalLabel">Change Product Picture</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form id="ProdectImgForm" onSubmit={saveimageurl} encType="multipart/form-data">
                                                        <input className="d-none" type="text" id="prodId" name="prodId" defaultValue={product._id} />
                                                        <input className="form-control mb-3 rounded-pill" type="file" id="prodIMG" name="imageUrl" accept="image/*" required />
                                                        <button className="btn btn-success rounded-pill float-end ms-3" type='submit'>Save</button>
                                                        <button type="button" className="btn btn-secondary float-end rounded-pill" data-bs-dismiss="modal">Cancel</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <h6>Rs.{product.price}/-</h6>
                                        <p className="card-text">Size: {product.sizes.map((size, idx) => <span key={idx}>{size}</span>)}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button className='btn btn-sm btn-info rounded-pill col-5' data-bs-toggle="modal" data-bs-target={'#UpdateProdModal'+product._id} onClick={() => editProduct(product._id, product.name, product.price, product.sizes, product.imageUrl)}>Edit</button>
                                        <button className='btn btn-sm btn-danger rounded-pill col-5 float-end' onClick={() => confirmDelete(product.name, product._id)}><i className="bi bi-trash"></i></button>
                                    </div>
                                </div>
                                {/* Update product modal */}
                                <div className="modal fade" id={"UpdateProdModal"+product._id} tabIndex="-1" aria-labelledby="UpdateProdModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="UpdateProdModalLabel">Update Product</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form id="updateForm" onSubmit={handleSubmit}>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control rounded-pill" placeholder="Name" name="name" value={name} onChange={handleChange} required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="number" className="form-control rounded-pill" placeholder="Price" name="price" value={price} onChange={handleChange} required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control rounded-pill" placeholder="Sizes" name="sizes" value={sizes} onChange={handleChange} required />
                                                    </div>
                                                    {/* <input type="file" name="imageUrl" onChange={handleChange} required /> */}

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                                                        <button type="submit" className="btn btn-success rounded-pill">Update</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add product modal */}
            <div className="modal fade" id="AddProdModal" tabIndex="-1" aria-labelledby="AddProdModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title " id="AddProdModalLabel">Add a Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="addForm" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control rounded-pill" placeholder="Name" name="name" value={name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control rounded-pill" placeholder="Price" name="price" value={price} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control rounded-pill" placeholder="Sizes" name="sizes" value={sizes} onChange={handleChange} required />
                                </div>
                                {/* <input type="file" name="imageUrl" onChange={handleChange} required /> */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-success rounded-pill"> Save </button>                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    );
};

export default Products;
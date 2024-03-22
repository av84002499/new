import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Products = (props) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([])

    const addProduct = async (event) => {
        event.preventDefault();
        const ownerId = props.userLogged.userID;
        if (!ownerId) {
            alert('Please Login again!');
            navigate('/Signin');
            return;
        }
        console.log('Adding New product');

        const name = document.getElementById('prodName').value;
        const price = document.getElementById('prodPrice').value;
        const sizes = document.getElementById('Prodsizes').value;
        var formData = { name: name, price: price, ownerId: ownerId, sizes: sizes }

        console.log('Product:', formData);

        try {
            const response = await fetch('https://qmunuback.onrender.com/api/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": props.userLogged.token,
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                console.log('Failed to Save!!');
                return;
            }
            try {
                const responseData = await response.json();
                console.log(responseData);
                Swal.fire({
                    icon: 'success',
                    title: name + ' added successfully!',
                    showConfirmButton: false,
                    timer: 3000, // 3 seconds
                });
                getProducts();
            }
            catch {
                console.log('Something went wrong!!');
            }
        }
        catch (error) {
            console.error('Error saving details:', error.message);
        }
    }


    const getProducts = useCallback(async () => {
        const ownerId = props.userLogged.userID;
        if (!ownerId) {
            alert('Please Login again!');
            navigate('/Signin');
            return;


        }
        try {
            const formData = { 'ownerId': ownerId };
            const response = await fetch('https://qmunuback.onrender.com/api/products/myProducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": props.userLogged.token,
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                console.log('Failed to load products!!');
                navigate('/Signin');
                return;
            }
            try {
                const responseData = await response.json();
                setProducts(responseData);
            }
            catch {
                console.log('Something went wrong!!');
                console.log('Failed to load products!');
                return;
            }
        }
        catch (error) {
            console.error('Error loading Products:', error.message);
        }
    }, [props, navigate]);

    const deleteProduct = async (prodName, prodId) => {
        const userId = props.userLogged.userID;
        if (!userId) {
            alert('Please Login again!');
            navigate('/Signin');
            return;
        }

        try {
            const url = 'https://qmunuback.onrender.com/api/products/' + prodId;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": props.userLogged.token,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            Swal.fire({
                icon: 'success',
                title: prodName + ' deleted successfully!',
                showConfirmButton: false,
                timer: 3000, // 3 seconds
            });
            getProducts();
        } catch (error) {
            console.error('Error deleting product:', error.message);
            navigate('/Signin');
            return;
        }
    };

    useEffect(() => {
        getProducts();
    }, [getProducts]);

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
                    {products.map((product, index) => (<>
                        <div className='col-sm-6'>
                            <div className="card m-3 border-0">
                                <div className="menu-item">
                                    <div className="menu-item-thumbnail">
                                        <img src={'https://qmunuback.onrender.com/uploads/' + product.imageUrl} className="img-fluid rounded-start w-100 h-100" alt="..." />
                                        <button type="button" className="btn btn-warning rounded-pill position-absolute top-0 start-0 p-1" data-bs-toggle="modal" data-bs-target={'#' + product._id}><i className="bi bi-pencil-square p-1"></i></button>
                                    </div>
                                    <div className="menu-item-description position-relative">
                                        <h5>{product.name}</h5>
                                        <p>Size: {product.sizes.map((size) => (<>
                                            {size}
                                        </>))}
                                        </p>

                                    </div>
                                    <div className="menu-item-price">
                                        <p>Rs.{product.price}/-</p>
                                    </div>

                                    <div className='position-absolute top-0 end-0 m-3'>
                                        <button type='button' className='btn btn-sm btn-danger rounded-pill float-end' onClick={() => deleteProduct(product.name, product._id)}><i className="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id={product._id} tabIndex="-1" aria-labelledby="prodIMGModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="prodIMGModalLabel">Modal title</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form id='shopImgForm' action="https://qmunuback.onrender.com/api/upload/prodimg" method="post" encType="multipart/form-data">
                                                <input className="form-control mb-3 rounded-pill d-none" type="text" id="prodId" name="prodId" defaultValue={product._id} />
                                                <input className="form-control mb-3 rounded-pill" type="file" id="imageUrl" name="imageUrl" accept="image/*" required />

                                                <button className="btn btn-success rounded-pill float-end ms-3" type='submit'>Save</button>
                                                <button type="button" className="btn btn-secondary float-end rounded-pill" data-bs-dismiss="modal">Cancel</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>))}
                </div>
            </div>




            <div className="modal fade" id="editProdModal" tabIndex="-1" aria-labelledby="editProdModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add a Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control rounded-pill" placeholder="Name" id='prodName' name="name" required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control rounded-pill" placeholder="Price" id='prodPrice' name="price" required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control rounded-pill" placeholder="sizes" id='Prodsizes' name="sizes" required />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-success rounded-pill" onClick={addProduct}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products;
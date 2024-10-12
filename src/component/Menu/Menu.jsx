import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Menu = () => {
    const { id } = useParams();
    const [menuItem, setMenuItem] = useState([]);
    const [shopdtl, seTshopdtl] = useState({})

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await fetch(`http://localhost:3200/api/menu/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch menu item');
                }
                const result = await response.json();
                setMenuItem(result.products);
                seTshopdtl(result.shopDtl);
            } catch (error) {
                console.error('Error fetching menu item:', error);
            }
        };
        fetchMenuItem();
    }, [id]);

    return (
        <>
            <div style={{
                backgroundImage: `url('http://localhost:3200/uploads/${shopdtl.imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px',
                color: '#fff',
            }}>
                <section className="innerpages-banner text-center innerpages-banner-hair">
                    <div className="container">
                        <div className="inner-banner-text text-center">
                            <h1>{shopdtl.shopname}</h1>
                            <p>{shopdtl.address}</p>
                        </div>
                    </div>
                </section>
            </div>


            <section className="dishes-menu">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 text-center mx-auto">
                            <div className="menu-section-title text-center">
                                <h2>Our Menu</h2>
                                <div className="m-icon">
                                    <i className="fa-solid fa-utensils"></i>
                                </div>
                                <p className="">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            </div>
                        </div>

                    </div>
                    <hr />
                    <div className="container">
                        <div className="tab-pane fade show active" id="tabmenu-one" role="tabpanel" aria-labelledby="tabmenu-one-tab">
                            <div className="row row-cols-1  row-cols-md-2 row-cols-lg-4 g-4">
                                {menuItem.map((product, index) => (
                                    <div className="col">
                                        <div className="card">
                                            <img src={'http://localhost:3200/uploads/' + product.imageUrl} className="card-img-top" style={{ maxHeight: '250px', objectFit: 'cover' }} alt="Product" />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <h6>Rs.{product.price}/-</h6>
                                                <p className="card-text">Size: {product.sizes.map((size, idx) => <span key={idx}>{size}</span>)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Menu
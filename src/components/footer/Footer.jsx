import React from 'react'

const Footer = () => {
    return (
        <footer className="footer py-5 text-white " style={{ 'backgroundColor': '#2d3748' }}>
            <div className="container">
                <div className="row">

                    <div className="col-md-4">
                        <img className="navbar-brand-dark mb-4" height="35" src="./assets/img/brand/light.svg" alt="Logo light" />
                        <p>Volt is a Premium Bootstrap 5 Admin Dashboard bringing together beautiful UI/UX design and functional elements.</p>
                        <ul className="social-buttons mb-5 mb-lg-0 list-unstyled">
                            <li>
                                <a className="text-decoration-none text-white" href="https://twitter.com/themesberg" aria-label="twitter social link" className="icon-white me-2">
                                    <span className="fab fa-twitter"></span>
                                </a>
                            </li>
                            <li>
                                <a className="text-decoration-none text-white" href="https://www.facebook.com/themesberg/" className="icon-white me-2" aria-label="facebook social link">
                                    <span className="fab fa-facebook"></span>
                                </a>
                            </li>
                            <li>
                                <a className="text-decoration-none text-white" href="https://github.com/themesberg" aria-label="github social link" className="icon-white me-2">
                                    <span className="fab fa-github"></span>
                                </a>
                            </li>
                            <li>
                                <a className="text-decoration-none text-white" href="https://dribbble.com/themesberg" className="icon-white" aria-label="dribbble social link" >
                                    <span className="fab fa-dribbble"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-2 mb-5 mb-lg-0">
                        <span className="h5">Themesberg</span>
                        <ul className="links-vertical mt-2  list-unstyled">
                            <li><a className="text-decoration-none text-white" target="_blank" href="https://themesberg.com/blog">Blog</a></li>
                            <li><a className="text-decoration-none text-white" target="_blank" href="https://themesberg.com/products">Products</a></li>
                            <li><a className="text-decoration-none text-white" target="_blank" href="https://themesberg.com/about">About Us</a></li>
                            <li><a className="text-decoration-none text-white" target="_blank" href="https://themesberg.com/contact">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-2 mb-5 mb-lg-0">
                        <span className="h5">Other</span>
                        <ul className="links-vertical mt-2 list-unstyled">
                            <li><a className="text-decoration-none text-white" href="https://themesberg.com/docs/volt-bootstrap-5-dashboard/getting-started/quick-start/" target="_blank">Docs
                                <span className="badge badge-sm bg-secondary text-dark ms-2">v1.4</span></a></li>
                            <li><a className="text-decoration-none text-white" href="https://themesberg.com/docs/volt-bootstrap-5-dashboard/getting-started/changelog/" target="_blank">Changelog</a></li>
                            <li><a className="text-decoration-none text-white" target="_blank" href="https://themesberg.com/licensing">License</a>
                            </li>
                            <li><a className="text-decoration-none text-white" target="_blank" href="https://themesberg.com/contact">Support</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4 mb-5 mb-lg-0">
                        <span className="h5 mb-3 d-block">Subscribe</span>
                        <form action="#">
                            <div className="form-row mb-2">
                                <div className="col-12">
                                    <input type="email" className="form-control mb-2" placeholder="example@company.com" name="email" aria-label="Subscribe form" required />
                                </div>
                                <div className="col-12 d-grid">
                                    <button type="submit" className="btn btn-secondary" data-loading-text="Sending">
                                        <span>Subscribe</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <p className="text-muted font-small m-0">We’ll never share your details. See our <a className="text-decoration-none text-white" className="text-white" href="#">Privacy Policy</a></p>
                    </div>
                </div>
                <hr className="bg-gray-700 my-5" />
                <div className="row">
                    <div className="col mb-md-0">
                        <a className="text-decoration-none text-white" href="https://themesberg.com" target="_blank" className="d-flex justify-content-center">
                            <img src="@@path/assets/img/themesberg-logo-alt.svg" height="35" className="mb-4" alt="Themesberg Logo" />
                        </a>
                        <div className="d-flex text-center justify-content-center align-items-center" role="contentinfo">
                            <p className="fw-normal font-small mb-0">Copyright © Themesberg 2019-<span className="current-year">2021</span>. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
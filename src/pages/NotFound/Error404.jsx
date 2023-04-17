import React from 'react'
import { Button } from 'react-bootstrap'

const Error404 = () => {
    return (
        <>
            <main>
                <section className="vh-100 d-flex align-items-center justify-content-center">
                    <div className="container">
                        <div className="row">
                            <div class="col-12 text-center d-flex align-items-center justify-content-center">
                                <div>
                                    <img class="img-fluid w-75" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS5iQ4WdKRHcjNfeDOvrBE43PvtuxnK2jKArBGyadbMWu1GJ1Wg" alt="404 not found" />
                                    <h1 class="mt-5">Page not <span class="fw-bolder text-dark">found</span></h1>
                                    <p class="lead my-4">Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p>
                                    <Button variant='dark'>Back to homepage</Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}

export default Error404
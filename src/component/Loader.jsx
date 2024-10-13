import React from 'react'

function Loader() {
    return (
        <div class="position-fixed top-0 start-0 d-flex vh-100 vw-100 z-1 bg-dark bg-opacity-50">
            <div class="d-flex w-25 p-5 m-auto">
                <div class="spinner-grow text-primary m-auto" style={{ width: '10rem', height: '10rem' }} role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loader

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
            Swal.fire({
                icon: 'success',
                text: `${productName} has been deleted successfully.`,
                showConfirmButton: false,
                timer: 1000,
            });
        }
    });
};
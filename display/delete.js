document.addEventListener('DOMContentLoaded', function() {
    const itemsContainer = document.getElementById('items');
    let deleteItemId = document.getElementById(deleteItemId);

    itemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            deleteItemId = e.target.getAttribute('data-id');
            $('#deleteItemModal').modal('show');
        }
    });

    document.getElementById('deleteItem').addEventListener('click', function() {
        if (deleteItemId) {
            fetch(`http://127.0.0.1:8000/apia/item/${deleteItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Gagal menghapus item');
                }
				if (response.status !== 204) {
					return response.json();
				}
            })
            .then(() => {
                console.log('Item dihapus');
                $('#deleteItemModal').modal('hide');
				window.location.reload();
            })
            .catch(error => console.error('Error:', error));
        }
    });
});
document.getElementById('updateItemForm').addEventListener('submit', function(event){
    event.preventDefault();

    const idItem = document.getElementById('upItemID').value;
    const nameItem = document.getElementById('upItemName').value;
    const descriptionItem = document.getElementById('upItemDescription').value;
    
    if(!nameItem || !descriptionItem){
        alert('Field cannot be empty!');
        return;
    }

    const data = {
        name: nameItem,
        description: descriptionItem
    };

    const token = localStorage.getItem('accessToken');

    fetch(`http://127.0.0.1:8000/apia/item/${idItem}/`, {
        method: 'PUT', // dapat 'POST' tergantung API
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Network response error');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success: ', data);
        $('#myModal').modal('hide');
        // fetchItems();
        window.location.reload();
    })
    .then(updateditem => {
        console.log('Item updated: ', updateditem);
        $('#updateItemModal').modal('hide');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan sistem');
    });
});
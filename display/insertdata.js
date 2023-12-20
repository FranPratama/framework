document.getElementById('addItemForm').addEventListener('submit', function(event){
    event.preventDefault();

    const name = document.getElementById('nameItem').value;
    const description = document.getElementById('descriptionItem').value;
    const token = localStorage.getItem('accessToken');
    
    fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name : nameItem,
            description  : descriptionItem,
        })
    })
    .then(response => {
        if(!response.ok){
            return response.json();
        }else{
            throw new Error('Something went wrong');
        }
    })
    .then(data => {
        console.log('Success: ', data);
        $('#addItemModal').modal('hide');
        fetchItems();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
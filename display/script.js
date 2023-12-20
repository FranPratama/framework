document.addEventListener("DOMContentLoaded", function() {
    fetchItems();
});

function fetchItems(){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzMDM1MTg4LCJpYXQiOjE3MDMwMzQ4ODgsImp0aSI6IjcxYzEzZDg4YTllMzQxM2ViNjc2YmJkNDYzZmJjODg0IiwidXNlcl9pZCI6Mn0.XUHkATH4QA05GrpCIot55b6NZyDFlbooZK5DFtYA2mU'
    // const token = localStorage.getItem('accessToken');
    // fetch('http://127.0.0.1:8000/apia/item/')    
    fetch('http://127.0.0.1:8000/apia/item/',{
        Headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data=> displayitems(data))
    .catch(error => console.error('Error', error));
}

function displayitems(items){
    const itemsContainer = document.getElementById('items');
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('col-md-6');
        itemElement.innerHTML = `
        <div class="card mb-4">
        <div class="card-body">
        <h5 class="card-title"> ${item.name} </h5>
        <p class="card-text"> ${item.description} </p>
        </div>
        <div>
        `;
        itemsContainer.appendChild(itemElement);
    })
}
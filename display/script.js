document.addEventListener("DOMContentLoaded", function() {
    fetchItems();
});

function fetchItems(){
    // const token = ''
    const token = localStorage.getItem('accessToken');
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
        </div>
        `;
        itemsContainer.appendChild(itemElement);
    })
}
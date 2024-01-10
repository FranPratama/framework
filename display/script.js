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
    .then(data=> displayitem(data))
    .catch(error => console.error('Error', error));
}

function displayitem(items){
    const itemsContainer = document.getElementById('items');
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('col-md-6');
        itemElement.innerHTML = `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title"> ${item.name} </h5>
                <p class="card-text"> ${item.description} </p>
                <button type="button" class="btn btn-warning btn-sm update-btn" data-toggle="modal" data-target="#updateItemModal" data-id="${item.id}"><span class="fas fa-edit"></span> Update</button>
                <button type="button" class="btn btn-danger btn-sm delete-btn" data-toggle="modal" data-target="#deleteItemModal" data-id="${item.id}"><span class="fas fa-trash"></span> Delete</button>
            </div>
        </div>
        `;
        itemsContainer.appendChild(itemElement);
    });

    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', function(){
            updateitem(this.getAttribute('data-id'));
        });
    });
}

function updateitem(id){
    // console.log("ID received at ", id);
    const token = localStorage.getItem('accessToken');
    fetch('http://127.0.0.1:8000/apia/item/'+id,{
        Headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('upItemName').value = data.name;
        document.getElementById('upItemDescription').value = data.description;
        document.getElementById('upItemID').value = data.id;

        $('#updateItemModal').modal('show')
    })
    .catch(error => console.error('Error: ', error));
}
const alert = document.querySelector('.alert');
const inputs = document.querySelector('.inputs');
const btn = document.querySelector('.btn');
let items = document.querySelector('.items');
const clearItems = document.querySelector('.clear-items');
const edit = document.querySelector('.edit');


btn.addEventListener("click", addItem);
inputs.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addItem();
    }
});

function addItem() {
    let val = inputs.value.trim();

    if (val === "") {
        displayAlert("Please enter a value", "danger");
        return;
    }

    let paragraph = `<div class="flex justify-between pt-5 text-gray-700 font-semibold px-5 list">
                        <h3 class="tracking-widest capitalize">${val}</h3>
                        <div class="flex gap-4">
                            <i class="fa-solid fa-pen-to-square text-green-600 cursor-pointer edit"></i>
                            <i class="fa-solid fa-trash text-red-500 cursor-pointer delete"></i>
                        </div>
                    </div>`;
                    // <button class="text-green-600 cursor-pointer edit">Edit</button>
                    // <button class="text-red-600 cursor-pointer delete">Delete</button>
                    
    items.insertAdjacentHTML('beforeend', paragraph);
    inputs.value = "";
    alert.style.display = "block";
    displayAlert("Item added successfully", "success");
    clearItems.style.display = "block";

    // Add event listener for the new delete button
    const deleteButton = items.lastElementChild.querySelector('.delete');
    deleteButton.addEventListener('click', deleteItem);

    // Add event listener for the new edit button
    const editButton = items.lastElementChild.querySelector('.edit');
    editButton.addEventListener('click', editItem);

    addToLocalStorage(id, values);
    setBackToDefault();
}


clearItems.addEventListener("click", () => {
    items.innerHTML = "";
    clearItems.style.display = "none";
    alert.innerText = "";
    alert.className = 'alert';
    displayAlert("Items Cleared", "danger");

    setBackToDefault();
    //localStorage.removeItem('list')
});

function setBackToDefault(){
    inputs.value = "";
    btn.innerHTML = "Submit"
}

function displayAlert(text, action) {
    alert.innerText = text;
    alert.className = `alert alert-${action}`;
    alert.style.textAlign = "center";
    alert.style.fontWeight = "bold";
    alert.style.padding = "5px";

    setTimeout(function () {
        alert.innerText = "";
        alert.className = 'alert';
    }, 2000);
}

// Add event listeners for edit buttons (separate from the addItem function)
items.addEventListener("click", function(event) {
    if (event.target.classList.contains('edit')) {
        editItem(event);
    } else if (event.target.classList.contains('delete')) {
        deleteItem(event);
    }
});

function editItem(event) {
    const editButton = event.target; // The edit button itself
    const listItem = editButton.closest('.list');
    const editElement = listItem.querySelector('h3');

    // Store the original text content before editing
    const originalContent = editElement.textContent;

    // Temporarily disable the edit button during editing to prevent conflicts
    editButton.disabled = true;

    // Update the input field with the original text content
    inputs.value = originalContent;

    // Change button text to "Save"
    btn.textContent = "Update";

    // Change event listener for the button to handle the save operation
    btn.removeEventListener("click", addItem);
    btn.addEventListener("click", function saveItem() {
            // Update the text content of the item with the new value from the input
            editElement.textContent = inputs.value;
            
            // Enable the edit button again
            editButton.disabled = false;

            // Reset button text to "Submit"
            btn.textContent = "Submit";

            // Remove the saveItem event listener and add back the addItem listener
            btn.removeEventListener("click", saveItem);
            btn.addEventListener("click", addItem);
            
            // Display success message
            displayAlert("Item edited successfully", "success");
    });
}




// Function to delete the clicked item
function deleteItem(event) {
    const listItem = event.target.closest('.list');
    if (listItem) {
        listItem.remove();
    }

    // Check if there are any remaining list items
    const remainingItems = document.querySelectorAll('.list');
    if (remainingItems.length === 0) {
        clearItems.style.display = "none";
    }
}


const tronElement = document.getElementById('tron');

// Add a click event listener
tronElement.addEventListener('click', function() {
  tronElement.textContent="Learn About Us";
  // Add any other actions you want to perform on click
});

const mtonElement = document.getElementById('mton');

// Add a click event listener
mtonElement.addEventListener('click', function() {
  mtonElement.textContent="Visit us Here";
  // Add any other actions you want to perform on click
});
const zonElement = document.getElementById('zon');

// Add a mouseover event listener
zonElement.addEventListener('mouseover', function() {
  zonElement.style.backgroundColor = '#f0f0f0'; // Change background color on mouseover
});

// Add a mouseout event listener (optional)
zonElement.addEventListener('mouseout', function() {
  zonElement.style.backgroundColor = 'hotpink'; // Restore original background color on mouseout
});






document.addEventListener('DOMContentLoaded', function() {
    // Global variables to track cart items and total price
    let cartItems = [];
    let cartTotal = 0;

    // Sample car data with images
    const cars = [
        {
            id: 1,
            name: "Car A",
            description: "Sedan, 4-door",
            price: 25000,
            image: "car-a.jpg"
        },
        {
            id: 2,
            name: "Car B",
            description: "SUV, 5-seater",
            price: 30000,
            image: "car-b.jpg"
        },
        {
            id: 3,
            name: "Car C",
            description: "Hatchback, 2-door",
            price: 20000,
            image: "car-c.jpg"
        },
        {
            id: 4,
            name: "Car D",
            description: "Electric, 4-door",
            price: 35000,
            image: "car-d.jpg"
        }
    ];

    // Function to render cars dynamically
    function renderCars() {
        const carContainer = document.getElementById('carContainer');
        carContainer.innerHTML = '';

        cars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.classList.add('bg-white', 'border', 'border-gray-300', 'rounded-lg', 'shadow-md', 'p-4', 'mx-2', 'relative');
            carCard.setAttribute('data-id', car.id);

            carCard.innerHTML = `
                <h2 class="text-xl font-semibold mb-2">${car.name}</h2>
                <img src="${car.image}" alt="${car.name}" class="mb-4 rounded-lg">
                <div class="car-info">
                    <p class="text-gray-700">${car.description}</p>
                    <p class="font-bold text-gray-900 mt-2">$${car.price.toFixed(2)}</p>
                    <button class="btn-add-to-cart bg-green-500 hover:bg-green-600 text-white py-2 px-4 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">Add to Cart</button>
                </div>
            `;

            // Add event listener to "Add to Cart" button
            const addToCartButton = carCard.querySelector('.btn-add-to-cart');
            addToCartButton.addEventListener('click', function() {
                addToCart(car);
            });

            carContainer.appendChild(carCard);
        });
    }

    // Function to add a car to the cart
    function addToCart(car) {
        // Check if the car is already in the cart
        const existingItem = cartItems.find(item => item.id === car.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ id: car.id, name: car.name, price: car.price, quantity: 1 });
        }

        // Update cart display
        renderCart();
    }

    // Function to render cart items dynamically
    function renderCart() {
        const cartList = document.getElementById('cartList');
        const cartTotalElement = document.getElementById('cartTotal');

        // Clear existing cart items
        cartList.innerHTML = '';

        // Update cart items and total price
        cartTotal = 0;
        cartItems.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('flex', 'justify-between', 'items-center', 'py-2', 'px-4');

            cartItem.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="btn-remove-from-cart ml-4 text-red-500 hover:text-red-700 focus:outline-none">Remove</button>
            `;

            // Add event listener to "Remove from Cart" button
            const removeFromCartButton = cartItem.querySelector('.btn-remove-from-cart');
            removeFromCartButton.addEventListener('click', function() {
                removeFromCart(item.id);
            });

            cartList.appendChild(cartItem);
            cartTotal += item.price * item.quantity;
        });

        // Update cart total
        cartTotalElement.textContent = cartTotal.toFixed(2); // Display total with 2 decimal places

        // Show cart container if there are items in the cart, hide otherwise
        const cartContainer = document.getElementById('cartContainer');
        if (cartItems.length > 0) {
            cartContainer.classList.remove('hidden');
        } else {
            cartContainer.classList.add('hidden');
        }
    }

    // Function to remove a car from the cart
    function removeFromCart(id) {
        // Find the index of the car in cartItems
        const index = cartItems.findIndex(item => item.id === id);

        if (index !== -1) {
            const itemToRemove = cartItems[index];
            if (itemToRemove.quantity > 1) {
                itemToRemove.quantity--;
            } else {
                cartItems.splice(index, 1);
            }

            // Update cart display
            renderCart();
        }
    }

    // Initial render of cars
    renderCars();
});



document.addEventListener("DOMContentLoaded", function () {
    const chocolates = [
        { id: 1, name: 'Dark Chocolate', price: 250, quantity: 0 },
        { id: 2, name: 'Milk Chocolate', price: 200, quantity: 0 },
        // Add more chocolates with their details
    ];

    const chocolateOptions = document.getElementById("chocolateOptions");
    const totalPriceLabel = document.getElementById("totalPrice");

    chocolates.forEach(chocolate => {
        const chocolateDiv = document.createElement("div");
        chocolateDiv.classList.add("chocolate-option");

        const label = document.createElement("label");
        label.htmlFor = `chocolate${chocolate.id}`;
        label.textContent = `${chocolate.name} - ${chocolate.price.toFixed(2)}`;

        const input = document.createElement("input");
        input.type = "number";
        input.id = `chocolate${chocolate.id}`;
        input.value = chocolate.quantity;
        input.addEventListener("input", (event) => updateQuantity(chocolate.id, event));

        chocolateDiv.appendChild(label);
        chocolateDiv.appendChild(input);
        chocolateOptions.appendChild(chocolateDiv);
    });

    function updateQuantity(chocolateId, event) {
        const value = parseInt(event.target.value, 10);
        const chocolate = chocolates.find(choco => choco.id === parseInt(chocolateId, 10));
    
        // Check if the quantity is not below zero
        if (!isNaN(value) && value >= 0) {
            chocolate.quantity = value;
        } else {
            // Reset to zero if trying to set a negative value or non-numeric value
            chocolate.quantity = 0;
            event.target.value = 0;
        }
    
        // Check if the sum of quantities does not exceed 8
        if (getTotalQuantity() > 8) {
            // If it exceeds, set the quantity to the maximum allowed (8 - sum of other quantities)
            chocolate.quantity = 8 - (getTotalQuantity() - chocolate.quantity);
            event.target.value = chocolate.quantity;
        }
    
        updateTotalPrice();
    }
    
    

    function getTotalQuantity() {
        return chocolates.reduce((total, chocolate) => total + chocolate.quantity, 0);
    }

    function calculateTotalPrice() {
        return chocolates.reduce((total, chocolate) => total + (chocolate.price * chocolate.quantity), 0);
    }

    function updateTotalPrice() {
        totalPriceLabel.textContent = calculateTotalPrice().toFixed(2);
    }

    function resetSelection() {
        chocolates.forEach(chocolate => {
            chocolate.quantity = 0;
        });

        updateTotalPrice();
        // Reset the input values
        const inputs = document.querySelectorAll("input[type=number]");
        inputs.forEach(input => {
            input.value = 0;
        });
    }

    document.getElementById("resetButton").addEventListener("click", resetSelection);
});

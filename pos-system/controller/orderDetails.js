import { orderDetails } from "../db/db.js";

// Function to load order IDs into the select dropdown
export function loadCombosOrderDetails(array, comboBoxId) {
    console.log("combo-box loaded", array, comboBoxId);
    const comboBox = $('#' + comboBoxId);
    comboBox.empty();
    comboBox.append($('<option>', { value: '', text: 'Search order...' }));
    array.forEach(function (order) {
        comboBox.append($('<option>', { value: order.orderId, text: order.orderId }));
    });
}

// Populate the dropdown on page load
$(document).ready(function() {
    loadCombosOrderDetails(orderDetails, 'inputGroupSelect-orderDetails');
});

$('#inputGroupSelect-orderDetails').on('change', () => {
    const selectedOrderId = $('#inputGroupSelect-orderDetails').val();

    if (selectedOrderId !== '') {
        const selectedOrderDetails = orderDetails.filter(od => od.orderId === selectedOrderId);
        if (selectedOrderDetails.length > 0) {
            console.log("Selected Order Details:", selectedOrderDetails);
            $('#orderDetails-table-body').empty();
            selectedOrderDetails.forEach(orderDetail => {
                $('#orderDetails-table-body').append(`
                    <tr>
                        <td>${orderDetail.orderId}</td>
                        <td>${orderDetail.itemId}</td>
                        <td>${orderDetail.unitPrice}</td>
                        <td>${orderDetail.qty}</td>
                        <td>${orderDetail.total}</td>
                    </tr>
                `);
            });
        } else {
            $('#orderDetails-table-body').empty();
        }
    } else {
        $('#orderDetails-table-body').empty();
    }
});

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display vendor data
    fetch('vendors_data.json')
        .then(response => response.json())
        .then(data => {
            const basicPackageVendors = document.getElementById('basic-package-vendors');
            const premiumPackageVendors = document.getElementById('premium-package-vendors');

            data.vendors.forEach(vendor => {
                const li = document.createElement('li');
                li.textContent = vendor.name;

                // Assuming some logic to categorize vendors into Basic and Premium packages
                if (vendor.category === 'Basic') {
                    basicPackageVendors.appendChild(li);
                } else if (vendor.category === 'Premium') {
                    premiumPackageVendors.appendChild(li);
                }
            });
        })
        .catch(error => console.error('Error fetching vendor data:', error));
});

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Get package containers
    const basicPackageVendors = document.getElementById('basic-package-vendors');
    const premiumPackageVendors = document.getElementById('premium-package-vendors');
    const customPackageVendors = document.getElementById('custom-package-vendors');

    // Get service checkboxes
    const realtorCheckbox = document.querySelector('input[type="checkbox"][value="realtor"]');
    const mortgageCheckbox = document.querySelector('input[type="checkbox"][value="mortgage"]');
    const insuranceCheckbox = document.querySelector('input[type="checkbox"][value="insurance"]');
    const photographerCheckbox = document.querySelector('input[type="checkbox"][value="photographer"]');
    const propertyManagerCheckbox = document.querySelector('input[type="checkbox"][value="property-manager"]');

    // Map checkbox values to vendor categories
    const categoryMap = {
        'realtor': 'Real Estate Agent',
        'mortgage': 'Mortgage Agent',
        'insurance': 'Insurance Agent',
        'photographer': 'Photographer',
        'property-manager': 'Property Manager'
    };

    // Function to clear all vendor lists
    function clearVendorLists() {
        basicPackageVendors.innerHTML = '';
        premiumPackageVendors.innerHTML = '';
        customPackageVendors.innerHTML = '';
    }

    // Function to display vendors for a specific category
    function displayVendors(category) {
        clearVendorLists();
        
        fetch('/api/vendors')
            .then(response => response.json())
            .then(data => {
                const categoryVendors = data.vendors[categoryMap[category]];
                
                if (categoryVendors) {
                    // Display recommended vendors in premium package
                    categoryVendors.recommended.forEach(vendor => {
                        const li = document.createElement('li');
                        li.className = 'mb-2';
                        li.innerHTML = `
                            <div class="flex items-center">
                                <i class="fas fa-star text-yellow-500 mr-2"></i>
                                <div>
                                    <div class="font-semibold">${vendor.name}</div>
                                    <div class="text-sm text-gray-600">${vendor.company}</div>
                                </div>
                            </div>
                        `;
                        premiumPackageVendors.appendChild(li);
                    });

                    // Display cheapest vendors in basic package
                    categoryVendors.cheapest.forEach(vendor => {
                        const li = document.createElement('li');
                        li.className = 'mb-2';
                        li.innerHTML = `
                            <div class="flex items-center">
                                <i class="fas fa-tag text-green-500 mr-2"></i>
                                <div>
                                    <div class="font-semibold">${vendor.name}</div>
                                    <div class="text-sm text-gray-600">${vendor.company}</div>
                                </div>
                            </div>
                        `;
                        basicPackageVendors.appendChild(li);
                    });

                    // Display general vendors in custom package
                    categoryVendors.general.forEach(vendor => {
                        const li = document.createElement('li');
                        li.className = 'mb-2';
                        li.innerHTML = `
                            <div class="flex items-center">
                                <i class="fas fa-check text-blue-500 mr-2"></i>
                                <div>
                                    <div class="font-semibold">${vendor.name}</div>
                                    <div class="text-sm text-gray-600">${vendor.company}</div>
                                </div>
                            </div>
                        `;
                        customPackageVendors.appendChild(li);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching vendor data:', error);
                // Display error message to user
                const errorMsg = document.createElement('div');
                errorMsg.className = 'text-red-500 text-center mt-4';
                errorMsg.textContent = 'Error loading vendor data. Please try again later.';
                basicPackageVendors.appendChild(errorMsg.cloneNode(true));
                premiumPackageVendors.appendChild(errorMsg.cloneNode(true));
                customPackageVendors.appendChild(errorMsg.cloneNode(true));
            });
    }

    // Add event listeners to checkboxes
    const checkboxes = [
        { el: realtorCheckbox, category: 'realtor' },
        { el: mortgageCheckbox, category: 'mortgage' },
        { el: insuranceCheckbox, category: 'insurance' },
        { el: photographerCheckbox, category: 'photographer' },
        { el: propertyManagerCheckbox, category: 'property-manager' }
    ];

    checkboxes.forEach(({ el, category }) => {
        if (el) {
            el.addEventListener('change', function() {
                // Uncheck other checkboxes
                checkboxes.forEach(cb => {
                    if (cb.el && cb.el !== el) {
                        cb.el.checked = false;
                    }
                });

                if (this.checked) {
                    displayVendors(category);
                } else {
                    clearVendorLists();
                }
            });
        }
    });
});

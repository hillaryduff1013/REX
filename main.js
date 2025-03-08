'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Add console log for debugging
    console.log('DOM Content Loaded');

    // Sign in dropdown functionality
    const signInButton = document.getElementById('sign-in-button');
    const signInDropdown = document.getElementById('signin-dropdown');
    
    if (signInButton && signInDropdown) {
        signInButton.addEventListener('click', function() {
            signInDropdown.classList.toggle('hidden');
        });
    }

    // Only add these event listeners if we're on the main page
    const buyHomeButton = document.getElementById('buy-home-button');
    const sellHouseButton = document.getElementById('sell-house-button');
    const findRentalButton = document.getElementById('find-rental-button');
    const rentHomeButton = document.getElementById('rent-home-button');
    const servicesSection = document.getElementById('services-section');
    const sellServicesSection = document.getElementById('sell-services-section');
    const rentalServicesSection = document.getElementById('rental-services-section');
    const rentHomeServicesSection = document.getElementById('rent-home-services-section');
    const rentingButton = document.getElementById('renting-button');
    const rentingDropdown = document.getElementById('renting-dropdown');

    // Add console log for debugging
    console.log('Buy Home Button:', buyHomeButton);
    console.log('Services Section:', servicesSection);

    if (buyHomeButton && servicesSection) {
        buyHomeButton.addEventListener('click', function() {
            console.log('Buy Home Button Clicked');
            hideAllSections();
            servicesSection.classList.remove('hidden');
        });
    }

    if (sellHouseButton && sellServicesSection) {
        sellHouseButton.addEventListener('click', function() {
            hideAllSections();
            sellServicesSection.classList.remove('hidden');
        });
    }

    if (findRentalButton && rentalServicesSection) {
        findRentalButton.addEventListener('click', function() {
            hideAllSections();
            rentalServicesSection.classList.remove('hidden');
        });
    }

    if (rentHomeButton && rentHomeServicesSection) {
        rentHomeButton.addEventListener('click', function() {
            hideAllSections();
            rentHomeServicesSection.classList.remove('hidden');
        });
    }

    if (rentingButton && rentingDropdown) {
        rentingButton.addEventListener('click', function() {
            rentingDropdown.classList.toggle('hidden');
        });
    }

    // Services submit buttons
    const buyServicesSubmit = document.getElementById('buy-services-submit');
    const sellServicesSubmit = document.getElementById('sell-services-submit');
    const rentalServicesSubmit = document.getElementById('rental-services-submit');
    const rentHomeServicesSubmit = document.getElementById('rent-home-services-submit');
    const buyPackages = document.getElementById('buy-packages');
    const sellPackages = document.getElementById('sell-packages');
    const rentalPackages = document.getElementById('rental-packages');
    const rentHomePackages = document.getElementById('rent-home-packages');

    // Add console log for debugging
    console.log('Buy Services Submit:', buyServicesSubmit);
    console.log('Buy Packages:', buyPackages);

    if (buyServicesSubmit && buyPackages) {
        buyServicesSubmit.addEventListener('click', function() {
            console.log('Buy Services Submit Clicked');
            buyPackages.classList.remove('hidden');
        });
    }

    if (sellServicesSubmit && sellPackages) {
        sellServicesSubmit.addEventListener('click', function() {
            sellPackages.classList.remove('hidden');
        });
    }

    if (rentalServicesSubmit && rentalPackages) {
        rentalServicesSubmit.addEventListener('click', function() {
            rentalPackages.classList.remove('hidden');
        });
    }

    if (rentHomeServicesSubmit && rentHomePackages) {
        rentHomeServicesSubmit.addEventListener('click', function() {
            rentHomePackages.classList.remove('hidden');
        });
    }

    function hideAllSections() {
        console.log('Hiding all sections');
        const sections = [servicesSection, sellServicesSection, rentalServicesSection, rentHomeServicesSection];
        sections.forEach(section => {
            if (section) {
                section.classList.add('hidden');
            }
        });
    }
});

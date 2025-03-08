async function handleVendorLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const category = document.getElementById('category').value;
    const errorDiv = document.getElementById('error-message');
    
    if (!category) {
        errorDiv.textContent = 'Please select a category';
        errorDiv.classList.remove('hidden');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5001/api/vendor/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, category })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store user info in localStorage
            localStorage.setItem('userType', 'vendor');
            localStorage.setItem('userName', data.name);
            localStorage.setItem('company', data.company);
            // Redirect to service info page
            window.location.href = 'service-info.html';
        } else {
            errorDiv.textContent = data.error;
            errorDiv.classList.remove('hidden');
        }
    } catch (error) {
        errorDiv.textContent = 'An error occurred. Please try again.';
        errorDiv.classList.remove('hidden');
    }
}

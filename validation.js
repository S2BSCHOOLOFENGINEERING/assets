function validateEnrollForm(event) {
    event.preventDefault();

    let isValid = true;

    const fullName = document.getElementById('full_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const department = document.getElementById('department').value.trim();
    const course = document.getElementById('courses').value.trim();

    if (!fullName) {
        showErrorMessage('full_name_error', 'Full Name is required.');
        isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
        showErrorMessage('email_error', 'Email is required.');
        isValid = false;
    } else if (!email.match(emailPattern)) {
        showErrorMessage('email_error', 'Please enter a valid email.');
        isValid = false;
    }

    if (!mobile) {
        showErrorMessage('mobile_error', 'Mobile Number is required.');
        isValid = false;
    } else if (mobile.length !== 10 || isNaN(mobile)) {
        showErrorMessage('mobile_error', 'Please enter a valid 10-digit mobile number.');
        isValid = false;
    }

    if (!department) {
        showErrorMessage('department_error', 'Please select a department.');
        isValid = false;
    }

    if (!course) {
        showErrorMessage('course_error', 'Please select a course.');
        isValid = false;
    }

    if (!isValid) {
        document.getElementById('generalErrorMessage').style.display = 'block';
        document.getElementById('generalErrorMessage').textContent = 'Please fill out all required fields correctly.';
        return false;
    }
    submitFormData({ fullName, email, mobile, department, course });
    return false;
}

function submitFormData(formData) {
    console.log('Form data being sent:', formData);

    fetch('/enrollSubmit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.text())
        .then(data => {
            window.location.href = '/success';
        })

        .catch(error => {
            console.error('Error:', error);
            document.getElementById('generalErrorMessage').style.display = 'block';
            document.getElementById('generalErrorMessage').textContent = 'There was an error while submitting the form.';
        });
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.style.color = 'green';
    successMessage.textContent = 'Enrollment submitted successfully! Redirecting...';

    successMessage.style.fontSize = '16px';
    successMessage.style.padding = '10px';
    successMessage.style.border = '1px solid #4CAF50';
    successMessage.style.backgroundColor = '#d4edda';
    successMessage.style.marginBottom = '20px';

    const formContainer = document.getElementById('enrollForm');
    formContainer.insertBefore(successMessage, formContainer.firstChild);
}




document.addEventListener('DOMContentLoaded', () => {
    let selectedService = null;
    let selectedDate = null;

    // Step 0 to Step 1 transition
    document.getElementById('next-button-1').addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (name.trim() === '' || email.trim() === '') {
            alert('Please enter your name and email.');
            return;
        }

        document.getElementById('step-0').style.display = 'none';
        document.getElementById('step-1').style.display = 'block';

        // Fetch services
        fetch('http://localhost:3000/form-data')
            .then(response => response.json())
            .then(data => {
                const serviceGrid = document.getElementById('service-grid');
                serviceGrid.innerHTML = '';  // Clear previous services

                data.services.forEach(service => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.classList.add('grid-item');
                    button.textContent = service.name;
                    button.addEventListener('click', () => {
                        document.querySelectorAll('#service-grid .grid-item').forEach(item => item.classList.remove('selected'));
                        button.classList.add('selected');
                        selectedService = service.name;
                        document.getElementById('selected-service').value = service.name;

                        // Enable Step 2 Next Button
                        document.getElementById('next-button-2').disabled = false;
                    });
                    serviceGrid.appendChild(button);
                });
            })
            .catch(error => {
                console.error('Error fetching services:', error);
                alert('An error occurred. Please try again later.');
            });
    });

    // Step 1 to Step 2 transition
    document.getElementById('next-button-2').addEventListener('click', () => {
        if (!selectedService) {
            alert('Please select a service.');
            return;
        }

        document.getElementById('step-1').style.display = 'none';
        document.getElementById('step-2').style.display = 'block';
    });

    // Step 2 to Step 3 transition
    document.getElementById('next-button-3').addEventListener('click', () => {
        selectedDate = document.getElementById('date').value;

        if (!selectedDate) {
            alert('Please select a date.');
            return;
        }

        document.getElementById('step-2').style.display = 'none';
        document.getElementById('step-3').style.display = 'block';

        // Fetch available times for the selected service and date
        fetch(`http://localhost:3000/available-times?service=${selectedService}&date=${selectedDate}`)
            .then(response => response.json())
            .then(data => {
                const timeGrid = document.getElementById('time-grid');
                timeGrid.innerHTML = '';  // Clear previous times

                data.forEach(time => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.classList.add('grid-item');
                    button.textContent = time;
                    button.addEventListener('click', () => {
                        document.querySelectorAll('#time-grid .grid-item').forEach(item => item.classList.remove('selected'));
                        button.classList.add('selected');
                        document.getElementById('selected-time').value = time;

                        // Show submit button
                        document.getElementById('submit-button').style.display = 'block';
                    });
                    timeGrid.appendChild(button);
                });
            })
            .catch(error => {
                console.error('Error fetching available times:', error);
                alert('An error occurred. Please try again later.');
            });
    });

    // Back button handlers
    document.getElementById('back-button-1').addEventListener('click', () => {
        document.getElementById('step-1').style.display = 'none';
        document.getElementById('step-0').style.display = 'block';
    });

    document.getElementById('back-button-2').addEventListener('click', () => {
        document.getElementById('step-2').style.display = 'none';
        document.getElementById('step-1').style.display = 'block';
    });

    document.getElementById('back-button-3').addEventListener('click', () => {
        document.getElementById('step-3').style.display = 'none';
        document.getElementById('step-2').style.display = 'block';
    });

    // Form submission handler
    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('selected-service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('selected-time').value
        };

        fetch('http://localhost:3000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.message);  // Display success message

            // Reset form and go back to Step 0
            document.getElementById('booking-form').reset();
            document.getElementById('step-3').style.display = 'none';
            document.getElementById('step-0').style.display = 'block';
            document.getElementById('submit-button').style.display = 'none'; // Hide submit button
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});

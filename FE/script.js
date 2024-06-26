document.addEventListener('DOMContentLoaded', () => {
    let selectedService = null;
    let selectedSubservice = null;
    let selectedDate = null;

    // Fetch services on page load
    fetch('http://localhost:3000/api/services')
        .then(response => response.json())
        .then(data => {
            const serviceGrid = document.getElementById('service-grid');
            serviceGrid.innerHTML = '';

            data.services.forEach(service => {
                const button = document.createElement('button');
                button.type = 'button';
                button.classList.add('grid-item');
                button.textContent = service.name;
                button.addEventListener('click', () => {
                    document.querySelectorAll('#service-grid .grid-item').forEach(item => item.classList.remove('selected'));
                    button.classList.add('selected');
                    selectedService = service._id;
                    document.getElementById('selected-service').value = selectedService;

                    // Fetch subservices for the selected service
                    fetch(`http://localhost:3000/api/services/${selectedService}/subservices`)
                        .then(response => response.json())
                        .then(subservices => {
                            const subserviceGrid = document.getElementById('subservice-grid');
                            subserviceGrid.innerHTML = '';

                            subservices.forEach(subservice => {
                                const subButton = document.createElement('button');
                                subButton.type = 'button';
                                subButton.classList.add('grid-item');
                                subButton.textContent = `${subservice.name}- ${subservice.description} - $${subservice.price}`;
                                subButton.addEventListener('click', () => {
                                    document.querySelectorAll('#subservice-grid .grid-item').forEach(item => item.classList.remove('selected'));
                                    subButton.classList.add('selected');
                                    selectedSubservice = subservice._id;
                                    document.getElementById('selected-subservice').value = selectedSubservice;

                                    // Fetch available times if both subservice and date are selected
                                    if (selectedDate) {
                                        fetchAvailableTimes(selectedService, selectedSubservice, selectedDate);
                                    }
                                });
                                subserviceGrid.appendChild(subButton);
                            });
                        })
                        .catch(error => {
                            console.error('Error fetching subservices:', error);
                            alert('An error occurred while fetching subservices. Please try again later.');
                        });
                });
                serviceGrid.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching services:', error);
            alert('An error occurred while fetching services. Please try again later.');
        });

    // Event listener for date change
    document.getElementById('date').addEventListener('change', () => {
        selectedDate = document.getElementById('date').value;
        console.log('Date selected:', selectedDate);  // Logging để kiểm tra giá trị của date
        if (selectedService && selectedSubservice) {
            fetchAvailableTimes(selectedService, selectedSubservice, selectedDate);
        }
    });

    // Function to fetch available times
    function fetchAvailableTimes(serviceId, subserviceId, date) {
        console.log('Fetching available times with:', { serviceId, subserviceId, date });  // Logging để kiểm tra tham số
        fetch(`http://localhost:3000/api/available-times?service=${serviceId}&subservice=${subserviceId}&date=${date}`)
            .then(response => response.json())
            .then(data => {
                console.log('Available times data:', data);  // Logging để kiểm tra dữ liệu trả về

                // Kiểm tra nếu response là một mảng
                if (!Array.isArray(data)) {
                    throw new Error('API response is not an array');
                }

                const timeGrid = document.getElementById('time-grid');
                timeGrid.innerHTML = '';
                data.forEach(time => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.classList.add('grid-item');
                    button.textContent = time;
                    button.addEventListener('click', () => {
                        document.querySelectorAll('#time-grid .grid-item').forEach(item => item.classList.remove('selected'));
                        button.classList.add('selected');
                        document.getElementById('selected-time').value = time;
                    });
                    timeGrid.appendChild(button);
                });
            })
            .catch(error => {
                console.error('Error fetching available times:', error);
                alert('An error occurred while fetching available times. Please try again later.');
            });
    };

    // Form submission handler
    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('selected-service').value,
            subservice: document.getElementById('selected-subservice').value,
            date: document.getElementById('date').value,
            time: document.getElementById('selected-time').value
        };

        fetch('http://localhost:3000/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // Display success message

            // Reset form and selections
            document.getElementById('booking-form').reset();
            document.querySelectorAll('.grid-item.selected').forEach(item => item.classList.remove('selected'));
            selectedService = null;
            selectedSubservice = null;
            selectedDate = null;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while booking the appointment. Please try again later.');
        });
    });
});

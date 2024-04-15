document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    var name = document.getElementById("name").value;
    var reg = document.getElementById("reg").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var consentCheckbox = document.getElementById("consentCheckbox").checked;

    console.log(name, reg, email, phone, consentCheckbox);

    // Clear the counter from localStorage
    localStorage.removeItem('counter');

    if (!consentCheckbox) {
        alert('Please agree to the consent form.');
        return;
    }

    var submitButton = document.getElementById("login");
    submitButton.disabled = true; // Disable the submit button

    // change the text of the submit button to "Loading..."
    submitButton.innerHTML = "Loading...";

    // date 
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // time
    var time = hours + ":" + minutes + ":" + seconds;

    // date
    var date_curr = day + "-" + month + "-" + year;

    console.log(date_curr, time);

    // random number between 0 to 15, exclusive
    var randomNumber = Math.floor(Math.random() * 15);

    const url = 'https://interview-hirevue-ae9c2f5fd450.herokuapp.com/database';

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ 'name': name, 'id': reg, 'email': email, 'phone': phone, 'date': date_curr, 'time': time, 'set': randomNumber }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message == "success") {
            // generated folder's id
            id = data.folder_id;
            window.location.href = `record.html?id=${id}&set_number=${randomNumber}`;
        } else {
            alert('Error: ' + data.message);
            submitButton.disabled = false; // Re-enable the submit button on error
            submitButton.innerHTML = "Submit";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
        submitButton.disabled = false; // Re-enable the submit button on error
        submitButton.innerHTML = "Submit";
    });
});

document.getElementById("consentHighlight").addEventListener("click", function() {
    document.getElementById("consentPopup").style.display = "block";
});

document.getElementById("closeConsent").addEventListener("click", function() {
    document.getElementById("consentPopup").style.display = "none";
});
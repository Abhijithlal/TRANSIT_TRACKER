document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("login_button");

    loginButton.addEventListener("click", function() {
        // Redirect to staff profile page
        window.location.href = "staff_profile.html";

        // Ask for location permission
      /*  if (navigator.permissions) {
            navigator.permissions.query({name:'geolocation'}).then(function(permissionStatus) {
                if (permissionStatus.state === 'prompt') {
                    alert("Please allow location access to enable location services.");
                }
            });
        } else {
            alert("Your browser does not support location permission requests.");
        }*/
    });
});

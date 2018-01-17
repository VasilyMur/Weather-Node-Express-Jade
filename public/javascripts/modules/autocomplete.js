const axios = require('axios');

const autocomplete = function(input) {
    if (!input) return;

    const dropdown = new google.maps.places.Autocomplete(input);
    const place = dropdown.getPlace();


    // const dropdown = new google.maps.places.SearchBox(input);
    // dropdown.addListener('places_changed', (e) => {

    //     const place = dropdown.getPlaces()[0];
    //     console.log(place)
    // })
  
 


    input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            return e.preventDefault();
        }
    });

    


}

export default autocomplete;
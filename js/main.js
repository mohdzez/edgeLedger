function initMap() {
    const myLatLng = { lat: 31.3544, lng: 74.2561 };
    const map = new google.maps.Map(document.querySelector(".map"), {
      zoom: 14,
      center: myLatLng,
    });
    new google.maps.Marker({
      position: myLatLng,
      map : map,
    });
  }

window.addEventListener('scroll', function(){
    if(scrollY > 150){
        document.getElementById('navbar').style.backgroundColor = 'rgba(51, 51, 51, 0.781)'
    } else{
        document.getElementById('navbar').style.backgroundColor = '#333'
    }
})


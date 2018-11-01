var sites, aSites=[], allSites=[], drawSites=[];
var places = [ 'bank', 'movie_theater', 'park', 'school', 'subway_station', 'supermarket', 'hospital', 'shopping_mall' ];
function showPlaces(){
  places.forEach((p)=>{
    sites='';
    var place = new google.maps.places.PlacesService(map);
    place.nearbySearch({
      location: {lat: 19.4129856, lng: -99.1646575},
      radius: 1000,
      type: [p]
    }, function(data){
      callback(data,p);
    });
  });
}
var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 19.4129856, lng: -99.1646575},
        zoom: 15
      });
      var marker = new google.maps.Marker({
        map:map,
        position: {lat: 19.4129856, lng: -99.1646575},
        icon: 'https://s3.amazonaws.com/bucket-storage-tucanton/assets/png/pin-mapa-naranja.png'
      })
      infowindow = new google.maps.InfoWindow();
  }
  function callback(results, place) {
        sites = results;
        for( let i = 0; i < sites.length; i++){

          var marker = new google.maps.Marker({
              map     : map,
              position: sites[i].geometry.location,
              title   : sites[i].name,
              icon    : `svg/${place}.svg`
          });
          aSites.push(marker);
          allSites.push(sites[i]);
        }
    }

function placeByType(x){
  for(i=0; i<aSites.length; i++){
    aSites[i].setMap(null);
  }
  for(i=0; i<drawSites.length; i++){
    drawSites[i].setMap(null);
  }
  allSites.forEach( site => {
    if(site.types.includes(x)){
      var marker = new google.maps.Marker({
          map     : map,
          position: site.geometry.location,
          title   : site.name,
          icon    : `svg/${x}.svg`
      });
      drawSites.push(marker);
    }
  })
}

setTimeout(()=>showPlaces(),1000);

// The infoWindow class, which extends google.maps.InfoWindow.
class infoWindow extends google.maps.InfoWindow{
    constructor(){
        super({
            content: "Content Placeholder"
        });
        this.Visible = false;
        this.params = new URLSearchParams(window.location.search);
        google.maps.event.addListener(this, 'closeclick', this.toggleInfoWindow.bind(this));
    }

    // Toggle the InfoWindow visibility
    toggleInfoWindow(data , marker){
        this.Visible = !this.Visible;
        if (this.Visible){
            super.setContent(this.refresh(data));
            this.open(map, marker);
        } else {
            this.close();
            filter();
        }
    }

    // Tell InheritingClass to refresh the InfoWindow
    refresh(data){
        return null
    }
}

// The markerClass class, which extends google.maps.Marker.
class markerClass extends google.maps.Marker{
    constructor(parent, lat, long, nfo){
        super({
            position: {lat: lat, lng: long},
            map: null,
            label : " " ,
            icon : {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#FFCC33' ,
                fillOpacity: 0.8,
                scale: 15,
                strokeColor: 'black',
                strokeWeight: 3
            }
        });
        this.icon = this.getIcon();
        this.data = parent ;
        this.infoWindow = nfo;
        this.params = new URLSearchParams(window.location.search);

        // Add a click event to the marker
        google.maps.event.addListener(this, "click", function(){
            // toggle the info window if it is not visible
            this.infoWindow.toggleInfoWindow(this.data , this);
            filter();
        });
    }

    // Get icon from the derived class
    getIcon(){
        return null
    }
}

// The oDataClass class, which retrieves data from a Priority OData service.
class oDataClass {
    constructor(Name, tabulaini){
        this.data = [];
        // Set the URL parameters
        this.params = new URLSearchParams(window.location.search);
        // Ensure the environment is set
        if (!this.params.has("env")){
            alert("Environment not specified in URL");
            this.baseURL = null;
        } else {
            // Set the base URL
            this.baseURL = window.location.protocol + "//" + window.location.host + "/odata/priority/"+ (tabulaini || "tabula.ini") +"/"+ this.params.get("env") +"/";
            if(Name){console.log('Loading ['+ Name +'] from '+ this.baseURL + this.URL())}

            // Get the data
            var xhttp = new XMLHttpRequest();
            xhttp.open('GET', this.baseURL + this.URL(), false);
            xhttp.send();
            if (xhttp.status === 200) {
                // Load the data
                this.onLoad(JSON.parse(xhttp.responseText));
                // iterate through the items
                for (let key in this.data) {
                    var item = this.data[key];
                    this.setMarkers(item);
                }
            } else {
                alert("Error: " + xhttp.status);
            }
        }
    };

    // #region Methods called by derived class
    filter(){
        // Some logic to filter/colour the markers (calls derived Visible method)
        for (let key in this.data) {
            // Get the current item
            var item = this.data[key];
            // Iterate item markers (defined by SetMarkers)
            for (const m in item.markers) {
                var marker = item.markers[m];
                // bugger: got to null to change colour
                marker.setMap(null);
                if (this.Visible(item , marker)) {
                    // Show Market
                    marker.setMap(map);
                } else {
                    // Hide info window if marker not visible
                    if (marker.infoWindow.Visible) {
                        marker.infoWindow.close();
                    }
                    marker.setMap(null);
                }
                // Refresh visible info Windows
                if (marker.infoWindow.Visible) {
                    marker.infoWindow.setContent(marker.infoWindow.refresh(item));
                }
            }
        }
    }
    Patch(key , json){
        // oData PATCH the item with key FORMNAME(key) with json data
        var xhr = new XMLHttpRequest();
        xhr.open('PATCH', this.baseURL + key, false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(json));

        if (xhr.status === 200) {
            return true;
        } else {
            alert("Error: " + xhr.status + ": " + xhr.statusText);
            return false;
        }
    }
    // #endregion

    // #region Methods to be implemented by derived class
    URL(){
        // Get the URL for the oData service
        return null;
    }
    onLoad(response){
        // Handle the response from the oData service in derived class
    }
    setMarkers(item){
        // Set the markers in item of derived class
    }
    Visible(item , marker){
        // Set the matker visibility (and other properties) in the derived class
        return false;
    }
    // #endregion

}
// oData ZCLA_CLUSTERS Marker Object. 

// The ZCLA_CLUSTERS info window class, which extends the infoWindow class.
class nfoZCLA_CLUSTERS extends infoWindow {
    constructor() {
        super();
    }
    refresh(data){
        // Refresh the contents of the window with (data)
        x = '<h1>Placeholder</h1>'
        infowindowContent.innerHTML = x;
        return infowindowContent;
    }
}

// The ZCLA_CLUSTERS marker class, which extends the markerClass.
class ZCLA_CLUSTERSMarker extends markerClass {
    constructor(parent, lat, long , nfo) {
        super(parent , lat, long, nfo);
        this.label = "Some Label"
        this.color = '#c0c0c0'
    }
    getIcon(){
        return {
            path: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
            fillColor: this.color,
            fillOpacity: 0.6,
            scale: 1,
            strokeColor: '#000000',
            strokeWeight: 2
        };
    }
}

// The ZCLA_CLUSTERS class, which extends the oDataClass class.
class ZCLA_CLUSTERS extends oDataClass {
    // The constructor
    constructor() {
        // Call the parent constructor
        super("ZCLA_CLUSTERS");
    }
    // #region Methods to be implemented by derived class
    URL(){
        // Get the URL for the oData service
        return "ZCLA_CLUSTERS?$expand=ZCLA_CLUSTERCUST_SUBFORM";
    }
    // Set the markers in item
    setMarkers(item){
        // Create marker named "DEFAULT"
        item.markers.push["DEFAULT"];
        // Create the nfoZCLA_CLUSTERS" info window
        var info = new nfoZCLA_CLUSTERS();
        // Set the "DEFAULT" markers data, location and window
        item.markers["DEFAULT"] =
            new ZCLA_CLUSTERSMarker(item, item.LAT, item.LONG , info);
    }
    Visible(item , marker){
        // Set the marker visibility (and other properties) 
        return false;
    }
    onLoad(response){
        // Handle the response from the oData service
        let oZCLA_CLUSTERS = {
            ID: index,
            LAT: i.LAT,
            LONG: i.LONG,
            YR: i.YR,
            WK: i.WK,
            CUSTNOTETYPEDES: i.CUSTNOTETYPEDES,
            ZCLA_CLUSTERCUST_SUBFORM : i.ZCLA_CLUSTERCUST_SUBFORM.map(function (i, index) {
            let oZCLA_CLUSTERCUST = {
                ID: index,
                CUSTDES: i.CUSTDES,
                PHASE: i.PHASE,
                PROJDES: i.PROJDES,
            }
            return oZCLA_CLUSTERCUST;
            }),
        }
        return oZCLA_CLUSTERS;
    }
    // #endregion
}

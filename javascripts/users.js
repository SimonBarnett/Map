// Coloy array for the user marker
const col = ['#00ff00', '#2bff00', '#55ff00', '#80ff00', '#aaff00', '#d5ff00', '#ffff00', '#ffd500', '#ffaa00', '#ff8000', '#ff5500', '#ff2b00', '#ff0000'];
// Array of days
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// The user info window class, which extends the infoWindow class.
class nfoUser extends infoWindow {
    constructor() {
        super();
    }
    custnote(userID , note ){
        var x= ''

        if (note["TRAVEL"] == 0) {
            x+= `<span class="form-control" style="min-width: 300px; background-color: #E9ECEF;" type="text">` +
            `   <a href="priority:priform#CUSTNOTESA:`+ note.CUSTNOTE +`:`+ this.params.get("env") +`:tabula.ini">`+note["SUBJECT"] +`</a>` +
            `</span>`;
        } else {
            x+= '<input class="form-control" style="min-width: 300px;" type="text" disabled value="' + note["SUBJECT"] + '"/>';
        }
        x+= '    <input class="form-control" style="max-width: 100px;" type="text" disabled value="' +
                    note["PLANNEDTIME"] + " hr" +
                '"/>'

        if (note["TRAVEL"] == 0) {
            x+= '    <div class="input-group-append">' +
                '       <button id="MoveUp" '
            if(note["FIRST"]) { x+= ' disabled ' }
            x+= 'class="btn btn-primary" data-toggle="tooltip" title="Move Up" onclick="users.data['+ userID +'].TODAY().MOVEUP('+ note["SORT"] +');users.data['+ userID +'].REFRESHWAYPOINTS()">' +
                '           <svg width="1.2em" height="1.2em" viewBox="-1 -1 1920 1920" scale="2" stroke="#000000" xmlns="http://www.w3.org/2000/svg">' +
                '               <path fill-rule="evenodd" d="M1920 1546.993v106.666H533.341v-106.666H1920ZM357.651 442.668l304.425 304.319-304.425 304.318-75.306-75.306 175.572-175.68h-351.25v853.33H0V693.653h457.917L282.345 518.08l75.306-75.413ZM1920 1120.222v106.773H533.341v-106.773H1920Zm-853.329-426.558V800.33H853.34V693.664h213.332Zm426.665 0V800.33h-213.332V693.664h213.332Zm426.664 0V800.33h-213.332V693.664H1920ZM1920 267v106.666H533.341V267H1920Z"/>' +
                '           </svg>  ' +
                '       </button>' +
                '   </div>' +
                '    <div class="input-group-append">' +
                '       <button id="MoveFirst"'
            if(note["FIRST"]) { x+= ' disabled ' }
            x +='class="btn btn-primary" data-toggle="tooltip" title="Move First" onclick="users.data['+ userID +'].TODAY().MOVEFIRST('+ note["SORT"] +');users.data['+ userID +'].REFRESHWAYPOINTS()">' +
                '           <svg width="1.2em" height="1.2em" viewBox="-1 -1 1920 1920" scale="2" stroke="#000000" xmlns="http://www.w3.org/2000/svg">' +
                '               <path fill-rule="evenodd" d="M1920 1672.031v106.67H533.303v-106.67H1920ZM357.661 141l304.434 304.327L357.66 749.76l-75.308-75.521L457.93 498.66H106.562v1280.03H0V392.099h457.93l-175.577-175.79L357.66 141ZM1920 1245.249v106.775H533.303V1245.25H1920Zm0-426.57v106.67H533.303v-106.67H1920Zm-853.352-426.676v106.669H853.31v-106.67h213.338Zm426.676 0v106.669h-213.338v-106.67h213.338Zm426.676 0v106.669h-213.338v-106.67H1920Z"/>' +
                '           </svg>  ' +
                '       </button>' +
                '   </div>'

            x+= '    <div class="input-group-append">' +
                '       <button id="MoveDown" '
                if(note["LAST"]) { x+= ' disabled ' }
            x+= 'class="btn btn-primary" data-toggle="tooltip" title="Move Down" onclick="users.data['+ userID +'].TODAY().MOVEDOWN('+ note["SORT"] +');users.data['+ userID +'].REFRESHWAYPOINTS()">' +
                '           <svg width="1.2em" height="1.2em" viewBox="-1 -1 1920 1920" scale="2" stroke="#000000" fill="#000000" xmlns="http://www.w3.org/2000/svg">' +
                '               <path fill-rule="evenodd" d="M1920 1547v106.667H533.333V1547H1920Zm0-426.773V1227H533.333v-106.773H1920ZM106.667 267.043v426.666H457.92L282.347 518.136l75.306-75.52L662.08 747.043l-304.427 304.32-75.306-75.414L457.92 800.27H0V267.043h106.667Zm960 426.624v106.666H853.333V693.667h213.334Zm426.666 0v106.666H1280V693.667h213.333Zm426.667 0v106.666h-213.333V693.667H1920ZM1920 267v106.667H533.333V267H1920Z"/>' +
                '           </svg>  ' +
                '       </button>' +
                '   </div>' +
                '    <div class="input-group-append">' +
                '       <button id="MoveLast"'
                if(note["LAST"]) { x+= ' disabled ' }
            x+= 'class="btn btn-primary" data-toggle="tooltip" title="Move Last" onclick="users.data['+ userID +'].TODAY().MOVELAST('+ note["SORT"] +');users.data['+ userID +'].REFRESHWAYPOINTS()">' +
                '           <svg width="1.2em" height="1.2em" viewBox="-1 -1 1920 1920" scale="2" stroke="#000000" fill="#000000" xmlns="http://www.w3.org/2000/svg">' +
                '               <path fill-rule="evenodd" d="M106.667 141v1280H457.92l-175.573-175.68 75.306-75.413 304.427 304.32-304.427 304.426-75.306-75.413 175.573-175.573H0V141h106.667Zm960 1279.904v106.667H853.333v-106.667h213.334Zm426.666 0v106.667H1280v-106.667h213.333Zm426.667 0v106.667h-213.333v-106.667H1920Zm0-426.667v106.774H533.333V994.237H1920Zm0-426.666v106.666H533.333V567.571H1920Zm0-426.56v106.666H533.333V141.011H1920Z"/>' +
                '           </svg>  ' +
                '       </button>' +
                '   </div>'
            x+= '    <div class="input-group-append">' +
                '       <button id="Delete"'
            x+= 'class="btn btn-primary" data-toggle="tooltip" title="Unschedule" onclick="users.data['+ userID +'].TODAY().UNSCHEDULE('+ note["SORT"] +');users.data['+ userID +'].REFRESHWAYPOINTS()">' +
                '           <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" scale="2" stroke="#000000" fill="#000000" xmlns="http://www.w3.org/2000/svg">' +
                '               <path fill-rule="evenodd" d="M2,21h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM23,16a1,1,0,0,1-1,1H15a1,1,0,0,1,0-2h7A1,1,0,0,1,23,16Z"/>' +
                '           </svg>  ' +
                '       </button>' +
                '   </div>'
            }
        return x
    }
    refresh(data){
        var day = document.getElementById("day").value;
        var today = data["ZCLA_WKCOM_SUBFORM"].find(item => item.DAYNAME=== day);

        let infowindowContent = document.createElement("div");

        var x = '<div class="input-group input-group-sm mb-1">' +
                '    <input class="form-control" type="text" disabled value="' + data["SNAME"] + '"/>'

        for (let key in col) {
            x +='    <div class="input-group-append">' +
                '       <button disabled id="locate-" style="background-color: ' + col[key] +';">' +
                '           <svg width="1em" height="1em" viewBox="-1 -1 24 24" scale="2" stroke="#000000" fill="#000000" xmlns="http://www.w3.org/2000/svg">'
                if (today.DAYCOLOUR() == col[key]) {
                    x+='               <path fill-rule="evenodd" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'
                }
            x +='           </svg>  ' +
                '       </button>' +
                '   </div>'
        }
        x+= '</div>'

        // Add the user planned hours
        x +='<div class="input-group input-group-sm mb-1">' +
            '    <input class="form-control" type="text" disabled value="'+ today["DAYNAME"] +' Planned Hours: ' + today.DAYPLANNEDTIME() + '"/>' +
            '    <div class="input-group-append">'

        x +=`       <button id="toggle-hotel" title="Overnight?" `;
        if (today.STOPS() == 0) { x+= ' disabled ' }
        x +=`class="btn btn-primary button ${today.OVERNIGHT ? 'active' : ''}" `;
        x +='onclick="users.data['+ data["ID"] +'].TOGGLEHOTEL()">' +
            '           <svg fill="currentColor" width="1.4em" height="1.2em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '               <path fill-rule="evenodd" d="M5,16c-1.1,0-2,0.9-2,2c0,1.7,1.3,3,3,3h12c1.7,0,3-1.3,3-3c0-1.1-0.9-2-2-2h-6v-1h7c0.6,0,1-0.4,1-1c0-4.6-3.5-8.4-8-8.9   V5h1c0.6,0,1-0.4,1-1s-0.4-1-1-1h-4C9.4,3,9,3.4,9,4s0.4,1,1,1h1v0.1C6.5,5.6,3,9.4,3,14c0,0.6,0.4,1,1,1h7v1H5z M5.1,13   C5.6,9.6,8.5,7,12,7s6.4,2.6,6.9,6H5.1z M19,18c0,0.6-0.4,1-1,1H6c-0.6,0-1-0.4-1-1H19z"/>' +
            '           </svg>  ' +
            '       </button>'

        x +=`       <button id="toggle-user" title="Show Route?" class="btn btn-primary button ${(data["USERLOGIN"] === document.getElementById("route").value) ? 'active' : ''}" `;
        x +='onclick="ToggleRoute(\'' + data["USERLOGIN"] + '\')">' +
            '           <svg fill="currentColor" width="1.4em" height="1.2em" viewBox="1 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '               <path fill-rule="evenodd" d="M13,24h-2v-7c0-2.8-2.1-5-4.8-5H3.7l3.2,3.3l-1.4,1.4L0,11l5.5-5.7l1.4,1.4L3.7,10h2.5c1.9,0,3.6,0.8,4.8,2.1V12 c0-3.9,3-7,6.8-7h2.5l-3.2-3.3l1.4-1.4L24,6l-5.5,5.7l-1.4-1.4L20.3,7h-2.5C15.1,7,13,9.2,13,12V24z"/>' +
            '           </svg>  ' +
            '       </button>'

        x +=`       <button id="toggle-user" title="Unselect ` + data["SNAME"] + `" class="btn btn-primary button ${data.SELECTED() ? 'active' : ''}" `;
        x +='onclick="users.data['+ data["ID"] +'].TOGGLESELECT()">' +
            '           <svg fill="currentColor" width="1.4em" height="1.2em" viewBox="7 3 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '               <path fill-rule="evenodd" d="M28.09,9.74a4,4,0,0,0-1.16.19c-.19-1.24-1.55-2.18-3.27-2.18A4,4,0,0,0,22.13,8,3.37,3.37,0,0,0,19,6.3a3.45,3.45,0,0,0-2.87,1.32,3.65,3.65,0,0,0-1.89-.51A3.05,3.05,0,0,0,11,9.89v.91c-1.06.4-4.11,1.8-4.91,4.84s.34,8,2.69,11.78a25.21,25.21,0,0,0,5.9,6.41.9.9,0,0,0,.53.17H25.55a.92.92,0,0,0,.55-.19,13.13,13.13,0,0,0,3.75-6.13A25.8,25.8,0,0,0,31.41,18v-5.5A3.08,3.08,0,0,0,28.09,9.74ZM29.61,18a24,24,0,0,1-1.47,9.15A12.46,12.46,0,0,1,25.2,32.2H15.47a23.75,23.75,0,0,1-5.2-5.72c-2.37-3.86-3-8.23-2.48-10.39A5.7,5.7,0,0,1,11,12.76v7.65a.9.9,0,0,0,1.8,0V9.89c0-.47.59-1,1.46-1s1.49.52,1.49,1v5.72h1.8V8.81c0-.28.58-.71,1.46-.71s1.53.48,1.53.75v6.89h1.8V10l.17-.12a2.1,2.1,0,0,1,1.18-.32c.93,0,1.5.44,1.5.68l0,6.5H27V11.87a1.91,1.91,0,0,1,1.12-.33c.86,0,1.52.51,1.52.94Z"/>' +
            '           </svg>  ' +
            '       </button>' +
            '   </div>' +
            '</div>'

        for(let t in today.ZCLA_WKTASKS_SUBFORM) {
            x +='<div class="input-group input-group-sm mb-1">';
            x+= this.custnote(data["ID"] , today.ZCLA_WKTASKS_SUBFORM[t] )
            x+= '</div>';
        }

        infowindowContent.innerHTML = x;
        return infowindowContent;
    }
}

// The user marker class, which extends the markerClass class.
class userMarker extends markerClass {
    constructor(parent, lat, long , nfo) {
        super(parent , lat, long, nfo);
        this.label = this.data["USERLOGIN"]
        this.color = '#c0c0c0'
    }
    getIcon(){
        return {
            path: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z', // SVG path for a user
            fillColor: this.color,
            fillOpacity: 0.6,
            scale: 1,
            strokeColor: '#000000',
            strokeWeight: 2
        };
    }
}

// The user class, which extends the oDataClass class.
class USERS extends oDataClass {
    // The constructor
    constructor() {
        // Call the parent constructor
        super("USERS");

        // An array of currently selected users
        this.SELECTED = function() {
            var ret = []
            var user = document.querySelector("#user");
            let userArray = JSON.parse(user.value);
            for (let u in userArray) {
                var usr = this.data.find(tuser => tuser.USERLOGIN === userArray[u]);
                ret.push( usr["ID"] );
            }
            return ret;
        }
    }

    // The oData query URL
    URL(){
        return "USERS?$select=BRANCHNAME,LAT,LONG,SNAME,USER,USERLOGIN&" +
        "$filter=(BRANCHNAME ne '') and (REST eq 'Y') and (ZGEM_ACTIVE eq 'Y')&" +
        "$expand=ZCLA_WKCOM_SUBFORM($select=DAYNAME,YR,WK; " +
        "$filter=(YR eq "+ this.params.get("yr") +") and (WK eq "+ this.params.get("wk") +"); "+
        "$expand=ZCLA_WKTASKS_SUBFORM)"
    }

    // Handle the oData response
    onLoad(response){
        this.data = response['value'].map(function (i, index) {
            let oUSERS = {
                ID: index,
                markers : [],
                LAT: i['LAT'],
                LONG: i['LONG'],
                SNAME: i['SNAME'],
                USERLOGIN: i['USERLOGIN'],
                USERNAME: i['USERNAME'],
                BRANCHNAME: i['BRANCHNAME'],
                HOME: function() {
                    return {lat: this.LAT, lng: this.LONG};
                },
                TOGGLEWINDOW: function() {
                    this.markers["USER"].infoWindow.toggleInfoWindow(this, this.markers["USER"]);
                    filter();
                },
                TODAY: function() {
                    var day = document.getElementById("day").value;
                    if (this.ZCLA_WKCOM_SUBFORM.find(item => item.DAYNAME === day)) {
                        return this.ZCLA_WKCOM_SUBFORM.find(item => item.DAYNAME === day);
                    } else {
                        return null;
                    }
                },
                YESTERDAY: function() {
                    var day = document.getElementById("day").value;
                    switch (day) {
                        case "Mon":
                            day = "Sun";
                            break;
                        case "Tue":
                            day = "Mon";
                            break;
                        case "Wed":
                            day = "Tue";
                            break;
                        case "Thu":
                            day = "Wed";
                            break;
                        case "Fri":
                            day = "Thu";
                            break;
                        case "Sat":
                            day = "Fri";
                            break;
                        case "Sun":
                            day = null;
                            break;
                    }
                    if (day && this.ZCLA_WKCOM_SUBFORM.find(item => item.DAYNAME === day)) {
                        return this.ZCLA_WKCOM_SUBFORM.find(item => item.DAYNAME === day);
                    } else {
                        return null;
                    }
                },
                TOMMOROW: function() {
                    var day = document.getElementById("day").value;
                    switch (day) {
                        case "Sun":
                            day = "Mon";
                            break;
                        case "Mon":
                            day = "Tue";
                            break;
                        case "Tue":
                            day = "Wed";
                            break;
                        case "Wed":
                            day = "Thu";
                            break;
                        case "Thu":
                            day = "Fri";
                            break;
                        case "Fri":
                            day = "Sat";
                            break;
                        case "Sat":
                            day = null;
                            break;
                    }
                    if (day && this.ZCLA_WKCOM_SUBFORM.find(item => item.DAYNAME === day)) {
                        return this.ZCLA_WKCOM_SUBFORM.find(item => item.DAYNAME === day);
                    } else {
                        return null;
                    }
                },
                DAY: function(dayname){
                    if (this.ZCLA_WKCOM_SUBFORM.find(item => item.DAYNAME === dayname)) {
                        return this.ZCLA_WKCOM_SUBFORM.find(item => item.DAYNAME === dayname);
                    } else {
                        return null;
                    }
                },
                SELECTED: function() {
                    var user = document.querySelector("#user");
                    let userArray = JSON.parse(user.value);
                    return userArray.includes( String(this.USERLOGIN) );
                },
                TOGGLESELECT: function() {
                    var user = document.querySelector("#user");
                    let userArray = JSON.parse(user.value);
                    // Check if the user is already in the array
                    if (!userArray.includes(this['USERLOGIN'])) {
                        userArray.push( this['USERLOGIN'] );
                        this.REFRESHWAYPOINTS()
                    } else {
                        userArray = userArray.filter(item => item !== this['USERLOGIN']);
                        if (this.USERLOGIN == document.getElementById("route").value){
                            document.getElementById("route").value = "";
                        }
                    }
                    user.value = JSON.stringify(userArray);
                    filter();
                },
                TOGGLEHOTEL: function() {
                    this.TODAY().OVERNIGHT = !this.TODAY().OVERNIGHT;
                    this.REFRESHWAYPOINTS();
                },
                REFRESHWAYPOINTS: function() {
                    // reset the origin and destination based on hotel stay
                    for (let i = 0; i < days.length; i++) {
                        var today = this.DAY(days[i])
                        var yesterday = this.DAY(days[i-1])

                        if (yesterday){
                            today.ORIGIN = yesterday.DESTINATION;
                            today.YESTERDAY = yesterday;
                        } else {
                            today.ORIGIN = this.HOME();
                            today.YESTERDAY = null;
                        }

                        if(!today.OVERNIGHT){
                            today.DESTINATION = this.HOME();
                        } else {
                            today.DESTINATION = today.LASTSTOP();
                        }

                        today.WAYPOINTS();
                    }
                },
                UNSCHEDULE: function(custnote) {
                    for (let key in this.ZCLA_WKCOM_SUBFORM) {
                        for (let key2 in this.ZCLA_WKCOM_SUBFORM[key].ZCLA_WKTASKS_SUBFORM) {
                            if (this.ZCLA_WKCOM_SUBFORM[key].ZCLA_WKTASKS_SUBFORM[key2].CUSTNOTE === custnote) {
                                this.ZCLA_WKCOM_SUBFORM[key].UNSCHEDULE(this.ZCLA_WKCOM_SUBFORM[key].ZCLA_WKTASKS_SUBFORM[key2].SORT);
                                break;
                            }
                        }
                    }
                },
                ZCLA_WKCOM_SUBFORM : i.ZCLA_WKCOM_SUBFORM.map(function (i, index) {
                    let oZCLA_WKCOM = {
                        ID: index,
                        DAYNAME: i['DAYNAME'],
                        ROUTE: null,
                        ORIGIN: null,
                        DESTINATION: null,
                        OVERNIGHT: false,
                        YESTERDAY: null,
                        DAYCOLOUR: function() {
                            let sum = 0;
                            for (let i in this.ZCLA_WKTASKS_SUBFORM) {
                                if (!this.ZCLA_WKTASKS_SUBFORM[i]) {
                                    alert("Error: " + i);
                                } else {
                                    sum += this.ZCLA_WKTASKS_SUBFORM[i].MINUTES();
                                }
                            }
                            var hours = Math.floor(sum / 60);
                            if (hours > col.length -1 ) {
                                return col[col.length-1];
                            } else {
                                return col[hours];
                            }
                        },
                        DAYPLANNEDTIME: function() {
                            let sum = 0;
                            for (let i = 0; i < this.ZCLA_WKTASKS_SUBFORM.length; i++) {
                                sum += this.ZCLA_WKTASKS_SUBFORM[i].MINUTES();
                            }
                            var hours = Math.floor(sum / 60);
                            var minutes = sum % 60;
                            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

                        },
                        CALCULATEDISTANCE: function (x, y, x1, y1) {
                            const R = 6371; // Radius of the earth in km
                            const lat1 = x * Math.PI / 180; // Convert x to radians
                            const lat2 = x1 * Math.PI / 180; // Convert x1 to radians
                            const lon1 = y * Math.PI / 180; // Convert y to radians
                            const lon2 = y1 * Math.PI / 180; // Convert y1 to radians

                            const dLat = lat2 - lat1; // Difference in latitudes
                            const dLon = lon2 - lon1; // Difference in longitudes

                            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos(lat1) * Math.cos(lat2) *
                                Math.sin(dLon / 2) * Math.sin(dLon / 2);

                            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                            const distance = R * c; // Distance in km
                            return distance;
                        },
                        WAYPOINTS: function() {
                            var persist = this
                            this.REMOVETRAVEL();
                            if (this.HASTRAVEL()) {
                                var tmp =[] ;
                                var x = 0;

                                var directionsService = new google.maps.DirectionsService();
                                directionsService.route(this.REQUEST(), function(result, status) {
                                    if (status == 'OK') {

                                        // Get the leg times
                                        var route = result.routes[0];
                                        for (var i = 0; i < route.legs.length; i++) {
                                            var leg = route.legs[i];

                                            // Tasks at leg start location if overnight yesterday
                                            if(i==0 && persist.YESTERDAY && persist.YESTERDAY.OVERNIGHT){
                                                for (var t in persist.ZCLA_WKTASKS_SUBFORM) {
                                                    var task = persist.ZCLA_WKTASKS_SUBFORM[t];
                                                    var distance = persist.CALCULATEDISTANCE(task.LAT, task.LONG, leg.start_location.lat(), leg.start_location.lng());
                                                        if (distance <= 0.5) {
                                                            // Task is within half a mile of the end location
                                                            task.ID = tmp.length;
                                                            task.TRAVEL = 0;
                                                            tmp.push(task);
                                                            x+=1;
                                                        }
                                                }
                                            }

                                            var minutes = leg.duration.value / 60;
                                            var hours = Math.floor(minutes / 60);
                                            var remainingMinutes = Math.floor(minutes % 60);
                                            var timeString = ("00" + hours).slice(-3) + ":" + ("00" + remainingMinutes).slice(-2);

                                            if (leg.duration.value > 0) {
                                                var t = {
                                                    ID: tmp.length,
                                                    SUBJECT: "Travel to " + leg['end_address'],
                                                    STATDES: "Travel",
                                                    DAY: document.getElementById("day").value,
                                                    PLANNEDTIME: timeString,
                                                    LAT: leg.start_address.lat,
                                                    LONG: leg.start_address.lng,
                                                    TRAVEL: 1,
                                                    MINUTES: function() {
                                                        var parts = this.PLANNEDTIME.split(':');
                                                        return +parts[0] * 60 + +parts[1] ;
                                                    },
                                                };
                                                tmp.push(t);
                                            }

                                            for (var t in persist.ZCLA_WKTASKS_SUBFORM) {
                                                var task = persist.ZCLA_WKTASKS_SUBFORM[t];
                                                var distance = persist.CALCULATEDISTANCE(task.LAT, task.LONG, leg.end_location.lat(), leg.end_location.lng());
                                                // Task is within half a mile of the end location
                                                if (distance <= 0.5) {
                                                    task.ID = tmp.length;
                                                    task.TRAVEL = 0;
                                                    if (!tmp.some(node => node.CUSTNOTE === task.CUSTNOTE)) {
                                                        tmp.push(task);
                                                        x+=1;
                                                    }
                                                }
                                            }
                                        };
                                        persist.ZCLA_WKTASKS_SUBFORM = tmp;
                                        persist.ROUTE = result ;
                                        filter();

                                    } else {
                                        persist.ROUTE = null;
                                        filter();
                                    }
                                });
                            } else {
                                persist.ROUTE = null;
                                filter();
                            }

                            var x = 0 ;
                            for (var t in persist.ZCLA_WKTASKS_SUBFORM) {
                                var task = persist.ZCLA_WKTASKS_SUBFORM[t];
                                if(!task){
                                    alert("Task is null")
                                };
                                if (task && task.TRAVEL === 0) {
                                    task.SORT = x ;
                                    task.FIRST = false;
                                    task.LAST = false;
                                    x+=1;
                                }
                            }
                            if(persist.ZCLA_WKTASKS_SUBFORM.find(task => task.SORT === 0)){
                                persist.ZCLA_WKTASKS_SUBFORM.find(task => task.SORT === 0).FIRST = true
                            }
                            if (persist.ZCLA_WKTASKS_SUBFORM.find(task => task.SORT === x-1)){
                                persist.ZCLA_WKTASKS_SUBFORM.find(task => task.SORT === x-1).LAST = true
                            }
                        },
                        HASTRAVEL: function() {
                            var o = this.ORIGIN
                            for(let i in this.ZCLA_WKTASKS_SUBFORM){
                                if(o.lat != this.ZCLA_WKTASKS_SUBFORM[i].LOCATION().lat && o.lng != this.ZCLA_WKTASKS_SUBFORM[i].LOCATION().lng){
                                    return true;
                                } else {
                                    o = this.ZCLA_WKTASKS_SUBFORM[i].LOCATION();
                                }
                            }
                            if(o.lat !==this.DESTINATION.lat && o.lng !== this.DESTINATION.lng){
                                return true;
                            }
                            this.ROUTE = null;
                            return false;
                        },
                        REQUEST: function() {
                            var ret = {} ;
                            ret.travelMode = 'DRIVING'
                            ret.origin = this.ORIGIN;
                            if (!this.OVERNIGHT){ret.destination = this.DESTINATION;}
                            ret.waypoints = [];
                            for (let i = 0; i < this.ZCLA_WKTASKS_SUBFORM.length; i++) {
                                if (i == this.ZCLA_WKTASKS_SUBFORM.length-1 && this.OVERNIGHT) {
                                    ret.destination = {lat: this.ZCLA_WKTASKS_SUBFORM[i].LAT, lng: this.ZCLA_WKTASKS_SUBFORM[i].LONG};
                                } else {
                                    if(this.NOTSAMEASLASTWAYPOINT(i) && this.NOTDESTNATION(i)){
                                        ret.waypoints.push({
                                            location: {lat: this.ZCLA_WKTASKS_SUBFORM[i].LAT, lng: this.ZCLA_WKTASKS_SUBFORM[i].LONG},
                                            stopover: true
                                        });
                                    }
                                }
                            }
                            return ret;
                        },
                        NOTDESTNATION: function(index) {
                            var currentWaypoint = this.ZCLA_WKTASKS_SUBFORM[index];
                            return currentWaypoint.LAT !== this.DESTINATION.lat || currentWaypoint.LONG !== this.DESTINATION.lng;
                        },
                        NOTSAMEASLASTWAYPOINT: function(index) {
                            var currentWaypoint = this.ZCLA_WKTASKS_SUBFORM[index];
                            if (index > 0) {
                                var lastWaypoint = this.ZCLA_WKTASKS_SUBFORM[index - 1];
                                return currentWaypoint.LAT !== lastWaypoint.LAT || currentWaypoint.LONG !== lastWaypoint.LONG;
                            } else {
                                return currentWaypoint.LAT !== this.ORIGIN.lat || currentWaypoint.LONG !== this.ORIGIN.lng;
                            }
                        },
                        // #region Move the task up or down
                        MOVEUP: function(index) {
                            this.REMOVETRAVEL();
                            var tmp = this.ZCLA_WKTASKS_SUBFORM[index];
                            this.ZCLA_WKTASKS_SUBFORM[index] = this.ZCLA_WKTASKS_SUBFORM[index-1];
                            this.ZCLA_WKTASKS_SUBFORM[index-1] = tmp;
                        },
                        MOVEDOWN: function(index) {
                            this.REMOVETRAVEL();
                            var tmp = this.ZCLA_WKTASKS_SUBFORM[index];
                            this.ZCLA_WKTASKS_SUBFORM[index] = this.ZCLA_WKTASKS_SUBFORM[index+1];
                            this.ZCLA_WKTASKS_SUBFORM[index+1] = tmp;
                        },
                        MOVEFIRST: function(index) {
                            this.REMOVETRAVEL();
                            var tmp = this.ZCLA_WKTASKS_SUBFORM.splice(index, 1)[0];
                            this.ZCLA_WKTASKS_SUBFORM.unshift(tmp);
                        },
                        MOVELAST: function(index) {
                            this.REMOVETRAVEL();
                            var tmp = this.ZCLA_WKTASKS_SUBFORM.splice(index, 1)[0];
                            this.ZCLA_WKTASKS_SUBFORM.push(tmp);
                        },
                        // #endregion
                        REMOVETRAVEL: function(){
                            this.ZCLA_WKTASKS_SUBFORM = this.ZCLA_WKTASKS_SUBFORM.filter(function(item) {
                                if(!item){
                                    alert("Task is null")
                                } else {
                                    return item.TRAVEL === 0;
                                };
                            });
                        },
                        STOPS: function() {
                            var ret = 0
                            for (let i = 0; i < this.ZCLA_WKTASKS_SUBFORM.length; i++) {
                                if (this.ZCLA_WKTASKS_SUBFORM[i].TRAVEL === 0) {
                                    ret += 1;
                                }
                            }
                            return ret;
                        },
                        LASTSTOP: function() {
                            var pos = null;
                            for (let i = 0; i < this.ZCLA_WKTASKS_SUBFORM.length; i++) {
                                if(!this.ZCLA_WKTASKS_SUBFORM[i])   {
                                    alert("Task is null")
                                } else {
                                    if (this.ZCLA_WKTASKS_SUBFORM[i].TRAVEL === 0) {
                                        pos = this.ZCLA_WKTASKS_SUBFORM[i].LOCATION();
                                    }
                                }
                            }
                            return pos;
                        },
                        UNSCHEDULE: function(index) {
                            this.REMOVETRAVEL();
                            var tmp = this.ZCLA_WKTASKS_SUBFORM.splice(index, 1);
                            tasks.CUSTNOTE(tmp[0].CUSTNOTE).USER = null;
                        },
                        ZCLA_WKTASKS_SUBFORM : i.ZCLA_WKTASKS_SUBFORM.map(function (i, index) {
                            let oZCLA_WKTASKS = {
                                ID: index,
                                SUBJECT: i['SUBJECT'],
                                USERLOGIN: i['USERLOGIN'],
                                ZGCW_PANELNUMBER: i['ZGCW_PANELNUMBER'],
                                STATDES: i['STATDES'],
                                CUSTNOTE: i['CUSTNOTE'],
                                DAY: i['DAY'],
                                PLANNEDTIME: i['PLANNEDTIME'],
                                LAT: i['LAT'],
                                LONG: i['LONG'],
                                TRAVEL: 0,
                                SORT: null,
                                MINUTES: function() {
                                    var parts = this.PLANNEDTIME.split(':');
                                    return +parts[0] * 60 + +parts[1] ;
                                },
                                LOCATION: function() {
                                    return {
                                        lat: this.LAT,
                                        lng: this.LONG
                                    }
                                }
                            }
                            return oZCLA_WKTASKS;
                        }),
                    }
                    return oZCLA_WKCOM;
                }),
            }
            return oUSERS;
        });
    }

    // Set the markers
    setMarkers(item){
        // Create marker named "USER"
        item.markers.push["USER"];
        // Create the "USER" info window
        var info = new nfoUser();
        // Create the "USER" marker
        item.markers["USER"] =
            new userMarker(item, item.LAT, item.LONG , info);

        // Set the origin for the directions
        var home = {lat: item.LAT, lng: item.LONG};
        item.ZCLA_WKCOM_SUBFORM.forEach(function(item) {
            item.ORIGIN = home ;
        });
        // Set the destination for the directions
        item.ZCLA_WKCOM_SUBFORM.forEach(function(item) {
            item.DESTINATION = home ;
        });
    }

    // Logic to determine if the user is visible
    Visible(user, marker){
        var ret = false;
        var branchArray = JSON.parse(document.querySelector("#branch").value);
        var userArray = JSON.parse(document.querySelector("#user").value);

        // if the user is in the branch or user array, display the marker
        if (branchArray.includes(user.BRANCHNAME) || userArray.includes(user.USERLOGIN )) {
            if (user.TODAY()) {
                // set the marker colour
                marker.color = user.TODAY().DAYCOLOUR();
                // set the marker position
                marker.position = user.TODAY().ORIGIN;
                // set the marker on the map
                ret = true;

                // render the directions for selected user
                if (user.USERLOGIN == document.getElementById("route").value){
                    if (user.TODAY().ROUTE != null) {
                        directionsRenderer.setDirections( user.TODAY().ROUTE );
                    }
                }

            }
        }
        return ret;
    }

}
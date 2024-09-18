// Show page of nfotask
function showPage(page, pages) {
    let element = event.target;
    while(element && element.id !== "container") {
        element = element.parentElement;
    }
    if (element) {
        for (let i = 1; i <= pages ; i++) {
            var childElement = element.querySelector("#page" + i);
            var btn = element.querySelector("#btnPage" + i);
            if (childElement) {
                if (i !== page) {
                    childElement.style.display = "none";
                } else {
                    childElement.style.display = "block";
                }
            }
            if (btn) {
                if (i === page) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            }
        }
    }
}

// The nfoTask class extends the infoWindow class and is used to display the task information in the info window.
class nfoTask extends infoWindow {
    constructor(){
        super();
    }
    custnote(note){
        var x= '    <input class="form-control" style="max-width: 60px;" type="text" disabled value="'
        if (note.DAY == document.getElementById("day").value ){
            x+= "Today"
            x +='"/>'
        } else {
            x+= note["DAY"]
            x +='"/>'
        }

    x+= `<span title="Open in Priority" class="form-control" style="min-width: 300px; background-color: #E9ECEF;" type="text">` +
        `   <a href="priority:priform#CUSTNOTESA:`+ note.CUSTNOTE +`:`+ this.params.get("env") +`:tabula.ini">`+note["SUBJECT"] +`</a>` +
        `</span>`;

        x+= '    <input class="form-control" style="width: 70px;" type="text" disabled value="' +
                    note["PLANNEDTIME"] + " hr" +
                '"/>'
        return x
    }
    refresh(data){
        let infowindowContent = document.createElement("div");
        var x  = '<div id="container" style="width: 600px;" class="container">\n';
        var itemCount = 0;
        var page = 1;

        x += '<div id="page' + page + '" style="' + (page > 1 ? ' display: none;' : ' display: block;') + '">';

        for (let key in data["ZCLA_CLUSTERCUST_SUBFORM"]) {
            var site = data["ZCLA_CLUSTERCUST_SUBFORM"][key];
            var hdr =''+
                '<div class="input-group input-group mb-1">' +
                '    <div class="input-group-append input-group-sm">' +
                '       <button disabled id="locate-" class="btn ">' +
                '           <svg width="1.5em" height="1.5em" viewBox="0 0 32 32" class="" stroke-width="3" stroke="black" fill="black" xmlns="http://www.w3.org/2000/svg">' +
                '               <path fill-rule="evenodd" d="M10 20V10h10v10h5v-6h3v6h5v-8.5l-11-6.5-11 6.5V20h5z"/>' +
                '           </svg>  ' +
                '       </button>' +
                '   </div>' +
                '   <input class="form-control" type="text" disabled value="' + site["CUSTDES"] + '"/>' +
                '   <input class="form-control" type="text" disabled value="' + site["PROJDES"] + (site["ZCLA_PHASE"] ? " " + site["ZCLA_PHASE"] : "") +'"/>' +
                '</div>';

            x+= hdr;

            // Today
            for (let key2 in site["ZCLA_CUSTNOTE_SUBFORM"]) {
                var custnote = site["ZCLA_CUSTNOTE_SUBFORM"][key2]
                if (custnote.DAY == document.getElementById("day").value ){
                    x +='<div class="input-group  input-group-sm mb-1">'
                    x += this.custnote(custnote);

                    var assignedto = custnote.USER;
                    if ( assignedto == null) {
                        var sel = users.SELECTED()
                        for (let u in sel) {
                            let user = users.data[sel[ u ]];
                            if (user.TODAY()) {
                            x+= '    <div class="input-group-append">' +
                                '       <button title="Schedule ' + user["SNAME"] + '" id="locate-" class="btn" style="background-color: ' + user.TODAY().DAYCOLOUR() + ';" ' +
                                ' onclick="tasks.data['+ data["ID"] +'][\'ZCLA_CLUSTERCUST_SUBFORM\'][\'' + key + '\'][\'ZCLA_CUSTNOTE_SUBFORM\'][\'' + key2 + '\'].SCHEDULE(\'' +  user["ID"] + '\')">' +
                                '           <svg width="1em" height="1em" viewBox="-1 -1 24 24" class="bi bi-geo-alt" stroke="#000000" fill="#000000" xmlns="http://www.w3.org/2000/svg">' +
                                '               <path fill-rule="evenodd" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>' +
                                '           </svg>  ' +
                                '       </button>' +
                                '   </div>';
                            }
                        }

                    } else {
                        x+= '    <div class="input-group-append">' +
                            '       <button id="Delete"'
                        x+= 'class="btn btn-primary" data-toggle="tooltip" title="Unschedule ' + assignedto.SNAME + '" onclick="users.data['+ assignedto.ID +'].UNSCHEDULE('+ custnote.CUSTNOTE +');users.data['+ assignedto.ID +'].REFRESHWAYPOINTS()">' +
                            '           <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" scale="2" stroke="#000000" fill="#000000" xmlns="http://www.w3.org/2000/svg">' +
                            '               <path fill-rule="evenodd" d="M2,21h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM23,16a1,1,0,0,1-1,1H15a1,1,0,0,1,0-2h7A1,1,0,0,1,23,16Z"/>' +
                            '           </svg>  ' +
                            '       </button>' +
                            '   </div>'
                    }
                    x+= '</div>';

                    itemCount += 1;
                    if (itemCount > 6 ){
                        itemCount = 0;
                        page += 1;
                        x += '</div><div id="page' + page + '" style="' + (page > 1 ? ' display: none;' : ' display: block;') + '">';
                        x += hdr;
                    }
                }
            }

            // Not Today
            for (let key2 in site["ZCLA_CUSTNOTE_SUBFORM"]) {
                custnote = site["ZCLA_CUSTNOTE_SUBFORM"][key2]
                var assignedto = custnote.USER;
                if (custnote.DAY != document.getElementById("day").value ){
                    if(assignedto == null) {
                        x +='<div class="input-group input-group-sm mb-1">'
                        x += this.custnote(custnote);
                        x += '    <div class="input-group-append">' +
                            '       <button id="locate-" class="btn btn-primary button" ' +
                            ' onclick="tasks.data['+ data["ID"] +'][\'ZCLA_CLUSTERCUST_SUBFORM\'][\'' + key + '\'][\'ZCLA_CUSTNOTE_SUBFORM\'][\'' + key2 + '\'].MOVETODAY()">' +
                                        ' Move to ' + document.getElementById("day").value +
                            '       </button>' +
                            '   </div>';
                        x += '</div>';

                        itemCount += 1;
                        if (itemCount > 6 ){
                            itemCount = 0;
                            page += 1;
                            x += '</div><div id="page' + page + '" style="' + (page > 1 ? ' display: none;' : 'display: block;') + '">';
                            x += hdr;
                        }
                    }
                }
            }
        }

        x += '</div>'

        // Page buttons
        if (page > 1)  {
            x+= '<div id="pages" style="padding-left: 5px;">' +
                '    <div class="input-group input-group-sm mb-1">'
            for (let i = 1; i <= (itemCount === 0 ? page - 1 : page); i++) {
            x +='   <div class="input-group-append">'
            x+= '       <button title="Show Page '+ i +' " id="btnPage' + i + '" class="btn btn-primary button' + (i == 1 ? ' active' : '') + '" ' +
                '       onclick="showPage('+ i +', '+ page +');">' + i + '</button>' +
                '   </div>';
            }
            x += '  </div>'
            x += '</div>'
        }

        x+= '</div>';
        infowindowContent.innerHTML = x;
        return infowindowContent;
    }
}

// The task marker class which extends markerClass
class taskMarker extends markerClass {
    constructor(parent, lat, long, nfo){
        super(parent , lat, long, nfo);
        this.color = '#FF0000'
        this.label = {
            text: "0",
            color: "white",
            fontSize: "9px",
            fontWeight: "normal",
            className: "circle-label"
        }
    }
    getIcon(){
        return {
            path: 'M10 20V10h10v10h5v-6h3v6h5v-8.5l-11-6.5-11 6.5V20h5z', // SVG path for a house
            fillColor: this.color,
            fillOpacity: 0.8,
            scale: 1,
            strokeColor: 'black',
            strokeWeight: 3
        };
    }
}

// The task cluster class which extends oDataClass
class ZCLA_CLUSTERS extends oDataClass {
    constructor() {
        super('TASKS');

        // Get the task by the custnote
        this.CUSTNOTE = function(custnote){
            for (let key in this.data) {
                for (let key2 in this.data[key].ZCLA_CLUSTERCUST_SUBFORM) {
                    for (let key3 in this.data[key].ZCLA_CLUSTERCUST_SUBFORM[key2].ZCLA_CUSTNOTE_SUBFORM) {
                        if (this.data[key].ZCLA_CLUSTERCUST_SUBFORM[key2].ZCLA_CUSTNOTE_SUBFORM[key3].CUSTNOTE == custnote) {
                            return this.data[key].ZCLA_CLUSTERCUST_SUBFORM[key2].ZCLA_CUSTNOTE_SUBFORM[key3];
                        }
                    }
                }
            }
            return null;
        }
    }

    // Get the URL for the oData query
    URL(){
        return "ZCLA_CLUSTERS?$filter=(YR eq "+ this.params.get("yr") +") and (WK eq "+ this.params.get("wk") +") " +
        "and (CUSTNOTETYPEDES eq 'Solar Fix')&" +
        "$expand=ZCLA_CLUSTERCUST_SUBFORM($expand=ZCLA_CUSTNOTE_SUBFORM(" +
        "$select=DAY,SUBJECT,LAT,LONG,PLANNEDTIME,USERLOGIN,ZGCW_PANELNUMBER,STATDES,CUSTNOTE; "+
        "$filter=(STATDES eq 'P_Booked' OR STATDES eq 'P_Scheduled' OR STATDES eq 'Scheduled')))";
    }

    // Handle the response from the oData query
    onLoad(response){
        var persist = this
        this.data = response['value'].map(function (i, index) {
            let oZCLA_CLUSTERS = {
                ID: index,
                markers : [],
                LAT: i.LAT,
                LONG: i.LONG,
                YR: i.YR,
                WK: i.WK,
                CUSTNOTETYPEDES: i.CUSTNOTETYPEDES,
                ZCLA_CLUSTERCUST_SUBFORM : i.ZCLA_CLUSTERCUST_SUBFORM.map(function (i, index) {
                    let oZCLA_CLUSTERCUST = {
                        ID: index,
                        CUSTDES: i.CUSTDES,
                        DOCNO: i.DOCNO,
                        PROJDES: i.PROJDES,
                        ZCLA_PHASE: i.ZCLA_PHASE,
                        TASKCOUNT: function() {
                            var ret = 0;
                            for (let task in this.ZCLA_CUSTNOTE_SUBFORM) {
                                if (this.ZCLA_CUSTNOTE_SUBFORM[task].USER == null) {
                                    if (this.ZCLA_CUSTNOTE_SUBFORM[task].DAY == document.getElementById("day").value) {
                                        ret += 1;
                                    } else {
                                        if(document.getElementById("dayOnly").value !== "1") {
                                            ret += 1;
                                        }
                                    }
                                }
                            }
                            return ret;
                        },
                        ZCLA_CUSTNOTE_SUBFORM : i.ZCLA_CUSTNOTE_SUBFORM.map(function (i, index) {
                            let oZCLA_CUSTNOTES = {
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
                                USER: null,
                                MINUTES: function() {
                                    var parts = this.PLANNEDTIME.split(':');
                                    return +parts[0] * 60 + +parts[1] ;
                                },
                                SCHEDULE: function(item) {
                                    var user = users.data[parseInt(item)];
                                    this.USER = user;
                                    this.TRAVEL = 0;
                                    user.TODAY()["ZCLA_WKTASKS_SUBFORM"].push(this);
                                    user.TODAY().WAYPOINTS();
                                },
                                MOVETODAY: function () {
                                    if (persist.Patch(
                                        "CUSTNOTESA" + "(" + this.CUSTNOTE + ")"
                                        , {"CURDATE": document.querySelector("#dateoffset").value}
                                    )){
                                        this.DAY = document.getElementById("day").value
                                    };
                                    filter();
                                },
                                LOCATION: function() {
                                    return {
                                        lat: this.LAT,
                                        lng: this.LONG
                                    }
                                }
                            }
                            return oZCLA_CUSTNOTES;
                        }),
                    }
                    return oZCLA_CLUSTERCUST;
                }),
            }
            return oZCLA_CLUSTERS;
        });

        // #region Remove empty Clusters
        for (let key in this.data) {
            if (this.data[key].ZCLA_CLUSTERCUST_SUBFORM.length === 0 ) {
                delete this.data[key];
            } else {
                for (let key2 in this.data[key].ZCLA_CLUSTERCUST_SUBFORM) {
                    if (this.data[key].ZCLA_CLUSTERCUST_SUBFORM[key2].ZCLA_CUSTNOTE_SUBFORM.length === 0 ) {
                        delete this.data[key].ZCLA_CLUSTERCUST_SUBFORM[key2];
                    }
                }
                if (this.data[key].ZCLA_CLUSTERCUST_SUBFORM.length === 0 ) {
                    delete this.data[key];
                }
            }
        }
        // #endregion

    }

    // Set the markers for the task
    setMarkers(item){
        item.markers.push["TASK"];
        var info = new nfoTask();
        item.markers["TASK"] =
            new taskMarker(item, item.LAT, item.LONG , info);
    }

    // Filter the tasks
    Visible(task , marker){
        var today = false;
        for (let key2 in task["ZCLA_CLUSTERCUST_SUBFORM"]) {
            var count = task["ZCLA_CLUSTERCUST_SUBFORM"][key2].TASKCOUNT();
            marker.label.text = count.toString()

            for (let key3 in task["ZCLA_CLUSTERCUST_SUBFORM"][key2]["ZCLA_CUSTNOTE_SUBFORM"]) {
                var custnote = task["ZCLA_CLUSTERCUST_SUBFORM"][key2]["ZCLA_CUSTNOTE_SUBFORM"][key3]
                if (custnote.DAY == document.getElementById("day").value &&
                    custnote.USER == null) {
                    today = true
                    break
                }
            }
        }
        if (today) {
            marker.color = "#FF0000";
            return true;
        } else if (document.getElementById("dayOnly").value !== "1") {
            marker.color ="#c0c0c0";
            return true;
        } else {
            marker.color ="#c0c0c0";
            return false;
        }
    }

}

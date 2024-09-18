function ToggleRoute(Value) {
    var route = document.querySelector("#route");
    if (route.value == Value) {
        route.value = ""
    } else {
        route.value = Value;
    };
    filter();
}

function ToggleBranch(Value) {
    var branch = document.querySelector("#branch");
    let branchArray = JSON.parse(branch.value);
    if (branchArray.includes(Value)) {
        branchArray = branchArray.filter(function(item) {
            return item !== Value;
        })
    } else {
        branchArray.push(Value);
    };
    branch.value = JSON.stringify(branchArray);
    filter();
}

function ExpandBranch(Value) {
    var branches = document.getElementById("customerStatusButtonsContainer")
    for (let i = 0; i < branches.children.length; i++) {
        var btn = branches.querySelector("#expand-" + branches.children[i].id);
        var container = branches.querySelector("#" + branches.children[i].id + "_container");
        if (container && branches.children[i].id == "selected") {
            container.hidden = false;
        } else {
            if (container && container.id === Value + "_container") {
                container.hidden = !container.hidden;
                btn.classList.toggle("active", !container.hidden);
            } else if (container) {
                container.hidden = true;
                btn.classList.remove("active");
            }
        }
    }
    filter();
}

function RefreshEngMenu(customerMenu) {

    var branch = document.querySelector("#branch");
    let branchArray = JSON.parse(branch.value);

    var user = document.querySelector("#user");
    let userArray = JSON.parse(user.value);

    var day = document.getElementById("day").value;

    var replaceElement = document.createElement("div");

    for(const key in sh.data[0]["ZCLA_SCHEDBRANCH_SUBFORM"]) {
        branch = sh.data[0]["ZCLA_SCHEDBRANCH_SUBFORM"][key];

        var branchElement = document.createElement("div");
        branchElement.id = branch["BRANCHNAME"];
        branchElement.hidden = true;

        var divElement = document.createElement("div");
        divElement.classList.add("input-group", "input-group", "mb-1");

        var inputElement = document.createElement("input");
        inputElement.classList.add("form-control");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("disabled", "true");
        inputElement.setAttribute("value", branch["BRANCHDES"]);
        inputElement.setAttribute("title" , branch["BRANCHDES"]) + " Branch";
        divElement.appendChild(inputElement);

        // #region Expand Button
        var expandSvg = document.createElement("svg");
        expandSvg.setAttribute("width", "1em");
        expandSvg.setAttribute("height", "1em");
        expandSvg.setAttribute("viewBox", "4 5 16 16");
        expandSvg.classList.add("bi", "bi-geo-alt");
        expandSvg.setAttribute("fill", "currentColor");
        expandSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        var expandPath = document.createElement("path");
        expandPath.setAttribute("fill-rule", "evenodd");
        expandPath.setAttribute("d", "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4");
        expandSvg.appendChild(expandPath);

        var expandButton = document.createElement("button");
        expandButton.classList.add("btn", "btn-primary", "button");
        expandButton.id = "expand-" + branch["BRANCHNAME"];
        expandButton.setAttribute("onclick", "ExpandBranch('" + branch["BRANCHNAME"] + "')");
        expandButton.setAttribute("title", "Show users from " + branch["BRANCHDES"] );
        expandButton.innerHTML = expandSvg.outerHTML;

        var element = customerMenu.querySelector("#" + expandButton.id)
        if (element) {
            if (element.classList.contains("active")) {
                expandButton.classList.add("active");

            }
        }
        divElement.appendChild(expandButton);
        // #endregion

        // #region Show Button
        var showSvg = document.createElement("svg");
        showSvg.setAttribute("width", "1em");
        showSvg.setAttribute("height", "1em");
        showSvg.setAttribute("viewBox", "0 0 16 16");
        showSvg.classList.add("bi", "bi-geo-alt");
        showSvg.setAttribute("fill", "currentColor");
        showSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        var showPath = document.createElement("path");
        showPath.setAttribute("fill-rule", "evenodd");
        showPath.setAttribute("d", "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6");
        showSvg.appendChild(showPath);

        var showButton = document.createElement("button");
        showButton.id = "show-" + branch["BRANCHNAME"];
        showButton.classList.add("btn", "btn-primary", "button");
        showButton.setAttribute("onclick", "ToggleBranch('" + branch["BRANCHNAME"] + "')");
        showButton.setAttribute("title", "Show markers for " + branch["BRANCHDES"] );
        showButton.innerHTML = showSvg.outerHTML;

        if (branchArray.includes(branch["BRANCHNAME"] )){
            showButton.classList.add("active");
        }
        divElement.appendChild(showButton);
        // #endregion

        branchElement.appendChild(divElement);

        var branchDiv = document.createElement("div");
        branchDiv.id = branch["BRANCHNAME"] + "_container";

        var element = customerMenu.querySelector("#" + branchDiv.id);
        branchDiv.hidden = element && !element.hidden ? false : true;

        for (const key2 in users.data) {
            if (users.data[key2].BRANCHNAME === branch["BRANCHNAME"]) {
                branchElement.hidden = false;
                var today = users.data[key2]["ZCLA_WKCOM_SUBFORM"].find(item => item.DAYNAME=== day)
                if (today) {
                    var inputGroupDiv = document.createElement("div");
                    inputGroupDiv.classList.add("input-group", "input-group-sm", "mb-1");

                    // #region SVG
                    var svg = document.createElement("svg");
                    svg.setAttribute("width", "26");
                    svg.setAttribute("height", "28");
                    svg.setAttribute("viewBox", "0 0 24 24");
                    svg.classList.add("bi", "bi-geo-alt");
                    svg.setAttribute("fill", today.DAYCOLOUR());
                    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

                    var path = document.createElement("path");
                    path.setAttribute("fill-rule", "evenodd");
                    path.setAttribute("d", "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z");
                    svg.appendChild(path);
                    svg.classList.add("input-group-append");
                    inputGroupDiv.appendChild(svg);
                    // #endregion

                    var inputElement = document.createElement("input");
                    inputElement.classList.add("form-control");
                    inputElement.setAttribute("type", "text");
                    inputElement.setAttribute("disabled", "true");
                    inputElement.setAttribute("value", users.data[key2].SNAME);
                    inputGroupDiv.appendChild(inputElement);

                    var inputGroupAppendDiv = document.createElement("div");
                    inputGroupAppendDiv.classList.add("input-group-append");

                    // #region Select User Button
                    var showSvg = document.createElement("svg");
                    showSvg.setAttribute("width", "1.4em");
                    showSvg.setAttribute("height", "1.3em");
                    showSvg.setAttribute("viewBox", "7 3 24 24");
                    showSvg.setAttribute("scale", "2");
                    showSvg.classList.add("bi", "bi-geo-alt");
                    showSvg.setAttribute("fill", "currentColor");
                    showSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

                    var showPath = document.createElement("path");
                    showPath.setAttribute("fill-rule", "evenodd");
                    showPath.setAttribute("d", "M28.09,9.74a4,4,0,0,0-1.16.19c-.19-1.24-1.55-2.18-3.27-2.18A4,4,0,0,0,22.13,8,3.37,3.37,0,0,0,19,6.3a3.45,3.45,0,0,0-2.87,1.32,3.65,3.65,0,0,0-1.89-.51A3.05,3.05,0,0,0,11,9.89v.91c-1.06.4-4.11,1.8-4.91,4.84s.34,8,2.69,11.78a25.21,25.21,0,0,0,5.9,6.41.9.9,0,0,0,.53.17H25.55a.92.92,0,0,0,.55-.19,13.13,13.13,0,0,0,3.75-6.13A25.8,25.8,0,0,0,31.41,18v-5.5A3.08,3.08,0,0,0,28.09,9.74ZM29.61,18a24,24,0,0,1-1.47,9.15A12.46,12.46,0,0,1,25.2,32.2H15.47a23.75,23.75,0,0,1-5.2-5.72c-2.37-3.86-3-8.23-2.48-10.39A5.7,5.7,0,0,1,11,12.76v7.65a.9.9,0,0,0,1.8,0V9.89c0-.47.59-1,1.46-1s1.49.52,1.49,1v5.72h1.8V8.81c0-.28.58-.71,1.46-.71s1.53.48,1.53.75v6.89h1.8V10l.17-.12a2.1,2.1,0,0,1,1.18-.32c.93,0,1.5.44,1.5.68l0,6.5H27V11.87a1.91,1.91,0,0,1,1.12-.33c.86,0,1.52.51,1.52.94Z");
                    showSvg.appendChild(showPath);

                    var showButton = document.createElement("button");
                    showButton.id = "show-" + users.data[key2].USERLOGIN;
                    showButton.classList.add("btn", "btn-primary", "button");
                    showButton.setAttribute("onclick", "users.data[" + users.data[key2].ID + "].TOGGLESELECT()");
                    showButton.setAttribute("title", "Toggle " + users.data[key2].SNAME);
                    showButton.innerHTML = showSvg.outerHTML;

                    if (userArray.includes(users.data[key2].USERLOGIN)){
                        showButton.classList.add("active");
                    }
                    // #endregion

                    inputGroupAppendDiv.appendChild(showButton);

                    inputGroupDiv.appendChild(inputGroupAppendDiv);
                    branchDiv.appendChild(inputGroupDiv);
                }
            }
        }

        branchElement.appendChild(branchDiv);
        replaceElement.appendChild(branchElement);

    }

    // #region Selected Branch Button

    var branchElement = document.createElement("div");
    branchElement.id = "selected";
    branchElement.hidden = true;

    var divElement = document.createElement("div");
    divElement.classList.add("input-group", "input-group", "mb-1");

    var inputElement = document.createElement("input");
    inputElement.classList.add("form-control");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("disabled", "true");
    inputElement.setAttribute("value", "Selected");
    divElement.appendChild(inputElement);

    branchElement.appendChild(divElement);

    var branchDiv = document.createElement("div");
    branchDiv.id = "selected_container";

    sel = users.SELECTED()
    for (const key2 in sel) {
        user = users.data[sel[key2]]
        if (user.TODAY()) {
            branchElement.hidden = false;
            var inputGroupDiv = document.createElement("div");
            inputGroupDiv.classList.add("input-group", "input-group-sm", "mb-1");

            // #region SVG
            var svg = document.createElement("svg");
            svg.setAttribute("width", "26");
            svg.setAttribute("height", "28");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.classList.add("bi", "bi-geo-alt");
            svg.setAttribute("fill", user.TODAY().DAYCOLOUR());
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

            var path = document.createElement("path");
            path.setAttribute("fill-rule", "evenodd");
            path.setAttribute("d", "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z");
            svg.appendChild(path);
            svg.classList.add("input-group-append");
            inputGroupDiv.appendChild(svg);
            // #endregion

            var inputElement = document.createElement("input");
            inputElement.classList.add("form-control");
            inputElement.setAttribute("type", "text");
            inputElement.setAttribute("disabled", "true");
            inputElement.setAttribute("value", user.SNAME);
            inputGroupDiv.appendChild(inputElement);

            var inputGroupAppendDiv = document.createElement("div");
            inputGroupAppendDiv.classList.add("input-group-append");

            // #region show infowindow Button
            var iWindowSvg = document.createElement("svg");
            iWindowSvg.setAttribute("width", "1.2em");
            iWindowSvg.setAttribute("height", "1.2em");
            iWindowSvg.setAttribute("viewBox", "0 0 16 16");
            iWindowSvg.setAttribute("scale", "2");
            iWindowSvg.classList.add("bi", "bi-geo-alt");
            iWindowSvg.setAttribute("fill", "currentColor");
            iWindowSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

            var iWindowPath = document.createElement("path");
            iWindowPath.setAttribute("fill-rule", "evenodd");
            iWindowPath.setAttribute("d", "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6");
            iWindowSvg.appendChild(iWindowPath);

            var iWindowButton = document.createElement("button");
            iWindowButton.id = "iWindow-" + user.USERLOGIN;
            iWindowButton.classList.add("btn", "btn-primary", "button");
            iWindowButton.setAttribute("onclick", "users.data[" + user.ID + "].TOGGLEWINDOW()");
            iWindowButton.setAttribute("title", "Toggle infowindow for " + user.SNAME);
            iWindowButton.innerHTML = iWindowSvg.outerHTML;
            if (user.markers["USER"].infoWindow.Visible) {
                iWindowButton.classList.add("active");
            }
            // #endregion
            inputGroupAppendDiv.appendChild(iWindowButton);

            // #region Select route Button
            var routeSvg = document.createElement("svg");
            routeSvg.setAttribute("width", "1.4em");
            routeSvg.setAttribute("height", "1.2em");
            routeSvg.setAttribute("viewBox", "1 0 24 24");
            routeSvg.setAttribute("scale", "2");
            routeSvg.classList.add("bi", "bi-geo-alt");
            routeSvg.setAttribute("fill", "currentColor");
            routeSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

            var routePath = document.createElement("path");
            routePath.setAttribute("fill-rule", "evenodd");
            routePath.setAttribute("d", "M13,24h-2v-7c0-2.8-2.1-5-4.8-5H3.7l3.2,3.3l-1.4,1.4L0,11l5.5-5.7l1.4,1.4L3.7,10h2.5c1.9,0,3.6,0.8,4.8,2.1V12 c0-3.9,3-7,6.8-7h2.5l-3.2-3.3l1.4-1.4L24,6l-5.5,5.7l-1.4-1.4L20.3,7h-2.5C15.1,7,13,9.2,13,12V24z");
            routeSvg.appendChild(routePath);

            var routeButton = document.createElement("button");
            routeButton.id = "route-" + user.USERLOGIN;
            routeButton.classList.add("btn", "btn-primary", "button");
            routeButton.setAttribute("onclick", "ToggleRoute('" + user.USERLOGIN + "')");
            routeButton.setAttribute("title", "Toggle route for " + user.SNAME);
            routeButton.innerHTML = routeSvg.outerHTML;

            if (user.USERLOGIN == document.getElementById("route").value){ routeButton.classList.add("active") }
            // #endregion
            inputGroupAppendDiv.appendChild(routeButton);

            // #region Select User Button
            var showSvg = document.createElement("svg");
            showSvg.setAttribute("width", "1.4em");
            showSvg.setAttribute("height", "1.3em");
            showSvg.setAttribute("viewBox", "7 3 24 24");
            showSvg.setAttribute("scale", "2");
            showSvg.classList.add("bi", "bi-geo-alt");
            showSvg.setAttribute("fill", "currentColor");
            showSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

            var showPath = document.createElement("path");
            showPath.setAttribute("fill-rule", "evenodd");
            showPath.setAttribute("d", "M28.09,9.74a4,4,0,0,0-1.16.19c-.19-1.24-1.55-2.18-3.27-2.18A4,4,0,0,0,22.13,8,3.37,3.37,0,0,0,19,6.3a3.45,3.45,0,0,0-2.87,1.32,3.65,3.65,0,0,0-1.89-.51A3.05,3.05,0,0,0,11,9.89v.91c-1.06.4-4.11,1.8-4.91,4.84s.34,8,2.69,11.78a25.21,25.21,0,0,0,5.9,6.41.9.9,0,0,0,.53.17H25.55a.92.92,0,0,0,.55-.19,13.13,13.13,0,0,0,3.75-6.13A25.8,25.8,0,0,0,31.41,18v-5.5A3.08,3.08,0,0,0,28.09,9.74ZM29.61,18a24,24,0,0,1-1.47,9.15A12.46,12.46,0,0,1,25.2,32.2H15.47a23.75,23.75,0,0,1-5.2-5.72c-2.37-3.86-3-8.23-2.48-10.39A5.7,5.7,0,0,1,11,12.76v7.65a.9.9,0,0,0,1.8,0V9.89c0-.47.59-1,1.46-1s1.49.52,1.49,1v5.72h1.8V8.81c0-.28.58-.71,1.46-.71s1.53.48,1.53.75v6.89h1.8V10l.17-.12a2.1,2.1,0,0,1,1.18-.32c.93,0,1.5.44,1.5.68l0,6.5H27V11.87a1.91,1.91,0,0,1,1.12-.33c.86,0,1.52.51,1.52.94Z");
            showSvg.appendChild(showPath);

            var showButton = document.createElement("button");
            showButton.id = "show-" + user.USERLOGIN;
            showButton.classList.add("btn", "btn-primary", "button");
            showButton.setAttribute("onclick", "users.data[" + user.ID + "].TOGGLESELECT()");
            showButton.setAttribute("title", "Toggle " + user.SNAME);
            showButton.innerHTML = showSvg.outerHTML;

            if (user.SELECTED()){ showButton.classList.add("active") }
            // #endregion
            inputGroupAppendDiv.appendChild(showButton);

            inputGroupDiv.appendChild(inputGroupAppendDiv);
            branchDiv.appendChild(inputGroupDiv);

        }

    }
    branchElement.appendChild(branchDiv);
    // #endregion

    replaceElement.appendChild(branchElement);
    customerMenu.innerHTML = replaceElement.innerHTML

}

function createEngMenu(controlDiv) {

    let controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlDiv.appendChild(controlUI);

    let customerMenu = document.createElement("div");
    controlUI.appendChild(customerMenu);

    var customerStatusButtonsContainer = document.createElement("div");
    customerStatusButtonsContainer.id = "customerStatusButtonsContainer";
    customerMenu.appendChild(customerStatusButtonsContainer);

    RefreshEngMenu(customerStatusButtonsContainer);

}

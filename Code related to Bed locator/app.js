let mymap = L.map('mapid').setView([28.7041, 77.1025], 12);

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      document.getElementById("mapid").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    mymap.setView([position.coords.latitude, position.coords.longitude], 13);
    let marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap);
    marker.bindPopup("Your Location").openPopup();
    
}

getLocation();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWtoaWxqYXlhbjI5YWoiLCJhIjoiY2tvd3B2ODh6MDczeTJwdDY2b2xzbWp5cyJ9.QTHGPV2tJMNz_bYV84Y8PA'
}).addTo(mymap);



const beds = Object.entries(gnctd_covid_data.beds);
const covid_icu_beds = Object.entries(gnctd_covid_data.covid_icu_beds);
const icu_beds_without_ventilator = Object.entries(gnctd_covid_data.icu_beds_without_ventilator);
const noncovid_icu_beds = Object.entries(gnctd_covid_data.noncovid_icu_beds);
const oxygen_beds = Object.entries(gnctd_covid_data.oxygen_beds);
const oxygen_left_for = gnctd_covid_data.oxygen_left_for;




let circlez = [];

let selected = document.getElementById("selected")

let plotBeds = () =>{
    selected.innerHTML = "Showing beds";
    clearMap();
    for(let i=0;i<beds.length-1;i++){
        let url = gnctd_covid_facilities_data[beds[i][0]].location;
        let oxyLeft;
        let contacts = "";
        try {
            for(let j=0;j<gnctd_covid_facilities_data[beds[i][0]].contact_numbers.length;j++){
                if(j===gnctd_covid_facilities_data[beds[i][0]].contact_numbers.length-1){
                    contacts += `${gnctd_covid_facilities_data[beds[i][0]].contact_numbers[j]}`;
                } else {

                    contacts += `${gnctd_covid_facilities_data[beds[i][0]].contact_numbers[j]}, `;
                }
                

            }
        } catch{
            contacts = "N/A"
        }
        try{
            oxyLeft = gnctd_covid_data.oxygen_left_for[beds[i][0]].days*24 + gnctd_covid_data.oxygen_left_for[beds[i][0]].hours + " hours of O2 left";

        } catch{
            oxyLeft = "N/A";
        }

        let regex = new RegExp('@(.*),(.*),');
        let lon_lat_match = url.match(regex);
        if(lon_lat_match === null){
            continue;
        } else {
            try{
                let colorz;
                let fillcolorz;
                let rad;
                let lon = lon_lat_match[1];
                let lat = lon_lat_match[2];
                if(beds[i][1].vacant<=20){
                    colorz = 'red';
                    fillcolorz = '#f03';
                    rad = 200 
                } else if(beds[i][1].vacant>20 && beds[i][1].vacant<=40){
                    colorz = 'orange';
                    fillcolorz = '#FF9A34';
                    rad = 200*1.1
                }
                else if(beds[i][1].vacant>40 && beds[i][1].vacant<=80){
                    colorz = 'yellow';
                    fillcolorz = '#FFFF1A';
                    rad = 200*1.2
                }else{
                    colorz = 'green';
                    fillcolorz = '#33FF00';
                    rad=200*1.3
                }

                
                circle = L.circle([lon, lat], {
                    color: colorz,
                    fillColor: fillcolorz,
                    fillOpacity: 0.5,
                    radius: rad
                }).addTo(mymap).bindPopup(`
                <p>${beds[i][0]} <span class="badge">${beds[i][1].type}</span></p>
                <hr>
                <span id="grid">
                    <span>Vacancy: ${beds[i][1].vacant}/${beds[i][1].total}</span>
                    <span>
                        <a href="${url}" target="_blank">
                            <img src="https://img.icons8.com/fluent/25/000000/maps.png"/>
                        </a>
                    </span>
                </span>
                <span>${oxyLeft}</span>
                <br>
                <span>Contact Number: ${contacts}</span>
                </span><br><span>Updated at: ${beds[i][1].last_updated_at}</span><br>
                `);

                circlez.push(circle)
            }
            catch{
                
                continue;
            }
        }
    }
}

let plotCovidIcuBeds = () =>{
    selected.innerHTML = "Showing covid icu beds";
    clearMap();
    for(let i=0;i<covid_icu_beds.length-1;i++){
        let url = gnctd_covid_facilities_data[covid_icu_beds[i][0]].location;
        let oxyLeft;
        let contacts = "";
        try {
            for(let j=0;j<gnctd_covid_facilities_data[covid_icu_beds[i][0]].contact_numbers.length;j++){
                if(j===gnctd_covid_facilities_data[covid_icu_beds[i][0]].contact_numbers.length-1){
                    contacts += `${gnctd_covid_facilities_data[covid_icu_beds[i][0]].contact_numbers[j]}`;
                } else {

                    contacts += `${gnctd_covid_facilities_data[covid_icu_beds[i][0]].contact_numbers[j]}, `;
                }
                

            }
        } catch{
            contacts = "N/A"
        }
        try{
            oxyLeft = gnctd_covid_data.oxygen_left_for[covid_icu_beds[i][0]].days*24 + gnctd_covid_data.oxygen_left_for[covid_icu_beds[i][0]].hours + " hours of O2 left";

        } catch{
            oxyLeft = "N/A";
        }

        let regex = new RegExp('@(.*),(.*),');
        let lon_lat_match = url.match(regex);
        if(lon_lat_match === null){
            continue;
        } else {
            try{
                let colorz;
                let fillcolorz;
                let rad;
                let lon = lon_lat_match[1];
                let lat = lon_lat_match[2];
                if(covid_icu_beds[i][1].vacant<=20){
                    colorz = 'red';
                    fillcolorz = '#f03';
                    rad = 200 
                } else if(covid_icu_beds[i][1].vacant>20 && covid_icu_beds[i][1].vacant<=40){
                    colorz = 'orange';
                    fillcolorz = '#FF9A34';
                    rad = 200*1.1
                }
                else if(covid_icu_beds[i][1].vacant>40 && covid_icu_beds[i][1].vacant<=80){
                    colorz = 'yellow';
                    fillcolorz = '#FFFF1A';
                    rad = 200*1.2
                }else{
                    colorz = 'green';
                    fillcolorz = '#33FF00';
                    rad=200*1.3
                }

                
                circle = L.circle([lon, lat], {
                    color: colorz,
                    fillColor: fillcolorz,
                    fillOpacity: 0.5,
                    radius: rad
                }).addTo(mymap).bindPopup(`
                <p>${covid_icu_beds[i][0]} <span class="badge">${covid_icu_beds[i][1].type}</span></p>
                <hr>
                <span id="grid">
                    <span>Vacancy: ${covid_icu_beds[i][1].vacant}/${covid_icu_beds[i][1].total}</span>
                    <span>
                        <a href="${url}" target="_blank">
                            <img src="https://img.icons8.com/fluent/25/000000/maps.png"/>
                        </a>
                    </span>
                </span>
                <span>${oxyLeft}</span>
                <br>
                <span>Contact Number: ${contacts}</span>
                </span><br><span>Updated at: ${covid_icu_beds[i][1].last_updated_at}</span><br>
                `);

                circlez.push(circle)
            }
            catch{
                
                continue;
            }
        }
    }
}

let plotIcuBedsWOVents = () =>{
    selected.innerHTML = "Showing icu beds without ventilators";
    clearMap();
    for(let i=0;i<icu_beds_without_ventilator.length-1;i++){
        let url = gnctd_covid_facilities_data[icu_beds_without_ventilator[i][0]].location;
        let oxyLeft;
        let contacts = "";
        try {
            for(let j=0;j<gnctd_covid_facilities_data[icu_beds_without_ventilator[i][0]].contact_numbers.length;j++){
                if(j===gnctd_covid_facilities_data[icu_beds_without_ventilator[i][0]].contact_numbers.length-1){
                    contacts += `${gnctd_covid_facilities_data[icu_beds_without_ventilator[i][0]].contact_numbers[j]}`;
                } else {

                    contacts += `${gnctd_covid_facilities_data[icu_beds_without_ventilator[i][0]].contact_numbers[j]}, `;
                }
                

            }
        } catch{
            contacts = "N/A"
        }
        try{
            oxyLeft = gnctd_covid_data.oxygen_left_for[icu_beds_without_ventilator[i][0]].days*24 + gnctd_covid_data.oxygen_left_for[icu_beds_without_ventilator[i][0]].hours + " hours of O2 left";

        } catch{
            oxyLeft = "N/A";
        }

        let regex = new RegExp('@(.*),(.*),');
        let lon_lat_match = url.match(regex);
        if(lon_lat_match === null){
            continue;
        } else {
            try{
                let colorz;
                let fillcolorz;
                let rad;
                let lon = lon_lat_match[1];
                let lat = lon_lat_match[2];
                if(icu_beds_without_ventilator[i][1].vacant<=20){
                    colorz = 'red';
                    fillcolorz = '#f03';
                    rad = 200 
                } else if(icu_beds_without_ventilator[i][1].vacant>20 && icu_beds_without_ventilator[i][1].vacant<=40){
                    colorz = 'orange';
                    fillcolorz = '#FF9A34';
                    rad = 200*1.1
                }
                else if(icu_beds_without_ventilator[i][1].vacant>40 && icu_beds_without_ventilator[i][1].vacant<=80){
                    colorz = 'yellow';
                    fillcolorz = '#FFFF1A';
                    rad = 200*1.2
                }else{
                    colorz = 'green';
                    fillcolorz = '#33FF00';
                    rad=200*1.3
                }

                
                circle = L.circle([lon, lat], {
                    color: colorz,
                    fillColor: fillcolorz,
                    fillOpacity: 0.5,
                    radius: rad
                }).addTo(mymap).bindPopup(`
                <p>${icu_beds_without_ventilator[i][0]} <span class="badge">${icu_beds_without_ventilator[i][1].type}</span></p>
                <hr>
                <span id="grid">
                    <span>Vacancy: ${icu_beds_without_ventilator[i][1].vacant}/${icu_beds_without_ventilator[i][1].total}</span>
                    <span>
                        <a href="${url}" target="_blank">
                            <img src="https://img.icons8.com/fluent/25/000000/maps.png"/>
                        </a>
                    </span>
                </span>
                <span>${oxyLeft}</span>
                <br>
                <span>Contact Number: ${contacts}</span>
                </span><br><span>Updated at: ${icu_beds_without_ventilator[i][1].last_updated_at}</span><br>
                `);

                circlez.push(circle)
            }
            catch{
                
                continue;
            }
        }
    }
}

let plotNonCovidIcuBeds = () =>{
    selected.innerHTML = "Showing non covid icu beds";
    clearMap();
    for(let i=0;i<noncovid_icu_beds.length-1;i++){
        let url = gnctd_covid_facilities_data[noncovid_icu_beds[i][0]].location;
        let oxyLeft;
        let contacts = "";
        try {
            for(let j=0;j<gnctd_covid_facilities_data[noncovid_icu_beds[i][0]].contact_numbers.length;j++){
                if(j===gnctd_covid_facilities_data[noncovid_icu_beds[i][0]].contact_numbers.length-1){
                    contacts += `${gnctd_covid_facilities_data[noncovid_icu_beds[i][0]].contact_numbers[j]}`;
                } else {

                    contacts += `${gnctd_covid_facilities_data[noncovid_icu_beds[i][0]].contact_numbers[j]}, `;
                }
                

            }
        } catch{
            contacts = "N/A"
        }
        try{
            oxyLeft = gnctd_covid_data.oxygen_left_for[noncovid_icu_beds[i][0]].days*24 + gnctd_covid_data.oxygen_left_for[noncovid_icu_beds[i][0]].hours + " hours of O2 left";

        } catch{
            oxyLeft = "N/A";
        }

        let regex = new RegExp('@(.*),(.*),');
        let lon_lat_match = url.match(regex);
        if(lon_lat_match === null){
            continue;
        } else {
            try{
                let colorz;
                let fillcolorz;
                let rad;
                let lon = lon_lat_match[1];
                let lat = lon_lat_match[2];
                if(noncovid_icu_beds[i][1].vacant<=20){
                    colorz = 'red';
                    fillcolorz = '#f03';
                    rad = 200 
                } else if(noncovid_icu_beds[i][1].vacant>20 && noncovid_icu_beds[i][1].vacant<=40){
                    colorz = 'orange';
                    fillcolorz = '#FF9A34';
                    rad = 200*1.1
                }
                else if(noncovid_icu_beds[i][1].vacant>40 && noncovid_icu_beds[i][1].vacant<=80){
                    colorz = 'yellow';
                    fillcolorz = '#FFFF1A';
                    rad = 200*1.2
                }else{
                    colorz = 'green';
                    fillcolorz = '#33FF00';
                    rad=200*1.3
                }

                
                circle = L.circle([lon, lat], {
                    color: colorz,
                    fillColor: fillcolorz,
                    fillOpacity: 0.5,
                    radius: rad
                }).addTo(mymap).bindPopup(`
                <p>${noncovid_icu_beds[i][0]} <span class="badge">${noncovid_icu_beds[i][1].type}</span></p>
                <hr>
                <span id="grid">
                    <span>Vacancy: ${noncovid_icu_beds[i][1].vacant}/${noncovid_icu_beds[i][1].total}</span>
                    <span>
                        <a href="${url}" target="_blank">
                            <img src="https://img.icons8.com/fluent/25/000000/maps.png"/>
                        </a>
                    </span>
                </span>
                <span>${oxyLeft}</span>
                <br>
                <span>Contact Number: ${contacts}</span>
                </span><br><span>Updated at: ${noncovid_icu_beds[i][1].last_updated_at}</span><br>
                `);

                circlez.push(circle)
            }
            catch{
                
                continue;
            }
        }
    }
}

let plotOxyBeds = () =>{
    selected.innerHTML = "Showing oxygen beds";
    clearMap();
    for(let i=0;i<oxygen_beds.length-1;i++){
        let url = gnctd_covid_facilities_data[oxygen_beds[i][0]].location;
        let oxyLeft;
        let contacts = "";
        try {
            for(let j=0;j<gnctd_covid_facilities_data[oxygen_beds[i][0]].contact_numbers.length;j++){
                if(j===gnctd_covid_facilities_data[oxygen_beds[i][0]].contact_numbers.length-1){
                    contacts += `${gnctd_covid_facilities_data[oxygen_beds[i][0]].contact_numbers[j]}`;
                } else {

                    contacts += `${gnctd_covid_facilities_data[oxygen_beds[i][0]].contact_numbers[j]}, `;
                }
                

            }
        } catch{
            contacts = "N/A"
        }
        try{
            oxyLeft = gnctd_covid_data.oxygen_left_for[oxygen_beds[i][0]].days*24 + gnctd_covid_data.oxygen_left_for[oxygen_beds[i][0]].hours + " hours of O2 left";

        } catch{
            oxyLeft = "N/A";
        }

        let regex = new RegExp('@(.*),(.*),');
        let lon_lat_match = url.match(regex);
        if(lon_lat_match === null){
            continue;
        } else {
            try{
                let colorz;
                let fillcolorz;
                let rad;
                let lon = lon_lat_match[1];
                let lat = lon_lat_match[2];
                if(oxygen_beds[i][1].vacant<=20){
                    colorz = 'red';
                    fillcolorz = '#f03';
                    rad = 200 
                } else if(oxygen_beds[i][1].vacant>20 && oxygen_beds[i][1].vacant<=40){
                    colorz = 'orange';
                    fillcolorz = '#FF9A34';
                    rad = 200*1.1
                }
                else if(oxygen_beds[i][1].vacant>40 && oxygen_beds[i][1].vacant<=80){
                    colorz = 'yellow';
                    fillcolorz = '#FFFF1A';
                    rad = 200*1.2
                }else{
                    colorz = 'green';
                    fillcolorz = '#33FF00';
                    rad=200*1.3
                }

                
                circle = L.circle([lon, lat], {
                    color: colorz,
                    fillColor: fillcolorz,
                    fillOpacity: 0.5,
                    radius: rad
                }).addTo(mymap).bindPopup(`
                <p>${oxygen_beds[i][0]} <span class="badge">${oxygen_beds[i][1].type}</span></p>
                <hr>
                <span id="grid">
                    <span>Vacancy: ${oxygen_beds[i][1].vacant}/${oxygen_beds[i][1].total}</span>
                    <span>
                        <a href="${url}" target="_blank">
                            <img src="https://img.icons8.com/fluent/25/000000/maps.png"/>
                        </a>
                    </span>
                </span>
                <span>${oxyLeft}</span>
                <br>
                <span>Contact Number: ${contacts}</span>
                </span><br><span>Updated at: ${oxygen_beds[i][1].last_updated_at}</span><br>
                `);

                circlez.push(circle)
            }
            catch{
                
                continue;
            }
        }
    }
}

let clearMap = () =>{
    for(i=0;i<circlez.length;i++) {
        mymap.removeLayer(circlez[i]);
        }  
}



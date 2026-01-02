// Variable initialization
let postalDataList = [];
let currentPosition = 0;
const resultsArea = document.getElementById("resultsArea");
const loader = document.getElementById("loader");
const inputField = document.getElementById("input");
const selectField = document.getElementById("select");
const downloadBtn = document.getElementById("saveDetails");

// Main Fetch Function
async function fetchFromDOP() {
    const inputValue = inputField.value.trim();
    const searchType = selectField.value; // 'number' or 'text'
    
    if (!inputValue) {
        alert("Please enter a value");
        return;
    }

    // UI Reset
    resultsArea.classList.add("hidden");
    loader.classList.remove("hidden");
    
    let apiUrl = "";
    if (searchType === "number") {
        apiUrl = `https://api.postalpincode.in/pincode/${inputValue}`;
    } else {
        apiUrl = `https://api.postalpincode.in/postoffice/${inputValue}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        loader.classList.add("hidden");

        if (data[0].Status === "Success") {
            postalDataList = data[0].PostOffice;
            currentPosition = 0; // Reset to first result
            resultsArea.classList.remove("hidden");
            renderCard(currentPosition);
        } else {
            alert("No records found. Please check inputs.");
        }
    } catch (error) {
        loader.classList.add("hidden");
        alert("Error connecting to server.");
        console.error(error);
    }
}

<<<<<<< HEAD
// Render the Postal Card
function renderCard(index) {
    const data = postalDataList[index];
    const container = document.getElementById("detailsContainer");
    
    // Update pagination text
    document.getElementById("currP_maxP").innerText = `${index + 1} / ${postalDataList.length}`;
=======
document.getElementById("fetchDataBtn").onclick = function(){
    fetchFromDOP().then((data) => {
        list = data[0][0]['PostOffice'];
>>>>>>> aa79bfe48ab533832f175b326252e74a652f39dd

    // Define keys to display. "full-width" class added to long fields.
    const fields = [
        { label: "Name", key: "Name", full: true },
        { label: "Pincode", key: "Pincode", full: false },
        { label: "Branch Type", key: "BranchType", full: false },
        { label: "Status", key: "DeliveryStatus", full: false },
        { label: "District", key: "District", full: false },
        { label: "Division", key: "Division", full: false },
        { label: "Region", key: "Region", full: true },
        { label: "State", key: "State", full: true },
        { label: "Country", key: "Country", full: false }
    ];

<<<<<<< HEAD
    let htmlContent = "";
    
    fields.forEach(field => {
        const value = data[field.key] || "N/A";
        const cssClass = field.full ? "detail-item full-width" : "detail-item";
        
        htmlContent += `
            <div class="${cssClass}">
                <span class="detail-label">${field.label}</span>
                <span class="detail-value">${value}</span>
            </div>
        `;
=======
        function updateTableData(pos){
            dataHere = list[pos-1]
            var keys = ["Name", "Description", "BranchType", "DeliveryStatus", "Circle", "District", "Division", "Region", "Block", "State", "Country", "Pincode"]
            var i = 0;
            for (const x of document.getElementsByClassName("detailHolder")) {
                x.innerHTML = `${keys[i]} : ${dataHere[keys[i]]}`;
                i++;
            }
        }

        updateTableData(position);

        html2canvas(document.getElementById("main"), {dpi : 300}).then(canvas=>{
            document.getElementById("saveDetails").href = canvas.toDataURL("image/jpg");
        });
        
        setTimeout(() => {
            html2canvas(document.getElementById("table"), {dpi : 300}).then(canvas=>{
                document.getElementById("saveDetails").href = canvas.toDataURL("image/jpg");
            });
        }, 300);

        document.getElementById("saveDetails").style.display = "initial";
        
        function rightClick(){
            if(position<list.length){
                position+=1;
                document.getElementById("currP_maxP").innerHTML=`${position} / ${list.length}`;
                updateTableData(position);

                setTimeout(() => {
                    html2canvas(document.getElementById("main"), {dpi : 300}).then(canvas=>{
                        document.getElementById("saveDetails").href = canvas.toDataURL("image/jpg");
                    });
                }, 300);
            }
        }
        function leftClick(){
            if(position>1){
                position-=1;
                document.getElementById("currP_maxP").innerHTML=`${position} / ${list.length}`;
                updateTableData(position);

                setTimeout(() => {
                    html2canvas(document.getElementById("main"), {dpi : 300}).then(canvas=>{
                        document.getElementById("saveDetails").href = canvas.toDataURL();
                    });
                }, 300);
            }
        }

        document.getElementById("leftBtn").onclick = leftClick;
        document.getElementById("rightBtn").onclick = rightClick;
>>>>>>> aa79bfe48ab533832f175b326252e74a652f39dd
    });
}

<<<<<<< HEAD
    container.innerHTML = htmlContent;

    // Generate Image Link
    generateImage();
}

// Generate Image for Download
function generateImage() {
    // Small delay to ensure DOM rendering
    setTimeout(() => {
        const cardElement = document.getElementById("main");
        
        html2canvas(cardElement, { 
            scale: 2, // Higher resolution
            backgroundColor: "#ffffff",
            useCORS: true
        }).then(canvas => {
            downloadBtn.href = canvas.toDataURL("image/jpg");
        });
    }, 100);
}

// Navigation Handlers
document.getElementById("rightBtn").onclick = function() {
    if (currentPosition < postalDataList.length - 1) {
        currentPosition++;
        renderCard(currentPosition);
    }
};

document.getElementById("leftBtn").onclick = function() {
    if (currentPosition > 0) {
        currentPosition--;
        renderCard(currentPosition);
    }
};

// Input Type Toggler
function changed() {
    const type = selectField.value;
    inputField.value = "";
    if (type === "number") {
        inputField.type = "number";
        inputField.placeholder = "Enter 6-digit Pincode";
    } else {
        inputField.type = "text";
        inputField.placeholder = "Enter Post Office Name";
    }
}

// Event Listeners
document.getElementById("fetchDataBtn").onclick = fetchFromDOP;

inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchFromDOP();
    }
});
=======
var _keys = ["Name", "Description", "BranchType", "DeliveryStatus", "Circle", "District", "Division", "Region", "Block", "State", "Country", "Pincode"]

for (const key of _keys) {
    document.getElementById("main").innerHTML += `<div class="detailHolder">${key} : </div>`;
}

document.getElementById("input").addEventListener("keypress",(e)=>{
    if(e.keyCode==13){
        document.getElementById("fetchDataBtn").click();
    }
});

function changed(){
    document.getElementById("input").type=document.getElementById("select").value;

    if(document.getElementById("select").value=="number"){
        document.getElementById("input").placeholder="Enter Pincode";
    }
    else{
        document.getElementById("input").placeholder="Enter Post Office name";
    }
}

// var start = 0;
// var end = 0;
// document.getElementById("main").addEventListener("touchstart",function(e){
//     start = e.touches[0].clientX;
// });

// document.getElementById("main").addEventListener("touchmove",function(e){
//     end = e.touches[0].clientX;

//     if(start < end){
//         // confirm("LEFT");
//         leftClick();
//     }
//     if(start > end){
//         // confirm("RIGHT");
//         rightClick();
//     }
// });
>>>>>>> aa79bfe48ab533832f175b326252e74a652f39dd

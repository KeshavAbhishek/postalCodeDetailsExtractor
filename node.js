function fetchFromDOP(){
    var valueType = /^[A-Za-z]/;
    inputValue = document.getElementsByTagName('input')[0].value;
    if(inputValue.match(valueType)){
        const postalData = fetch(
            `https://api.postalpincode.in/postoffice/${inputValue}`
        ).then((res, err) => res.json());
    
        return Promise.all([postalData]);
    }
    else{
        const postalData = fetch(
            `https://api.postalpincode.in/pincode/${inputValue}`
        ).then((res, err) => res.json());
    
        return Promise.all([postalData]);
    }
}

document.getElementById("fetchDataBtn").onclick = function(){
    fetchFromDOP().then((data) => {
        list = data[0][0]['PostOffice'];

        var position = 1
        document.getElementById("currP_maxP").innerHTML=`${position} / ${list.length}`;

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
    });
}

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
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

document.getElementById("fetchDataBtn").onclick = ()=>{
    fetchFromDOP().then((data) => {
        list = data[0][0]['PostOffice'];

        var position = 1
        document.getElementById("currP_maxP").innerHTML=`${position} / ${list.length}`;

        function updateTableData(pos){
            dataHere = list[pos-1]
            keys = ["Name", "Description", "BranchType", "DeliveryStatus", "Circle", "District", "Division", "Region", "Block", "State", "Country", "Pincode"]
            var i = 0;
            for (const x of document.getElementsByClassName("values")) {
                x.innerHTML = `${dataHere[keys[i]]}`;
                i++;
            }
        }

        updateTableData(position);
        
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
                    html2canvas(document.getElementById("table"), {dpi : 300}).then(canvas=>{
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
                    html2canvas(document.getElementById("table"), {dpi : 300}).then(canvas=>{
                        document.getElementById("saveDetails").href = canvas.toDataURL("image/jpg");
                    });
                }, 300);
            }
        }

        document.getElementById("leftBtn").onclick = leftClick;
        document.getElementById("rightBtn").onclick = rightClick;
    });

}
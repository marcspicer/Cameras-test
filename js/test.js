var data = {
    "Cameras": [
        {
            "camera_id": 1,
            "images": [
                {
                    "file_size": 33334
                },
                {
                    "file_size": 42048
                },
                {
                    "file_size": 1024
                }
            ]
        },
        {
            "camera_id": 2,
            "images": [
                {
                    "file_size": 534
                },
                {
                    "file_size": 4203423
                },
                {
                    "file_size": 6788
                },
                {
                    "file_size": 78654
                }
            ]
        },
        {
            "camera_id": 3,
            "images": [
                {
                    "file_size": 12
                }
            ]
        },
        {
            "camera_id": 4,
            "images": [
                {
                    "file_size": 23442
                },
                {
                    "file_size": 6760
                },
                {
                    "file_size": 56544
                },
                {
                    "file_size": 456
                },
                {
                    "file_size": 97890
                }
            ]
        },
        {
            "camera_id": 5,
            "images": [
                {
                    "file_size": 19
                },
                {
                    "file_size": 9098
                },
                {
                    "file_size": 234534
                },
                {
                    "file_size": 12136
                },
                {
                    "file_size": 565656
                },
                {
                    "file_size": 23234
                }
            ]
        }
    ]
};
var buttonClick = function () {
    var id = document.getElementById("id_input").value;
    apiSearch(id);
};

//---------- Function will search the camera for the provided id ---------------------//
var apiSearch = function (id) {
    if (data.Cameras[id - 1]) {
        console.log(data.Cameras[id - 1]);
    }
    else {
        console.log("No Records found with provided id");
    }

};

//-------- Function will extract the desired results from the provided JSON ----------//
var extract_details = function (data) {
    var details = {};
    var total_size = 0;
    var data_used = function (data) {
        data.map(function (node) {
            total_size = total_size + node.file_size;
        });
        return total_size;
    };
    details.total = data.length;
    var largest_image = function (data) {
        return Math.max.apply(Math, data.map(function (image) { return image.file_size; }));
    };
    details.data_used = data_used(data);
    details.largest_image = largest_image(data);
    return details;
};

//--------- Function will load all Cameras data on start of the app ---------------//
var loadData = function () {
    var row = "";
    var xTable = document.getElementById("testTable");
    data.Cameras.filter(function (Camera) {
        data1 = extract_details(Camera.images);
        var tr = document.createElement('tr');
        tr.innerHTML = "<tr><td class='.img'><img src=" + "https://dummyimage.com/300x200/327a81/0b0c1f.png&text=" + Camera.camera_id + " /></td><td>" + Camera.camera_id + "</td><td>" + data1.total + "</td><td>" + data1.data_used + "</td><td>" + data1.largest_image + "</td></tr>";
        xTable.appendChild(tr);
    });
};

//----------- Function will append data to the view -----------------------------//
var appendData = function (id, message) {
    var ul = document.getElementById(id);
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    ul.appendChild(li);
}

//---------- Function will extract the data ---------------------------------------//
var extractedData = function () {
    var d = data.Cameras.map(function (Camera) {
        data1 = extract_details(Camera.images);
        return data1;
    });

    return d;
}

//---------- Function will find Camera which has used the most data --------------- //
var mostData = function () {
    var allData = extractedData();
    var highestData = Math.max.apply(Math, allData.map(function (d) { return d.data_used; }));
    var id = 0;
    for (var i = 0; i < allData.length; i++) {
        if (allData[i].data_used === highestData) {
            id = i + 1;
        }
    }
    var message = "Camera with Id " + id + " has Used most data " + highestData;
    appendData("most-data", message);
}

//--------- Function will find the Camera having most number of Images -------------//
var mostImages = function () {
    var allData = extractedData();
    var mostImage = Math.max.apply(Math, allData.map(function (d) { return d.total; }));
    var id = 0;
    for (var i = 0; i < allData.length; i++) {
        if (allData[i].total === mostImage) {
            id = i + 1;
        }
    }
    var message = "Camera with Id " + id + " has most # of Images " + mostImage;
    appendData("most-image", message);
}

//----------------- function will load data on loading the page --------------------//
window.addEventListener("load", function () {

    setTimeout(loadData, 100);
    setTimeout(mostData(), 100);
    setTimeout(mostImages(), 100);
}, false);


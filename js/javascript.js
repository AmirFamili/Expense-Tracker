// *click button in form
$("#add").click(function () {



    if (validateForm() == true) {
        let name = $("#name").val();
        let date = $("#date").val();
        let amount = $("#amount").val();


        itemToLocalStorage(name, date, amount);
        $("#name").css("border", "1px solid black");
        $("#date").css("border", "1px solid black");
        $("#amount").css("border", "1px solid black");
    }


});
// * End click button in form


// * validation form inputs befor add to table

function validateForm() {
    let name = $("#name").val();
    let date = $("#date").val();
    let amount = $("#amount").val();

    if (name == "") {
        $("#name").css("border", "2px solid red");
        return false;
    } else {
        $("#name").css("border", "2px solid green");

    }
    if (date == "") {
        $("#date").css("border", "2px solid red");
        return false;

    } else {
        $("#date").css("border", "2px solid green");

    }
    if (amount == "") {
        $("#amount").css("border", "2px solid red");
        return false;

    } else {
        $("#amount").css("border", "2px solid green");
        return true;
    }
}
// * End validation form inputs befor add to table

// * add item to local storage
function itemToLocalStorage(name, date, amount) {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];


    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.push(
        {
            name: name,
            date: date,
            amount: amount
        }
    );
    let jsonTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', jsonTasks);
    showAllItem();
    $("#name").val("");
    $("#date").val("");
    $("#amount").val("");
}


// * End add item to local storage


// * show all item in table
function showAllItem() {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
        $("tbody").html(`<tr class="item">
            <td colspan="4">No expense added yet!</td>`);
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));


        $('tbody').text('')
        let html = "";
        tasks.forEach(function (element, index) {
            html += "<tr>";
            html += "<td>" + element.name + "</td>";
            html += "<td>" + element.date + "</td>";
            html += "<td>" + element.amount + "</td>";
            html += "<td>" + '<button id="edit" onclick="editData(' + index + ');">Edit</button><button id="delete" onclick="deleteData(' + index + ');">Delete</button> ' + "</td>";
            html += "</tr>";


        });
        $('table tbody').html(html);
    }
}

showAllItem();
// * End show all item in table





// * edit data in localstorage
function editData(index) {

    $('#add').addClass('hide');
    $('#update').removeClass('hide');

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    let data = tasks[index];
    $("#name").val(data.name);
    $("#date").val(data.date);
    $("#amount").val(data.amount);



    $('#update').click(function () {

        if (validateForm() == true) {


            data.name = $("#name").val();
            data.date = $("#date").val();
            data.amount = $("#amount").val();
            let jsonTasks = JSON.stringify(tasks);
            localStorage.setItem('tasks', jsonTasks);
            showAllItem();
            $("#name").val("");
            $("#date").val("");
            $("#amount").val("");
            $('#update').addClass('hide');
            $('#add').removeClass('hide');
            $("#name").css("border", "1px solid black");
            $("#date").css("border", "1px solid black");
            $("#amount").css("border", "1px solid black");
            location.reload(true);
        }


    });

}



// * End edit data in localstorage









// * delete data in localstorage
function deleteData(index) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
        $("tbody").html(`<tr class="item">
            <td colspan="4">No expense added yet!</td>`);

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    showAllItem();

};

//  * End delete data in localstorage





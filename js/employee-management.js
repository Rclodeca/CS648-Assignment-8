
const $ = function (id) {
    "use strict";
    return document.getElementById(id);
};

let employees = [
    ["Sally Smith", "Quality Assurance", 3423], 
    ["Mark Martin", "VP Sales", 3346],
    ["John Johnson", "Marketing", 3232],
    ["Ryan Renolds", "Engineering", 3577],
    ["Jim Halbert", "Accounting", 3621]
];

const displayEmployees = function(){
    const header = "<th>Name</th><th>Title</th><th>Extension</th><th></th>"
    $("employee_table").innerHTML = header;
    employees.forEach(employee => {
        const tr = document.createElement("tr");
        const html = 
            `<tr><td>${employee[0]}</td>
            <td>${employee[1]}</td>
            <td>${employee[2]}</td></tr>`;
        tr.innerHTML = html;
        const td = tr.appendChild(document.createElement("td"))
        const del = td.appendChild(document.createElement("input"));
        del.type = "button";
        del.value = "Delete";
        del.addEventListener("click", deleteEmployee);
        $("employee_table").appendChild(tr);
    });
    $("showing_text").innerHTML = `Showing ${employees.length} Employees`; 
}

const deleteEmployee = function(){
    const name = event.target.parentNode.parentNode.children[0].innerHTML;
    const index = employees.findIndex(employee => {
        if(employee[0] === name){
            return true;
        }
    });
    employees.splice(index, 1);
    displayEmployees();
}

const addEmployee = function(){
    const name = $("name").value;
    const title = $("title").value;
    const extension = $("extension").value;
    const error = "Required";
    let status = "correct";
    
    if(name === ""){
        status = "error";
        $("name_err").innerHTML = error;
    }
    if(title === ""){
        status = "error";
        $("title_err").innerHTML = error;
    }
    if(extension === ""){
        status = "error";
        $("ext_err").innerHTML = error;
    }

    if(status === "correct"){
        employees.push([name, title, parseInt(extension, 10)]);
        $("name_err").innerHTML = "";
        $("title_err").innerHTML = "";
        $("ext_err").innerHTML = "";
        $("add_employee_form").reset();
        displayEmployees();
    }


}

window.addEventListener("load", function () {
    "use strict";
    $("add_button").addEventListener("click", addEmployee);
    displayEmployees();
    $("name").focus();
});


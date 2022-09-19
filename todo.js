// TÜM ELEMENTLERİ SEÇME
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondaryCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners () { //tüm event listenerlar
form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",loadAllTodoToUI);
secondaryCardBody.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){ //arayüzden todoları temizlem
    if ( confirm("Tümünü silmek istediğinize emin misiniz ? ")){
        todoList.innerHTML = "";  

        localStorage.removeItem("todos");



    }

    

}







function filterTodos(e){
    const filtervalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(){
        const text = listItem.textContent.toLowerCase();
        
    });


}



function deleteTodo(e){
    if ( e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Başarıyla Silindi..")
    }
}

function deleteTodoFromStorage(deletetodo){ 
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        if ( todo === deletetodo){
            todos.splice(0,1); // arrayden değeri silebiliriz
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodoToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(){
        addTodoUI(todo);
    });
}

function addTodo(e){ 
    const newTodo = todoInput.value.trim(); //trim baştaki ve sondaki boşlukları siler


    if (newTodo.trim() === "") {
        /*<div class="alert alert-warning" role="alert">
                        This is a warning alert—check it out!
                      </div> */
        showAlert("danger","LÜTFEN BİR TODO GİRİN!!")
    }
    else{
        addTodoUI(newTodo);
        addTOdoToStorage(newTodo);
        showAlert("warning","Başarıyla Eklendi")
    }
    
    
    // addTodoUI(newTodo);//fonskiyonlara bölmek en mantıklısı

    e.preventDefault();
}
function getTodosFromStorage(){ // storagedan todoları alır
    let todos ; 

    if(localStorage.getItem("todos") === null){
        todos = []; 
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos ; 

}




function addTOdoToStorage(newTodo){ 
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
   
}








function showAlert(type,message) {  
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}` ; 
    alert.textContent = message ; 
    
    firstCardBody.appendChild(alert);

    //setTimeout methodu ile 1 2 saniye gözükmesini sağlarız
    
    setTimeout( function (){
        alert.remove();
    },1500);
}

function addTodoUI(newTodo){ //string değerini list item olarak ui ekler
/* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>*/ 
    // LİST ITEM OLUŞTURMA
    const listItem = document.createElement("li");
    // LİNK OLUŞTURMA
    const link = document.createElement("a");
    link.href = "# " ; 
    link.className = "delete-item"; 
    link.innerHTML = " <i class = 'fa fa-remove> </i>";

    listItem.className = "list-group-item d-flex justify-content-between";
    
    // TEXT NODE EKLEME 

    listItem.appendChild(document.createTextNode(newTodo)); 
    listItem.appendChild(link);
    
    // Toda list e list item ekleme

    todoList.appendChild(listItem);

    todoInput.value = " ";

}

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK= "fa-circle-thin";
const LINE_THROUGH ="lineThrough";
let LIST=[] ,id=0;
let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST =[];
    id =0;
}
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash);
    })
}
const today = new Date();
const option ={weekday :"long",month:"short",day:"numeric"};
dateElement.innerHTML = today.toLocaleDateString("en-US",option);

function addToDo(toDo,id,done,trash){
    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item =`
        <li class="item">
        <i class="fa ${DONE} co" job ="complete" id="${id}"> </i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="0"></i>
        </li>
    `;
    const position ="beforeend";
    list.insertAdjacentHTML(position,item);
}

document.addEventListener("keyup",function(event){
    var toDo =0;
    if(event.keyCode == 13){
        toDo = input.value;
    }
    if(toDo!=0){
        addToDo(toDo,id,false,false);
        LIST.push({
            name : toDo,
            id  : id,
            done : false,
            trash :false
        });
        localStorage.setItem("TODO",JSON.stringify(LIST));
        id++;
        input.value="";
    }
    
});

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done?false:true;
    
}
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
list.addEventListener("click",function(event){
    const element =event.target;
    const elementJob =element.attributes.job.value;
    if(elementJob=="complete"){
        completeToDo(element);
    }
    if(elementJob=="delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO",JSON.stringify(LIST));
});
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});

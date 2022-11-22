let inpName = document.querySelector(".input-name");
let inpMail = document.querySelector(".input-mail");
let inpUrl = document.querySelector(".input-url");
let btn = document.querySelector(".btn");
let list = document.querySelector(".contact-list");
btn.addEventListener("click", (e)=>{
    if(!inpName.value.trim()){
        alert("Введите имя!");
        return;
    }
    else if(!inpMail.value.trim()){
        alert("Введите мейл!");
        return;
    }
    else if(!inpUrl.value.trim()){
        alert("Введите URL!");
        return;
    }
    let obj = {
        name: inpName.value,
        mail: inpMail.value,
        image: inpUrl.value,
        };
        setItemToStorage(obj);
        createElement();
        inpName.value = "";
        inpMail.value = "";
        inpUrl.value = "";

    });

createElement();

function setItemToStorage(cont){
    let data = JSON.parse(localStorage.getItem("contact-data"));
    data.push(cont);
    localStorage.setItem("contact-data", JSON.stringify(data));
}
function createElement(){
    list.innerHTML = "";
    if(!localStorage.getItem("contact-data")){
localStorage.setItem("contact-data", "[]");
    }

let newData = JSON.parse(localStorage.getItem("contact-data"));
newData.forEach((item, index) => {
    let li = document.createElement("li");
    let btnEdit = document.createElement("button");
    let btnDelete = document.createElement("button");

    li.innerHTML = `name:${item.name} mail:${item.mail} imageUrl:<img src=${item.image}></img> `;
    btnEdit.innerText="Edit";
    btnDelete.innerText = "Delete";
    li.append(btnEdit)
    li.appendChild(btnDelete);
    btnDelete.addEventListener("click", ()=>{
        deleteElement(index);
    });

    btnEdit.addEventListener("click", ()=>{
        editElement(index, item);
    });
    list.appendChild(li);
    

});
}

function deleteElement(index){
    let data = JSON.parse(localStorage.getItem("contact-data"));
    data.splice(index, 1);
    localStorage.setItem("contact-data", JSON.stringify(data));
    createElement();
}

let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit");
let inpEdit1 = document.querySelector(".inp-edit1");
let inpEdit2 = document.querySelector(".inp-edit2");
let btnCloser = document.querySelector(".btn-closer");

function editElement(index, item){
mainModal.style.display = "block";
inpEdit.setAttribute("id", index);
inpEdit.value = item.name;
inpEdit1.setAttribute("id", index);
inpEdit1.value = item.email;
inpEdit2.setAttribute("id", index);
inpEdit2.value = item.image;
}

let btnSave = document.querySelector(".btn-save");
btnSave.addEventListener("click", ()=>{
    let data = JSON.parse(localStorage.getItem("contact-data"));
    let index = inpEdit.id;
    if(!inpEdit.value.trim()){
        alert("Заполните поле!");
        return;
    }
    let newBook = {
        name: inpEdit.value,
        email: inpEdit1.value,
        image: inpEdit2.value,
        };
        data.splice(index,1,newBook);
        localStorage.setItem("contact-data", JSON.stringify(data));
        mainModal.style.display="none";
        createElement();
})


btnCloser.addEventListener("click", ()=>{
    mainModal.style.display="none";
})

 
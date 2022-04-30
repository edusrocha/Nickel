const myModal = new bootstrap.Modal("#transactions-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data={
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href="index.html";
}

//Adicionar lançamento

document.getElementById("transaction-form").addEventListener("submit", function(e){e.preventDefault();
    
    const value= parseFloat(document.getElementById("value-input").value);
    const descripton= document.getElementById("description-input").value;
    const date= document.getElementById("date-input").value;
    const type= document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value:value, type:type, descripton:descripton, date:date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();


    GetTransactions();

    alert("Lançamento adicionado com sucesso");
        
});

// Entra e saida Pagina

document.getElementById("button-logout").addEventListener("click", logout);

checkLooged();

function checkLooged(){
    if(session) {
        sessionStorage.setItem("logged", session);
        logged=session;
    }
    if(!logged){
        window. location.href="index.html";
        return;
    }
    const dataUser=localStorage.getItem(logged);
    if(dataUser){
        data= JSON.parse(dataUser);
    }
 
    GetTransactions();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href="index.html";
}

function GetTransactions() {
    
    const transactions= data.transactions;
    let transactionsHtml= ``;

    if(transactions.length){
        transactions.forEach((item) => {
            
            let type= "Entrada";
            
            if( item.type === "2"){
                type= "Saída";
            }
            
            transactionsHtml +=`
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.descripton}</td>
                </tr>
            `
        });
            
    }

    document.getElementById("transactions-list").innerHTML= transactionsHtml;
}




function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}
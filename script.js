const form=document.getElementById("transactionForm");
const text=document.getElementById("text");
const amount=document.getElementById("amount");
const list=document.getElementById("transactionList");
const chart=document.getElementById("chart");
const balance=document.getElementById("balance");
const income=document.getElementById("income");
const expense=document.getElementById("expense");
//categories
const category=document.getElementById("category");
const categoryColors = {
  Food: "#FF9800",
  Transport: "#2196F3",
  Shopping: "#9C27B0",
  Salary: "#4CAF50",
  Other: "#607D8B"
};
//array for transactions
let transactions=[];
let myChart;
//render
function render(){
    list.innerHTML="";
    let incomeTotal=0;
    let expenseTotal=0;
    transactions.forEach(element=>{
        let li=document.createElement("li");
        const delBtn=document.createElement("button");
        delBtn.innerText="❌";
        //delete
        delBtn.addEventListener("click",()=>{
            deleteTransaction(element.id);
        });
        // category badge
const badge = document.createElement("span");
badge.innerText = element.category;
badge.style.backgroundColor = categoryColors[element.category];
badge.style.color = "white";
badge.style.padding = "2px 6px";
badge.style.marginRight = "8px";
badge.style.borderRadius = "6px";
badge.style.fontSize = "12px";

// description
const desc = document.createElement("span");
desc.innerText = element.text;
desc.style.marginRight = "8px";

// amount
const amt = document.createElement("span");
amt.innerText = element.amount;

// color based on type
amt.style.fontWeight = "bold";
amt.style.marginLeft = "auto";

if (element.amount > 0) {
  amt.style.color = "#4CAF50"; // green income
} else {
  amt.style.color = "#F44336"; // red expense
}

// assemble
li.appendChild(badge);
li.appendChild(desc);
li.appendChild(amt);

        li.appendChild(delBtn);
        list.appendChild(li);
        if(element.amount>0){
            incomeTotal+=element.amount;
        }
        else{
            expenseTotal+=Math.abs(element.amount);
        }
    }
    )
    let balanceTotal=incomeTotal-expenseTotal;
    balance.innerText=balanceTotal;
    income.innerText=incomeTotal;
    expense.innerText=expenseTotal;
    if(myChart){
        myChart.destroy();
    }
    myChart= new Chart(chart,
        {
            type:"pie",
            data:{
                labels:["Income","Expense"],
            datasets:[{
                data:[incomeTotal,expenseTotal],
                backgroundColor:["#4CAF50", "#F44336"]
            }]
        }
    }
    );
}
//deletion 
function deleteTransaction(id){
  transactions=transactions.filter(t=>t.id!==id);
  saveTransactions(); 
  render();
}
//save
function saveTransactions(){
    localStorage.setItem("transactions",JSON.stringify(transactions));
}
//show saved data
function getTransactions() {
    const stored=localStorage.getItem("transactions");
    if(stored){
    transactions=JSON.parse(stored);
    render();
    }
}



//form event
form.addEventListener("submit",function(e) {
    e.preventDefault();
    const textValue=text.value.trim();
   const amountValue=Number(amount.value);
   const categoryValue=category.value;
   if(textValue===""){
    return alert("Text field cannot be empty.....");
   }

    if(isNaN(amountValue)||amountValue===0){
        return alert("Enter valid amount");
    }
    //object creation
    const transaction={
        id:Date.now(),
        text:textValue,
        amount:amountValue,
        category:categoryValue
    };
    transactions.push(transaction);
    render();
    saveTransactions();
    text.value="";
    amount.value="";
});
getTransactions();

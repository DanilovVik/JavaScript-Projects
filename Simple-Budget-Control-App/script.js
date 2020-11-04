const budgetAmount = document.querySelector('.budget-amount')
const expenseTitle = document.querySelector('.expense-title')
const expenseAmount = document.querySelector('.expense-amount')
const infoBudget = document.querySelector('.info-budget')
const infoExpense = document.querySelector('.info-expense')
const infoBalance = document.querySelector('.info-balance')
const listBox = document.querySelector('.list-box')

let listArr

function initApp() {
    if (localStorage.getItem('budget')) {
        infoBudget.textContent = localStorage.getItem('budget')
    }

    if (localStorage.getItem('expenses')) {
        listArr = JSON.parse(localStorage.getItem('expenses'))

        listArr.map(expense => addItem(expense))

        showBalance()
    } else {
        listArr = []
    }
}
initApp()

function addBudget() {
    const value = +budgetAmount.value

    if (value === '' || value <= 0) {
        return
    } else {
        infoBudget.textContent = value

        localStorage.setItem('budget', value)

        budgetAmount.value = ''
        showBalance()
    }
}

function showBalance() {
    const expense = totalExpense()
    const total = +infoBudget.textContent - expense
    infoBalance.textContent = total
}

function addExpense() {
    const title = expenseTitle.value
    const amount = +expenseAmount.value

    if (title === '' || amount === '' || amount <= 0) {
        return
    } else {
        expenseTitle.value = ''
        expenseAmount.value = ''
        expenseTitle.focus()

        const expense = {
            id: Date.now(),
            title,
            amount
        }

        listArr.push(expense)

        localStorage.setItem('expenses', JSON.stringify(listArr))

        addItem(expense)

        showBalance()
    }
}

function addItem(expense) {
    listBox.insertAdjacentHTML('beforeend',
        `<ul class="list-item" data-id="${expense.id}">
            <li>${new Intl.DateTimeFormat('ru', { month: '2-digit', day: 'numeric' }).format()}</p>
            <li>${expense.title}</li>
            <li>${expense.amount}</li>
            <li><img src="img/buttons/edit-regular.svg" alt="edit" class="edit"><img src="img/buttons/trash-alt-regular.svg" alt="delete" class="delete"></li>
        </ul>`)
}

function totalExpense() {
    let total = 0
    if (listArr.length > 0) {
        total = listArr.reduce((acc, cur) => {
            acc += cur.amount
            return acc
        }, 0)
    }
    infoExpense.textContent = total
    return total
}

function editExpense(el) {
    const expense = listArr.filter(item => item.id === +el.dataset.id)
    expenseTitle.value = expense[0].title
    expenseAmount.value = expense[0].amount
    deleteExpense(el)
}

function deleteExpense(el) {
    listBox.removeChild(el)
    listArr = listArr.filter(item => item.id !== +el.dataset.id)
    localStorage.setItem('expenses', JSON.stringify(listArr))
    showBalance()
}

document.querySelector('.budget-form').addEventListener('submit', ev => {
    ev.preventDefault()

    addBudget()
})

document.querySelector('.expense-form').addEventListener('submit', ev => {
    ev.preventDefault()

    addExpense()
})

listBox.addEventListener('click', ev => {
    const el = ev.target.parentElement.parentElement

    if (ev.target.classList.contains('edit')) {
        editExpense(el)
    } else if (ev.target.classList.contains('delete')) {
        deleteExpense(el)
    }
})


navigator.serviceWorker
    .register('./service-worker.js')
    .catch(er => {
        console.error(er)
    })

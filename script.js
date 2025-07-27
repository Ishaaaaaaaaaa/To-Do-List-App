let inputs = document.querySelector('input');
let btn = document.querySelector('.input-area button');
let taskList = document.getElementById('task-list');
let task = [];

let localstoragedata = localStorage.getItem("task array");

if (localstoragedata != null) {
    task = JSON.parse(localstoragedata);
    maketodo();
}

btn.addEventListener("click", function () {
    let query = inputs.value.trim();
    inputs.value = "";
    if (query === "") {
        alert("No value entered");
        return;
    }

    let taskObj = {
        id: Date.now(),
        text: query,
        date: new Date().toLocaleString(),
        status: "Active"
    };
    task.push(taskObj);
    localStorage.setItem("task array", JSON.stringify(task));
    maketodo();
});

function maketodo() {
    taskList.innerHTML = "";

    task.forEach(({ id, text, date, status }) => {
        let element = document.createElement('div');
        element.classList.add('todo');
        element.setAttribute('draggable', 'true');
        element.dataset.id = id;

        let statusClass = status === "Completed" ? "completed" : status === "Not Completed" ? "not-completed" : "";

        element.innerHTML = `
            <span class="task ${statusClass}" contenteditable="false">${text}</span>
            <span class="task-status">(${status})</span>
            <small>${date}</small>
            <button class='status-toggle'>Toggle</button>
            <button class='edit'>Edit</button>
            <span class="delete">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3
                    C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142
                    13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802
                    15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678
                    10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                </svg>
            </span>
        `;

        let delbtn = element.querySelector('.delete');
        let editbtn = element.querySelector('.edit');
        let taskText = element.querySelector('.task');
        let toggleBtn = element.querySelector('.status-toggle');

        delbtn.addEventListener("click", () => {
            task = task.filter(t => t.id !== id);
            localStorage.setItem("task array", JSON.stringify(task));
            maketodo();
        });

        editbtn.addEventListener("click", () => {
            if (editbtn.innerText === 'Edit') {
                taskText.setAttribute('contenteditable', 'true');
                taskText.focus();
                editbtn.innerText = 'Save';
            } else {
                let updatedText = taskText.innerText.trim();
                if (updatedText) {
                    task = task.map(t => t.id === id ? { ...t, text: updatedText } : t);
                    localStorage.setItem("task array", JSON.stringify(task));
                }
                taskText.setAttribute('contenteditable', 'false');
                editbtn.innerText = 'Edit';
                maketodo();
            }
        });

        toggleBtn.addEventListener("click", () => {
            task = task.map(t => {
                if (t.id === id) {
                    let newStatus =
                        t.status === "Active"
                            ? "Completed"
                            : t.status === "Completed"
                            ? "Not Completed"
                            : "Active";
                    return { ...t, status: newStatus };
                }
                return t;
            });
            localStorage.setItem("task array", JSON.stringify(task));
            maketodo();
        });

        addDragEvents(element);
        taskList.appendChild(element);
    });
}

function addDragEvents(item) {
    item.addEventListener("dragstart", () => {
        item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        const updatedOrder = Array.from(taskList.children).map(child => {
            const id = parseInt(child.dataset.id);
            return task.find(t => t.id === id);
        });
        task = updatedOrder;
        localStorage.setItem("task array", JSON.stringify(task));
    });
}

taskList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) {
        taskList.appendChild(dragging);
    } else {
        taskList.insertBefore(dragging, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const elements = [...container.querySelectorAll(".todo:not(.dragging)")];
    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


const toggleBtn = document.getElementById("theme-toggle");

function updateButtonText() {
    toggleBtn.textContent = document.body.classList.contains("dark-mode")
        ? "Switch to Light Mode"
        : "Switch to Dark Mode";
}

toggleBtn.addEventListener("mouseenter", () => {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    updateButtonText();
});

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
    updateButtonText();
});

let result = document.querySelector(".todo-result-div");
let user_input = document.getElementById("user_input");
let add_btn = document.querySelector("#add_btn");


let getLocal = localStorage.getItem("todos");
let checkLocal = getLocal ? JSON.parse(getLocal) : [];

const addTodo = () => {
    if (user_input.value == "") {
        Swal.fire({
            title: "Empty Todo",
            text: "Please Write some Todo Text",
            icon: "warning",
            timer: 800,
            showConfirmButton: false
        });
        return;
    }


    checkLocal.push(user_input.value);
    localStorage.setItem("todos", JSON.stringify(checkLocal));
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 800,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Todo Added"
    });
    setInterval(() => {
        window.location.href = window.location.href;
    }, 1000)
};

const createTodo = () => {
    let clutter = "";

    if (checkLocal.length === 0) {
        clutter = `
        <div class="task">
          <div class="text">
            <h1 class="text-[19px] font-semibold">No todos available. Add some tasks!</h1>
          </div>
        </div>
      `;
    } else {
        checkLocal.forEach((todo, i) => {
            clutter += `
          <div class="task">
            <div class="text">
              <h1 class="text-[19px] font-semibold">${i + 1}) ${todo}</h1>
            </div>
            <div class="icon w-[20%] h-full rounded-2xl flex justify-center items-center gap-4">
              <i id="editBtn" onclick="editTodo(${i})" class="bi bi-pencil-fill text-1xl "></i>
              <i onclick="deleteTodo(${i})" class="bi bi-trash-fill text-1xl"></i>
            </div>
          </div>
        `;
        });
    }

    result.innerHTML = clutter;
};

const deleteTodo = (index) => {
    checkLocal.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(checkLocal));
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 800,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Delete Todo"
    });
    setInterval(() => {
        window.location.href = window.location.href;
    }, 1000)
};


const editTodo = async (index) => {
    i = index;
    const todoItem = checkLocal[index];
    console.log(todoItem);
    const { value: formValues } = await Swal.fire({
        title: "Update Todo",
        html: `
          <input id="swal-input1" value="${todoItem}" class="swal2-input">
        `,
        focusConfirm: false,
        preConfirm: () => {
            let updateValue = document.getElementById("swal-input1").value;
            checkLocal[i] = updateValue;
            localStorage.setItem("todos", JSON.stringify(checkLocal));
        }
    });

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 800,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Update Todo"
    });
    setInterval(() => {
        window.location.href = window.location.href;
    }, 800)

};


// CRUD
createTodo();
add_btn.addEventListener("click", addTodo);
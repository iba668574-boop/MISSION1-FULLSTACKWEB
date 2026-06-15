function loadItems() {
    fetch("http://localhost:3000/items")
        .then(response => response.json())
        .then(data => {

            let list = document.getElementById("itemList");
            list.innerHTML = "";

            data.forEach(item => {
                let li = document.createElement("li");
                li.textContent = item.name;
                list.appendChild(li);
            });
        });
}
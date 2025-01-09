// Așteptăm încărcarea completă a paginii
document.addEventListener("DOMContentLoaded", () => {
    // Selectăm formularul și lista unde vor fi afișate rezultatele
    const form = document.querySelector(".AddForm");
    const addList = document.querySelector(".AddList ul"); // Creăm un <ul> în HTML pentru lista de elemente

    // Prevenim trimiterea formularului și tratăm datele
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Previne reîncărcarea paginii

        // Preluăm valorile din formular
        const title = document.getElementById("nume-film").value;
        const description = document.getElementById("descriere-film").value;
        const imageInput = document.getElementById("imagine-film");
        const link = document.getElementById("link-film").value;

        // Verificăm dacă titlul este completat
        if (!title) {
            alert("Te rog să introduci un titlu pentru film.");
            return;
        }

        // Creăm un element de listă (<li>) pentru itemul adăugat
        const listItem = document.createElement("li");
        listItem.style.border = "1px solid #ddd";
        listItem.style.padding = "10px";
        listItem.style.marginBottom = "10px";

        // Adăugăm titlul
        const newTitle = document.createElement("h3");
        newTitle.textContent = title;
        listItem.appendChild(newTitle);

        // Adăugăm descrierea
        if (description) {
            const newDescription = document.createElement("p");
            newDescription.textContent = description;
            listItem.appendChild(newDescription);
        }

        // Citim fișierul selectat din input-ul de tip "file" și îl afișăm ca imagine
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                const newImage = document.createElement("img");
                newImage.src = event.target.result; // Atribuim conținutul fișierului citit
                newImage.alt = title;
                newImage.style.maxWidth = "300px"; // Stilizare opțională
                newImage.style.display = "block";
                newImage.style.marginTop = "10px";
                listItem.appendChild(newImage); // Adăugăm imaginea în itemul listei
            };

            reader.readAsDataURL(file); // Citim fișierul selectat
        }

        // Adăugăm link-ul (dacă este completat)
        if (link) {
            const newLink = document.createElement("a");
            newLink.href = link;
            newLink.textContent = "Link către film";
            newLink.target = "_blank";
            newLink.style.display = "block";
            newLink.style.marginTop = "10px";
            listItem.appendChild(newLink);
        }

        // Adăugăm itemul creat în lista AddList
        addList.appendChild(listItem);

        // Resetăm formularul
        form.reset();
    });
});

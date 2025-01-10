function afiseazaDatele(event) {
    event.preventDefault(); // Previne trimiterea formularului și reîncărcarea paginii.

    // Salvăm titlul și descrierea în variabile.
    const title = document.getElementById("nume-film").value.trim();
    const description = document.getElementById("descriere-film").value.trim();

    if (!title || !description) {
        alert("Te rog să completezi toate câmpurile!");
        return;
    }

    // Adăugăm noul film în local storage.
    const films = JSON.parse(localStorage.getItem("films")) || [];
    films.push({ title, description });
    localStorage.setItem("films", JSON.stringify(films));

    // Actualizăm lista afișată.
    adaugaFilmPeEcran(title, description);

    // Resetăm formularul pentru a permite adăugarea unui nou element.
    event.target.reset();
}

function adaugaFilmPeEcran(title, description) {
    // Selectăm lista ordonată (ol) unde vom adăuga elementele.
    const ol = document.querySelector(".AddList ol");

    // Creăm elementele necesare.
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const a = document.createElement("a");
    const svg = document.createElement("svg");
    const div = document.createElement("div");

    // Adăugăm titlul și descrierea.
    h3.textContent = title;
    p.textContent = description;

    // Setăm atributele SVG și adăugăm conținutul din localStorage.
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.innerHTML = localStorage.getItem("svg");

    // Setăm atributele ancorei și adăugăm conținutul `Vezi filmul!`.
    a.setAttribute("href", "#");
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
    div.innerHTML = "Vezi filmul!";

    // Construim structura elementelor.
    a.appendChild(svg);
    a.appendChild(div);
    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(a);
    ol.appendChild(li);
}

window.onload = function () {
    // Salvăm SVG-ul în localStorage dacă nu există deja.
    if (!localStorage.getItem("svg")) {
        const svgElements = [
            { tag: "circle", attributes: { cx: "50", cy: "50", r: "40", fill: "#6A1E55" } },
            { tag: "rect", attributes: { x: "50", y: "86", width: "50", height: "4", fill: "#6A1E55" } },
            { tag: "circle", attributes: { cx: "31.6152", cy: "31.6152", r: "8", transform: "rotate(-45 31.6152 31.6152)", fill: "#25001A" } },
            { tag: "circle", attributes: { cx: "68.3848", cy: "68.3848", r: "8", transform: "rotate(-45 68.3848 68.3848)", fill: "#25001A" } },
            { tag: "circle", attributes: { cx: "68.3848", cy: "31.6152", r: "8", transform: "rotate(-45 68.3848 31.6152)", fill: "#25001A" } },
            { tag: "circle", attributes: { cx: "31.6152", cy: "68.3848", r: "8", transform: "rotate(-45 31.6152 68.3848)", fill: "#25001A" } },
            { tag: "circle", attributes: { cx: "50", cy: "50", r: "8", fill: "#25001A" } },
        ];
    
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("width", "100");
        svg.setAttribute("height", "100");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("fill", "none");
    
        svgElements.forEach(({ tag, attributes }) => {
            const element = document.createElementNS(svgNamespace, tag);
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
            svg.appendChild(element);
        });
    
        // Salvăm SVG-ul complet construit ca string.
        localStorage.setItem("svg", svg.outerHTML);
    }

    // Creăm lista ordonată dacă nu există.
    const addList = document.querySelector(".AddList");
    const ol = document.createElement("ol");
    addList.appendChild(ol);

    // Reafișăm elementele salvate în localStorage.
    const films = JSON.parse(localStorage.getItem("films")) || [];
    films.forEach(({ title, description }) => {
        adaugaFilmPeEcran(title, description);
    });

    // Adăugăm evenimentul de trimitere a formularului.
    document.querySelector(".AddForm").addEventListener("submit", afiseazaDatele);
};

function trimiteInformatiile(event) {
    const title = document.getElementById("nume-film").value.trim();
    const description = document.getElementsByTagName("textarea")[0].value.trim();
    const link = document.getElementById("link-film").value.trim() || "https://example.com";

    if (!title || !description) {
        alert("[RO] Te rog să completezi toate câmpurile!\n[EN] Please fill in all the fields!");
        return;
    }

    // Adaugam filmul in local storage
    const films = JSON.parse(localStorage.getItem("films")) || [];
    // Desi films e constanta, putem adauga setul in lista pentru ca nu modificam adresa acesteia
    films.push({ title, description, link });
    localStorage.setItem("films", JSON.stringify(films));

    afiseazaFilm(title, description, link);
    event.target.reset();
}

function afiseazaFilm(title, description, link) {
    const ol = document.querySelector(".AddList ol");

    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const a = document.createElement("a");
    const svgContainer = document.createElement("div");
    const div = document.createElement("div");

    // Adaugam informatiile
    h3.textContent = title;
    p.textContent = description;
    a.setAttribute("href", link);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
    div.innerHTML = "Vezi filmul!";

    // Construim structura elementelor.
    svgContainer.innerHTML = localStorage.getItem("svg");
    a.appendChild(svgContainer);
    a.appendChild(div);
    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(a);
    ol.appendChild(li);

    // Styling
    ol.style.padding = "0";
    ol.style.display = "flex";
    ol.style.flexWrap = "wrap";
    ol.style.justifyContent = "center";
    ol.style.alignItems = "flex-start";
    ol.style.gap = "1rem";

    li.style.display = "flex";
    li.style.flexDirection = "column";
    li.style.width = "18rem";
    li.style.height = "24rem";
    li.style.border = "1px solid #6A1E55";
    li.style.listStyle = "none";
    li.style.padding =  "2rem 1rem";

    a.style.marginTop = "auto";
}

function afiseazaFilmeRandom() {
    // Luam lista de filme din local storage
    const films = JSON.parse(localStorage.getItem("films")) || [];

    // Verificam sa avem cel putin doua filme
    if (films.length < 2) {
        alert("[RO] Trebuie să adaugi cel putin doua filme pentru a folosi aceasta functionalitate!\n[EN] You need to add at least two movies to use this feature!");
        return;
    }

    // Randomizarea
    const randomIndexes = [];
    while (randomIndexes.length < 2) {
        const randomIndex = Math.floor(Math.random() * films.length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }

    // Extragem filmele alese aleatoriu
    const randomFilms = randomIndexes.map(index => films[index]);
    const randomFilmsContainer = document.querySelector(".RandomFilms");

    // Daca am mai generat filme atunci le vom scoate pentru a face loc celor noi
    const existingList = randomFilmsContainer.querySelector("ol");
    if (existingList) {
        randomFilmsContainer.removeChild(existingList);
    }

    const ol = document.createElement("ol");
    randomFilms.forEach(({ title, description, link }) => {
        const li = document.createElement("li");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const a = document.createElement("a");
        const svgContainer = document.createElement("div");
        const div = document.createElement("div");

        h3.textContent = title;
        p.textContent = description;

        svgContainer.innerHTML = localStorage.getItem("svg");
        a.appendChild(svgContainer);
        a.appendChild(div);
        a.setAttribute("href", link);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
        div.innerHTML = "Vezi filmul!";

        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(a);
        ol.appendChild(li);

        // Styling
        ol.style.padding = "0";
        ol.style.display = "flex";
        ol.style.flexWrap = "wrap";
        ol.style.justifyContent = "center";
        ol.style.alignItems = "flex-start";
        ol.style.gap = "1rem";

        li.style.display = "flex";
        li.style.flexDirection = "column";
        li.style.width = "18rem";
        li.style.height = "24rem";
        li.style.border = "1px solid #6A1E55";
        li.style.listStyle = "none";
        li.style.padding =  "2rem 1rem";

        a.style.marginTop = "auto";
        p.style.margin = "0";
    });

    randomFilmsContainer.appendChild(ol);
}

function keyDownListener(event) {
    switch(event.key) {
        case 'r':
            afiseazaFilmeRandom();
        break;
    }
}

window.onload = function () {
    // Salvam SVG in local storage
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
        localStorage.setItem("svg", svg.outerHTML);
    }

    // Adaugam ol in .AddList
    const addList = document.getElementsByClassName("AddList")[0];
    const ol = document.createElement("ol");
    addList.appendChild(ol);

    // Reafisam filmele
    const films = JSON.parse(localStorage.getItem("films")) || [];
    films.forEach(({ title, description, link }) => {
        afiseazaFilm(title, description, link);
    });

    // Trimitem formularul prin apasarea butonului Trimite informatiile
    document.querySelector(".AddForm").addEventListener("submit", trimiteInformatiile);

    // Daca apasam o tasta (r) afisam doua filme random
    document.body.addEventListener('keydown', keyDownListener);
};
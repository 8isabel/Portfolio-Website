const outcome = document.getElementById("outcome");
const input = document.getElementById("input");

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const command = input.value;
        commands(command);
        input.value = "";
    }
});

function textoutput(text) {
    const p = document.createElement("p");
    p.textContent = "> " + text;
    outcome.appendChild(p);
    outcome.scrollTop = outcome.scrollHeight;
}

function commands(command) {
    switch(command.toLowerCase()) {
        case "help":
            textoutput(
                "Commands: help, about, skills, projects, clear"
            );
            break;
        case "about":
            textoutput(
                "Software Development student at GLR Rotterdam"
            );
            break;
        case "skills":
            textoutput(
                "HTML | CSS | JavaScript | C# | SQL | Bootstrap"
            );
            break;
        case "projects":
            textoutput(
                "Opening projects..."
            );
            break;
        case "clear":
            outcome.innerHTML = "";
            break;
        case "hallo":
            textoutput(
                "Hallo! Leuk dat je mijn portfolio bezoekt."
            );
            break;
        default:
            textoutput(
                "Command not found. Type help."
            );
    }
}

const terminalToggle = document.getElementById("terminalToggle");
const terminalPopup = document.getElementById("terminalPopup");
const terminalClose = document.getElementById("terminalClose");
const terminalInput = document.getElementById("input");

terminalToggle.addEventListener("click", () => {

    terminalPopup.classList.add("active");

    setTimeout(() => {
        terminalInput.focus();
    }, 300);

});

terminalClose.addEventListener("click", () => {

    terminalPopup.classList.remove("active");

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        terminalPopup.classList.remove("active");
    }

});
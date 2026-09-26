const ideaForm = document.getElementById("ideaForm");
const ideasContainer = document.getElementById("ideasContainer");
const formMessage = document.getElementById("formMessage");

function loadIdeas() {
    if (!ideasContainer) return;

    const ideas = JSON.parse(localStorage.getItem("isabelIdeas")) || [];
    ideasContainer.innerHTML = "";

    if (ideas.length === 0) {
        ideasContainer.innerHTML = `
            <div class="idea-card">
                <h3>No ideas yet.</h3>
                <p class="idea-description">Be the first person to suggest something I should build.</p>
            </div>
        `;
        return;
    }

    [...ideas].reverse().forEach((idea) => {
        const card = document.createElement("article");
        card.className = "idea-card";
        card.innerHTML = `
            <div class="idea-card-header">
                <h3>${escapeHTML(idea.title)}</h3>
                <span class="idea-category">${escapeHTML(idea.category)}</span>
            </div>
            <p class="idea-description">${escapeHTML(idea.description)}</p>
            <div class="idea-meta">
                <span>${escapeHTML(idea.author || "Anonymous")}</span>
                <span>${formatDate(idea.createdAt)}</span>
            </div>
            ${idea.reply ? `
                <div class="reply-box">
                    <div class="reply-author">Isabel.dev</div>
                    <div class="reply-message">${escapeHTML(idea.reply)}</div>
                </div>
            ` : ""}
        `;
        ideasContainer.appendChild(card);
    });
}

if (ideaForm) {
    ideaForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("ideaTitle").value.trim();
        const category = document.getElementById("ideaCategory").value;
        const description = document.getElementById("ideaDescription").value.trim();
        const author = document.getElementById("ideaName").value.trim();
        const email = document.getElementById("ideaEmail").value.trim();

        if (!title || !category || !description) return;

        const newIdea = {
            id: crypto.randomUUID(),
            title,
            category,
            description,
            author: author || "Anonymous",
            email: email || null,
            createdAt: new Date().toISOString(),
            reply: null
        };

        const ideas = JSON.parse(localStorage.getItem("isabelIdeas")) || [];
        ideas.push(newIdea);
        localStorage.setItem("isabelIdeas", JSON.stringify(ideas));

        ideaForm.reset();

        if (formMessage) {
            formMessage.textContent = "> Idea submitted successfully ✓";
            setTimeout(() => { formMessage.textContent = ""; }, 4000);
        }

        loadIdeas();
    });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

loadIdeas();

function getReviews() {
    const raw = localStorage.getItem("reviews");
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);

        if (Array.isArray(parsed)) return parsed;
        if (parsed && typeof parsed === "object") return [parsed];

        return [];
    } catch (err) {
        console.warn("JSON inválido no localStorage, resetando.", err);
        return [];
    }
}

function saveReviews(arr) {
    localStorage.setItem("reviews", JSON.stringify(arr));
}

function escapeHtml(str) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function renderTable() {
    const reviews = getReviews();
    const tableBody = document.getElementById("tbody");

    let rows = "";
    for (const review of reviews) {
        rows += `
            <tr>
                <td>${escapeHtml(String(review.name || ""))}</td>
                <td>${escapeHtml(String(review.grade || ""))}</td>
                <td>${escapeHtml(String(review.obs || ""))}</td>
            </tr>`;
    }

    tableBody.innerHTML = rows;
}

function clearForm() {
    document.getElementById("reviewForm").reset();
}

function newReview() {
    const items = getReviews();

    const newName = document.getElementById("nome").value;
    const newObs = document.getElementById("comentario").value;
    const newGrade = document.querySelector('input[name="rate"]:checked')?.value || 5;

    const newItem = {
        name: newName,
        grade: newGrade,
        obs: newObs
    };

    items.push(newItem);
    saveReviews(items);

    clearForm();

    document.getElementById("overlay").classList.remove("show");
    renderTable();

    console.log("Adicionado:", newItem);
}

function clearReviews() {
    localStorage.removeItem("reviews");
    renderTable();
}

document.addEventListener("DOMContentLoaded", () => {
    renderTable();

    const overlay = document.getElementById("overlay");
    const form = document.getElementById("reviewForm");
    const openBtn = document.getElementById("open");
    const closeBtn = document.getElementById("close");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        newReview();
    });

    openBtn.onclick = () => overlay.classList.add("show");

    closeBtn.onclick = () => {
        clearForm();
        overlay.classList.remove("show");
    };

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            clearForm();
            overlay.classList.remove("show");
        }
    };
});

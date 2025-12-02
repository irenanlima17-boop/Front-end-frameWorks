// --- helper: sempre retorna um array seguro ---
function getReviews() {
    const raw = localStorage.getItem("reviews");
    if (!raw) return []; // nada salvo ainda

    try {
        const parsed = JSON.parse(raw);

        // se já for array, retorna direto
        if (Array.isArray(parsed)) return parsed;

        // se for um objeto único, converte para array [obj]
        if (parsed && typeof parsed === "object") return [parsed];

        // qualquer outro tipo (string, number) -> descarta
        return [];
    } catch (err) {
        console.warn("Conteúdo 'reviews' inválido no localStorage. Ignorando e resetando.", err);
        return [];
    }
}

// --- helper: grava array de reviews ---
function saveReviews(arr) {
    localStorage.setItem("reviews", JSON.stringify(arr));
}

// --- renderiza a tabela com os reviews atuais ---
function renderTable() {
    const reviews = getReviews();
    const tableBody = document.getElementById("tbody");
    let rows = "";

    for (const review of reviews) {
        rows += `
      <tr>
        <td>${escapeHtml(String(review.name || ""))}</td>
        <td>R$ ${escapeHtml(String(review.value || ""))}</td>
        <td>${escapeHtml(String(review.grade || ""))}</td>
        <td>${escapeHtml(String(review.obs || ""))}</td>
      </tr>
    `;
    }

    tableBody.innerHTML = rows;
}

// --- função para evitar injeção de HTML acidental nos campos ---
function escapeHtml(str) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

// --- adiciona um novo review (padrão) e atualiza a tabela ---
function newReview() {
    const lastItens = getReviews();

    const newItem = {
        name: "Teste name",
        value: 5,
        grade: 5,
        obs: ""
    };

    lastItens.push(newItem);
    saveReviews(lastItens);

    console.log("Novo review adicionado:", newItem);

    // atualiza a tabela na tela
    renderTable();
}

// --- inicializa a tabela ao carregar o script ---
document.addEventListener("DOMContentLoaded", renderTable);

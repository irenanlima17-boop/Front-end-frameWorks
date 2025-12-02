let reviews = localStorage.getItem("reviews")
if (reviews === null)
    localStorage.setItem("reviews", JSON.stringify([{ name: "Teste name", value: 5, grade: 5, obs: "" }]))

const tableBody = document.getElementById("tbody")
let rows = ""
for (const review of JSON.parse(reviews)) {
    rows += `<tr>
                <td>${review.name}</td>
                <td>R$ ${review.value}</td>
                <td>${review.grade}</td>
                <td>${review.obs}</td>
            </tr>`
}
tableBody.innerHTML = rows
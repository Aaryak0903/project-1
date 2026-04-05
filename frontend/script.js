const API = "/api/complaints";

async function submitComplaint() {
    const name = document.getElementById("name").value;
    const issue = document.getElementById("issue").value;
    const category = document.getElementById("category").value;

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, issue, category })
    });

    alert("Complaint Submitted ✅");
    loadComplaints();
}

async function loadComplaints() {
    const res = await fetch(API);
    const data = await res.json();

    const container = document.getElementById("complaints");

    if (!container) return;

    container.innerHTML = data.map(c => `
        <div class="card">
            <h3>${c.name}</h3>
            <p>${c.issue}</p>
            <small>📂 ${c.category}</small>
            <div class="status ${c.status === "Pending" ? "pending" : "resolved"}">
                ${c.status}
            </div>
            ${window.location.pathname.includes("admin") 
                ? `<button onclick="resolve('${c._id}')">Resolve</button>` 
                : ""}
        </div>
    `).join("");
}

async function resolve(id) {
    await fetch(API + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Resolved" })
    });

    loadComplaints();
}

loadComplaints();
const express = require("express");
const users = require("./MOCK_DATA.json");
const { json } = require("body-parser");

const app = express();
const port = 8000;

// routes
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((users) => `
            <li>${users.first_name} ${users.last_name}</li>
            `).join("")}
    </ul>
    `;
    res.send(html)
})

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        // edit user
        return res.json({ status: "pending" })
    })
    .delete((req, res) => {
        // delete user
        return res.json({ status: "pending" })
    })

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })

app.post("/api/user", (req, res) => {
    // create new user
    return res.json({ status: "pending" });
})

// app.patch("/api/user/:id", (req, res) => {
//     // edit the user
//     return res.json({ status: "pending" });
// })

// app.delete("/api/user/:id", (req, res) => {
//     // delete the user
//     return res.json({ status: "pending" });
// })

app.listen(port, () => console.log(`SERVER started at Port:${port}`));
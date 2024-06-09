const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const { json } = require("body-parser");

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));

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

// app.route('/api/users/:id')
//     .get((req, res) => {
//         const id = Number(req.params.id);
//         const user = users.find((user) => user.id === id);
//         return res.json(user);
//     })
//     .patch((req, res) => {
//         // edit user
//         return res.json({ status: "pending" })
//     })
//     .delete((req, res) => {
//         // delete user
//         return res.json({ status: "pending" })
//     })

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    })
})

app.patch("/api/users/:id", (req, res) => {
    // edit the user
    return res.json({ status: "pending" });
})

app.delete("/api/users/:id", (req, res) => {
    // delete the user
    return res.json({ status: "pending" });
})

app.listen(port, () => console.log(`SERVER started at Port:${port}`));
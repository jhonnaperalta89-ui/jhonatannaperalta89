const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(helmet()); 
app.use(express.json());

const DATABASE = {
"10500432-1": { pass: "A*1bcde", nombre: "Diego" },

"13888999-k": { pass: "F!9ghij", nombre: "Carla" },

"15666777-2": { pass: "M#2klmn", nombre: "Andrés" },

"18444555-8": { pass: "T$3pqrs", nombre: "Beatriz" },

"20111222-3": { pass: "X&4tuvw", nombre: "Roberto" }

}; 
app.post('/auth', (req, res) => {
    const { rut, pass } = req.body;
    const user = DATABASE[rut];

    if (user && user.pass === pass) {
        return res.status(200).json({ success: true, nombre: user.nombre });
    }
    res.status(401).json({ success: false });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
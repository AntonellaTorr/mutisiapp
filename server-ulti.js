const Joi = require("joi");
const express = require("express");
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors()); 


const path = require('path');

// Servir la carpeta 'assets' como archivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets')));


const cervezas = [
    { codigo: 1, nombre: "pilsen", amargor: "Bajo", graduacion: 3.9, image:  '/assets/pilsen.jpeg', detalle: 'Una cerveza rubia, suave y muy liviana. Es un sabor ideal para dejar a todes felices en una cena familiar porque es muy rica y muy facil de llevar'},
    { codigo: 2, nombre: "coco scotish", amargor: "Bajo", graduacion: 4.0, image: '/assets/cocoscottish.jpeg', detalle: 'Es una cerveza de un rojo intenso, cuerpo, con aromas dulces de las malta y un sutil y agradable aroma a coco. \n\n Sí, leíste bien, tostamos coco y lo usamos en la cerveza que le dejó un sabor tan pero tan agradable que esperamos que sea tu cerveza favorita, te va a encantar!'},
    { codigo: 3, nombre: "hoppy pilsen", amargor: "Bajo", graduacion: 4.8, image:  '/assets/hoppypilsen.jpeg', detalle: ' Porque a veces la tradicional PILSEN no es suficiente, elaboramos una cerveza similar pero con más lupulo, para que cada trago sientas un rico aroma a frutas tropicales. \n\n  Nuestra HOPPY PILSEN es una cerveza rubia y muy suave. Ideal para quienes buscan una opción refrescante con poco amargor y muy aromática.' },
    { codigo: 4, nombre: "ipa argenta", amargor: "Medio", graduacion: 5.6, image: '/assets/ipaargenta.jpeg', detalle: 'Es un estilo que nació en nuestro pais, allá por el 2013, buscando recrear el estilo inglés de la IPA pero utilizando las materias primas que se tenian al alcance (mi país, mi país). \n\n Es para vos si estas buscando una cerveza rubia, amarga, lupulada y por sobre todo, BIEN ARGENTA'},
    { codigo: 5, nombre: "ipa session", amargor: "Bajo", graduacion: 4.3,image: '/assets/ipasession.jpeg',  detalle: 'IPA SESSION es una cerveza simple, sin mucho que decir en apariencia, pero dificil de lograr que sea tan apetitosa. \n\n Se deja tomar con facilidad y te invita a preguntar: me das otra?' },
    { codigo: 6, nombre: "old ale", amargor: "Alto", graduacion: 9.0, image: '/assets/oldale.jpeg', detalle: 'Es una cerveza de un rojo intenso, cuerpo, con aromas dulces de las malta y un sutil y agradable aroma a coco. \n\n Sí, leíste bien, tostamos coco y lo usamos en la cerveza que le dejó un sabor tan pero tan agradable que esperamos que sea tu cerveza favorita, te va a encantar!' }
];

// Método GET para obtener todas las cervezas con paginación
app.get("/api/cervezas", (req, res) => {
    console.log("en el get");
    const cantidadDeseada = parseInt(req.query.cantidad);
    const inicio = parseInt(req.query.from) || 0;

    if (isNaN(cantidadDeseada) || cantidadDeseada <= 0) {
        return res.status(400).send("La cantidad debe ser un número entero positivo.");
    }

    if (inicio >= cervezas.length) {
        return res.status(404).send("No hay suficientes elementos a partir del índice proporcionado.");
    }

    // Limitar la cantidad de elementos a la cantidad deseada o al máximo disponible
    const cantidadReal = Math.min(cantidadDeseada, cervezas.length - inicio);
    const cervezasLimitadas = cervezas.slice(inicio, inicio + cantidadReal);
    res.status(200).send(cervezasLimitadas);
});

// Método GET para obtener una cerveza por su código
app.get("/api/cervezas/:codigo", (req, res) => {
    const cerveza = cervezas.find((c) => c.codigo === parseInt(req.params.codigo));
    if (!cerveza) {
        return res.status(404).send("La cerveza con el código proporcionado no se encontró");
    }
    res.send(cerveza);
});

// Método POST para agregar una nueva cerveza
app.post("/api/cervezas", (req, res) => {
    console.log("en el post");
    const { error } = validarCerveza(req.body);
    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0].message);
    }

    const cerveza = {
        codigo: cervezas.length + 1,
        nombre: req.body.nombre,
        amargor: req.body.amargor,
        graduacion: req.body.graduacion,
        image: 'assets/nuevaa.jpg', // Imagen por defecto
        detalle: req.body.detalle || '' || null, // Detalle opcional
    };
    validarCerveza(cerveza);
    cervezas.push(cerveza);

    res.send(cerveza);
});

// Método PUT para actualizar una cerveza existente
app.put("/api/cervezas/:codigo", (req, res) => {
    // Buscar la cerveza por su código
    const cerveza = cervezas.find((c) => c.codigo === parseInt(req.params.codigo));
    if (!cerveza) {
        return res.status(404).send("La cerveza con el código proporcionado no se encontró");
    }

    // Validar los datos de actualización
    const { error } = validarCerveza(req.body);
    
    if (error) {
      
        return res.status(400).send(error.details[0].message);
    }

    // Actualizar la cerveza
    cerveza.nombre = req.body.nombre;
    cerveza.amargor = req.body.amargor;
    cerveza.graduacion = req.body.graduacion;

    // Enviar la cerveza actualizada como respuesta
    res.send(cerveza);
});

// Validación de cerveza usando Joi
function validarCerveza(cerveza) {

    const schema = Joi.object({
        nombre: Joi.string().min(3).required(),
        amargor: Joi.string().valid('Suave', 'Bajo', 'Medio').required(),
        graduacion: Joi.number().required(), 
        image: Joi.string().optional(), // Ahora opcional
        detalle: Joi.string().optional().allow(null), // Ahora opcional
    });
    return schema.validate(cerveza);
}

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, () => console.log("En el puerto", puerto));
import { router } from "../server.js";
import "./sync.js";
import { operations } from "./operations.js";

router
.route("/languages")
.get(async (_, res) => {
    const result = await operations.getLanguages();
    res.status(200).json(result);
});

router.route("/languages/:id")
.get(async function getOrder(req, res) {
    const id = req.params.id;
    var result = await operations.getLanguage(id);
    res.status(200).json(result);
});

router.route("/languages")
.post(async ({ body }, res) => {
    try {
        await operations.createLanguage(body);
        res.status(200).json("Success!")
    } catch (err) {
        console.error("Error creating language.");
    }
});

router.route("/languages/:id")
.put(async ({ body }, res) => {
    try {
        await operations.update(body);
        res.status(200).json("Success!")
    } catch (err) {
        console.error("Error updating language.");
    }
});



router
.route("/categories")
.get(async (_, res) => {
    const result = await operations.getCategories();
    res.status(200).json(result);
});

router
.route("/countries")
.get(async (_, res) => {
    const result = await operations.getCountries();
    res.status(200).json(result);
});

router
.route("/authors")
.get(async (_, res) => {
    const result = await operations.getAuthors();
    res.status(200).json(result);
});

router
.route("/quotes")
.get(async (_, res) => {
    const result = await operations.getQuotes();
    res.status(200).json(result);
});
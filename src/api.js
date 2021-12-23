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
.post(async function createLanguage(req, res)  {
    try {
        await operations.createLanguage(req.body);
        res.status(201).json("Success!")
    } catch (err) {
        console.error(req.statusMessage);
    }
});

router.route("/languages/:id")
.put(async ({ body, params: {id}}, res) => {
    try {
        await operations.updateLanguage(id, body);
        res.status(200).json("Success!")
    } catch (err) {
        console.error(err);
    }
});

router.route("/languages/:id")
.delete(async ({ params: { id }}, res) => {
    try {
        await operations.deleteLanguage(id);
        res.status(200).json(`Success! Deleted language with id ${id}!`);
    } catch (err) {
        console.error(err);
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

router
.route("/quotes/:id")
.get(async ({params: {id}}, res) => {
    const result = await operations.getQuote(id);
    res.status(200).json(result);
});

router
.route("/quotes")
.post(async ({body}, res) => {
    try {
        await operations.createQuote(body);
        res.status(200).json("Success!");
    } catch(err) {
        console.log(err);
    }
});

router
.route("/quotes/:id")
.put(async ({body, params: {id}}, res) => {
    await operations.updateQuote(id, body);
    res.status(200).json("Success!");
});

router
.route("/quotes/:id")
.delete(async ({params: {id}}, res) => {
    await operations.deleteQuote(id);
    res.status(200).json("Deleted quote");
});
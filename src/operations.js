import { Quotes, Authors, Categories, Countries, Languages } from "./sync.js";
import seq from "sequelize";

async function sequelizeAuth(sequelizeConnection) {
    try {
      await sequelizeConnection.authenticate();
      console.log("Sequelize has succesfully connected to the database");
    } catch (err) {
      throw err;
    }
}
  
async function sequelizeSync(sequelizeConnection) {
    try {
      await sequelizeConnection.sync({ force: true, alter: true });
      console.log("Sync complete!");
    } catch (err) {
      throw err;
    }
}

async function executeInitialDatabasePopulation() {
    // Seeding Categories
    await Categories.create({
        name: "Biblical",
    });
    await Categories.create({
        name: "Historical",
    });
    await Categories.create({
        name: "Self-development",
    });

    // Seeding Countries
    await Countries.create({
        name: "United States",
        code: "US"
    });
    await Countries.create({
        name: "France",
        code: "FR"
    });
    await Countries.create({
        name: "Germany",
        code: "DE"
    });
    await Countries.create({
        name: "Romania",
        code: "RO"
    });   

    // Seeding Languages
    await Languages.create({
        name: "British English",
        code: "en-EN"
    });
    await Languages.create({
        name: "American English",
        code: "en-US"
    });
    await Languages.create({
        name: "French",
        code: "fr-FR"
    });
    await Languages.create({
        name: "Romanian",
        code: "ro-RO"
    });

    // Seeding Authors
    await Authors.create({
        name: "Nikos Kazantzakis",
        countryId: 1
    });
    await Authors.create({
        name: "Maria Stepanova",
        countryId: 2
    });
    await Authors.create({
        name: "Gabriel Liiceanu",
        countryId: 3
    });
    await Authors.create({
        name: "Robert Greene",
        countryId: 4
    });
    await Authors.create({
        name: "Lena Constante",
        countryId: 2
    });

    // Seeding Quotes
    await Quotes.create({
        key: "NELMAN_GLORY",
        value: "The greatest glory in living lies not in never falling, but in rising every time we fall",
        authorId: 1,
        categoryId: 1,
        languageId: 1
    });
    await Quotes.create({
        key: "WALDIS_DOING",
        value: "The way to get started is to quit talking and begin doing.",
        authorId: 2,
        categoryId: 2,
        languageId: 2 
    });
    await Quotes.create({
        key: "STJOB_TIME",
        value: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking",
        authorId: 3,
        categoryId: 3,
        languageId: 3 
    });
    await Quotes.create({
        key: "ELROS_LIFE",
        value: "If life were predictable it would cease to be life, and be without flavor",
        authorId: 4,
        categoryId: 1,
        languageId: 4 
    });
}

async function initSequelize(sequelizeConnection) {
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
    await executeInitialDatabasePopulation();
}

/* WRAPPER */
async function execAsyncRequest(asyncRequest) {
    try {
        return await asyncRequest();
    } catch (err) {
        throw err;
    }
}
/* WRAPPER */

async function getLanguages() 
{
    return await execAsyncRequest(
        async function retrieveLanguages() {
            return await Languages.findAll();
        }
    );
}

async function getLanguage(id) 
{
    return await execAsyncRequest(
        async function retrieveLanguage() {
            return await Languages.findByPk(id);
        }
    );
}

async function createLanguage(language)
{
    return await execAsyncRequest(
        async function createLanguage() {
            return await Languages.create({
                name: language.name
            });
        }
    );
}

async function updateLanguage(id, language)
{
    return await execAsyncRequest(
        async function updateLanguage() {
            const lang = await Languages.findByPk(id);
            if (lang) {
                await lang.update({
                    name: language.name
                });
            }
        }
    );
}

async function deleteLanguage(id)
{
    return await execAsyncRequest(
        async function deleteLanguage() {
            const lang = await Languages.findByPk(id);
            if (lang) {
                await lang.destroy();
            }
        }
    );
}

async function getCategories()
{
    return await execAsyncRequest(
        async function retrieveCategories() {
            return await Categories.findAll();
        }
    );
}

async function getCountries()
{
    return await execAsyncRequest(
        async function retrieveCountries() {
            return await Countries.findAll();
        }
    );
}

async function getAuthors()
{
    return await execAsyncRequest(
        async function retrieveAuthors() {
            return await Authors.findAll();
        }
    );
}

async function getQuotes()
{
    return await execAsyncRequest(
        async function retrieveQuotes() {
            return await Quotes.findAll();
        }
    );
}

async function getQuote(id)
{
    return await execAsyncRequest(
        async function retrieveQuote() {
            return await Quotes.findByPk(id);
        }
    );
}

async function createQuote(quote)
{
    return await execAsyncRequest(
        async function createQuote() {
            await Quotes.create({
                key: quote.key,
                value: quote.value,
                authorId: quote.AuthorId,
                categoryId: quote.categoryId,
                languageId: quote.languageId
            })
        }
    );
}

async function updateQuote(id, quote) 
{
    return await execAsyncRequest(
        async function updateQuote() {
            const record = await Quotes.findByPk(id);
            if (!record) {
                return false;
            }

            await record.update({
                key: quote.key,
                value: quote.value,
                authorId: quote.AuthorId,
                categoryId: quote.categoryId,
                languageId: quote.languageId
            })
        }
    );
}

async function deleteQuote(id)
{
    return await execAsyncRequest(
        async function deleteQuote() {
            const record = Quotes.findByPk(id);
            if (!record) {
                return false;
            }

            (await record).destroy();
        }
    );
}

export const operations = {
    init: initSequelize,
    getLanguages: getLanguages,
    getLanguage: getLanguage,
    createLanguage: createLanguage,
    updateLanguage: updateLanguage,
    deleteLanguage: deleteLanguage,
    getCountries: getCountries,
    getCategories: getCategories,
    getAuthors: getAuthors,
    getQuotes: getQuotes,
    getQuote: getQuote,
    createQuote: createQuote,
    updateQuote: updateQuote,
    deleteQuote: deleteQuote
};
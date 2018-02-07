const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(`${__dirname }/views/partials`);
app.set('view engine', 'hbs');

// Middleware
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', `${log }\n`, (err) => {
        if (err) {
            console.log('Erros appending server.log file');
        }
    });
    next();
});

// Uncomment in case to activate maintenance view
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));

// Helper - You can create functions to access it globally
hbs.registerHelper('currentYear', () => new Date().getFullYear());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home Page!!!!!',
        text: 'This is a text of home page!',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page',
    });
});

app.listen(port, () => {
    console.log(`App started at port ${port}`);
});

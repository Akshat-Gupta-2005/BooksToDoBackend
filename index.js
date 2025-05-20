const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/api/books', (req, res) => {
    fs.readFile('./data/books.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }
        const books = JSON.parse(data);
        res.json(books);
    });
});

app.post('/api/books', (req, res) => {
    const newBook = req.body;
    fs.readFile('./data/books.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }
        const books = JSON.parse(data);
        books.push(newBook);
        fs.writeFile('./data/books.json', JSON.stringify(books, null, 4), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing file');
                return;
            }
            res.status(201).json(newBook);
        });
    });
});

app.get('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    fs.readFile('./data/books.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }
        const books = JSON.parse(data);
        const book = books.find(b => b.id === bookId);
        if (!book) {
            res.status(404).send('Book not found');
            return;
        }
        res.json(book);
    });
});


app.delete('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    fs.readFile('./data/books.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }
        let books = JSON.parse(data);
        books = books.filter(b => b.id !== bookId);
        fs.writeFile('./data/books.json', JSON.stringify(books, null, 4), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing file');
                return;
            }
            res.status(204).send();
        });
    });
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
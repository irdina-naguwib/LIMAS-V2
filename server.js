const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies from requests
app.use(express.json());

// API to get all borrowed items
app.get('/api/borrowed-items', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'borrowed_items.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading borrowed_items.json' });
        }

        res.json(JSON.parse(data)); // Send the borrowed items as a JSON response
    });
});

app.post('/api/borrowed-items/update', (req, res) => {
    console.log('Received update request for:', req.body);
    const updatedItem = req.body;
    const filePath = path.join(__dirname, 'data', 'borrowed_items.json');

    // Read the existing data from borrowed_items.json
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Error reading borrowed_items.json' });
        }

        let borrowedItems;
        try {
            borrowedItems = JSON.parse(data);
        } catch (err) {
            console.error('Error parsing JSON data:', err);
            return res.status(500).json({ error: 'Error parsing borrowed_items.json' });
        }

        // Find the index of the item to update
        const itemIndex = borrowedItems.borrowed_items.findIndex(item =>
            item.butiran === updatedItem.butiran && item.tarikh_pinjam === updatedItem.tarikh_pinjam
        );

        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Update the item at the found index
        borrowedItems.borrowed_items[itemIndex] = updatedItem;

        // Write the updated data back to borrowed_items.json
        fs.writeFile(filePath, JSON.stringify(borrowedItems, null, 2), (err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
                return res.status(500).json({ error: 'Error writing to borrowed_items.json' });
            }

            res.json({ message: 'Borrow item updated successfully' });
        });
    });
});

// API to add a new borrowed item
app.post('/api/borrowed-items/', (req, res) => {
    const newItem = req.body;
    const filePath = path.join(__dirname, 'data', 'borrowed_items.json');

    // Read the existing data from borrowed_items.json
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading borrowed_items.json' });
        }

        const borrowedItems = JSON.parse(data);
        borrowedItems.borrowed_items.push(newItem); // Add the new item

        // Write the updated data back to borrowed_items.json
        fs.writeFile(filePath, JSON.stringify(borrowedItems, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing to borrowed_items.json' });
            }

            res.json({ message: 'Borrow request submitted successfully' });
        });
    });
});

// Serve static files from the current directory and assets folder
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'assets')));

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

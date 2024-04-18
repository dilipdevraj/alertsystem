// // Initiate the servering of the application

// const express = require('express');
// const mysql = require('mysql2');
// const app = express();
// //// Allow requests from localhost

// // const cors = require('cors');
// // app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });



// //

// app.get('/', (req, res) => {
//     res.send('Hello World!8484574574');
// }   );

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '00000000',
//     database: 'Driver_Info'
// }   );

// // connection.connect((err) => {const express = require('express');
// //     if (err) {
// //         console.log('DB se nahi ho raha connection');
// //         // console.log(err);
// //         return;
// //     }
// //     console.log('Connected to DB');
// // }  );
// connection.query('SELECT * FROM driversV4', (err, rows) => { //updated V3
//     console.log(rows);
// }  );



// app.get('/drivers', (req, res) => {
//     connection.query('SELECT * FROM driversV4', (err, rows) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         res.send(rows);
//     }  );
// }  );
// //
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// }   );


//new code
const express = require('express');
const mysql = require('mysql2');
const app = express();

// Allow requests from localhost
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '00000000',
    database: 'Driver_Info'
});

// Function to update rankings based on violations using merge sort
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].violations <= right[rightIndex].violations) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Function to update rankings based on violations
function updateRankings() {
    connection.query('SELECT * FROM driversV4', (error, results) => {
        if (error) throw error;

        const sortedDrivers = mergeSort(results);

        let rank = 0;
        let prevViolations = -1;

        sortedDrivers.forEach((driver) => {
            const driverId = driver.id;
            const violations = driver.violations;

            if (violations !== prevViolations) {
                rank++;
                prevViolations = violations;
            }

            connection.query('UPDATE driversV4 SET ranking = ? WHERE id = ?', [rank, driverId], (error) => {
                if (error) throw error;
                      
            });
        });
        console.log('new rankings updated');
    });
}
//rating open
function updateRatings() {
    connection.query('SELECT id, violations FROM driversV4', (error, results) => {
        if (error) throw error;

        results.forEach((driver) => {
            const driverId = driver.id;
            const violations = driver.violations;

            let rating;

            if (violations < 10) {
                rating = 10;
            } else if (violations < 20) {
                rating = 9;
            } else if (violations < 30) {
                rating = 8;
            } else if (violations < 40) {
                rating = 7;
            } else if (violations < 50) {
                rating = 6;
            } else if (violations < 60) {
                rating = 5;
            } else if (violations < 70) {
                rating = 4;
            } else if (violations < 80) {
                rating = 3;
            } else if (violations < 90) {
                rating = 2;
            } else {
                rating = 1;
            }

            connection.query('UPDATE driversV4 SET rating = ? WHERE id = ?', [rating, driverId], (error) => {
                if (error) throw error;
                // console.log(`Updated rating for driver with id ${driverId} to ${rating}`);
            });
        });
    });
}


//rating close

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);

    // Update rankings based on violations when the server starts
    updateRankings();
    //rate
    updateRatings();
    //rate

    // Update rankings every hour (3600000 milliseconds)
    setInterval(updateRankings, 1000); // Adjust the interval as needed
});
connection.query('SELECT * FROM driversV4', (err, rows) => { //updated V3
    console.log(rows);
}  );

// Route to fetch all drivers
app.get('/drivers', (req, res) => {
    connection.query('SELECT * FROM driversV4', (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    });
});

// Define the port the server will listen on
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

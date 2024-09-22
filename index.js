var http = require("http");
var employees = require("./Employee"); // Import employee data

console.log("Lab 03 - NodeJs");

const port = process.env.PORT || 8081;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: http.STATUS_CODES[405] }));
        return;
    }

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end("<h1>Welcome to Lab Exercise 03</h1>");
    } else if (req.url === '/employee') {
        res.end(JSON.stringify(employees));
    } else if (req.url === '/employee/names') {
        const names = employees.map(emp => `${emp.firstName} ${emp.lastName}`).sort();
        res.end(JSON.stringify(names));
    } else if (req.url === '/employee/totalsalary') {
        const totalSalary = employees.reduce((sum, emp) => sum + emp.Salary, 0);
        res.end(JSON.stringify({ total_salary: totalSalary }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: http.STATUS_CODES[404] }));
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

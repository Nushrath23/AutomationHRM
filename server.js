const express = require('express');
const cors = require('cors'); 
const { exec } = require('child_process');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'nushrath@antlerfoundry.com',//change this to yours -sender
        pass: 'rlzb cspi jreq inyc', //rlzb cspi jreq inyc-App pw -generate app password in gmail
        
    },

});

// API Endpoint to trigger Playwright tests
app.post('/run-tests', (req, res) => {
    // Execute Playwright tests using the CLI
    exec('npx playwright test', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);
      // Write test results to a document
      const filePath = './test-results.txt';
      fs.writeFileSync(filePath, stdout);

      // Email the test results
      const mailOptions = {
          from: 'nushrath@antlerfoundry.com', // Sender address (Change this if you want)
          to: 'nushrathnazeer2016@gmail.com', // Receiver address(Change this if you want)
          subject: 'Playwright Test Results',
          text: 'Please find the attached test results.',
          attachments: [
              {
                  filename: 'test-results.txt',
                  path: filePath, // Attach the test results file
              },
          ],
      };

      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.error(`Email Error: ${err.message}`);
              return res.status(500).send(`Email Error: ${err.message}`);
          }
          console.log(`Email Sent: ${info.response}`);
          res.status(200).send('Tests executed, results emailed successfully.');
      });
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


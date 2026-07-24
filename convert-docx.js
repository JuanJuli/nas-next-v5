const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'template-eform', 'FR.APL.01 Template.docx');
const outputPath = path.join(__dirname, 'public', 'template-eform', 'FR.APL.01 Template.html');

mammoth.convertToHtml({ path: inputPath })
  .then((result) => {
    const html = result.value;
    const messages = result.messages;
    
    // Wrap in basic HTML structure
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FR.APL.01 Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }
        td, th {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
${html}
</body>
</html>`;
    
    fs.writeFileSync(outputPath, fullHtml);
    console.log('✓ Conversion successful!');
    console.log('Output file:', outputPath);
    
    if (messages.length > 0) {
      console.log('\nMessages:');
      messages.forEach(m => console.log('  -', m.message));
    }
  })
  .catch((error) => {
    console.error('Error converting file:', error);
  });

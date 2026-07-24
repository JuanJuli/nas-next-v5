const fs = require('fs');
const path = require('path');
const Handlebars = require('./handlebars-helpers');

/**
 * Render template HTML dengan data
 * @param {string} templatePath - Path ke file template HTML
 * @param {object} data - Data untuk dirender ke template
 * @returns {string} - HTML yang sudah dirender
 */
function renderTemplate(templatePath, data) {
  // Baca template
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  
  // Compile template
  const template = Handlebars.compile(templateSource);
  
  // Render template dengan data
  const html = template(data);
  
  return html;
}

/**
 * Contoh penggunaan
 */
function main() {
  const templatePath = path.join(__dirname, 'FR.APL.01 Template Base.html');
  const dataPath = path.join(__dirname, 'sample-data.json');
  const outputPath = path.join(__dirname, 'FR.APL.01 Rendered.html');
  
  // Baca data
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  // Render template
  const renderedHtml = renderTemplate(templatePath, data);
  
  // Simpan hasil render
  fs.writeFileSync(outputPath, renderedHtml, 'utf-8');
  
  console.log('Template berhasil dirender!');
  console.log('Output file:', outputPath);
}

// Jalankan jika file ini dijalankan langsung
if (require.main === module) {
  main();
}

module.exports = { renderTemplate };

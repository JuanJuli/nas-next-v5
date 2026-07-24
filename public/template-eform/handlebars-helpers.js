// Handlebars Helper Functions
// Gunakan helper ini saat merender template

const Handlebars = require('handlebars');

// Helper untuk increment index (karena index dimulai dari 0)
Handlebars.registerHelper('increment', function(value) {
  return parseInt(value) + 1;
});

// Helper untuk format tanggal jika diperlukan
Handlebars.registerHelper('formatDate', function(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
});

module.exports = Handlebars;

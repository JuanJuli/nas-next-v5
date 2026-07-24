import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

// Register Handlebars helpers
Handlebars.registerHelper('increment', function(value) {
  return parseInt(value) + 1;
});

export function renderTemplate(name: string, data: any) {
  // Support both paths: public/templates and public/template-eform
  let filePath = path.join(
    process.cwd(),
    "public",
    "template-eform",
    `${name}.html`
  );

  // Fallback to templates folder if not found
  if (!fs.existsSync(filePath)) {
    filePath = path.join(
      process.cwd(),
      "public",
      "templates",
      `${name}.html`
    );
  }

  const source = fs.readFileSync(filePath, "utf-8");

  const template = Handlebars.compile(source);

  return template(data);
}
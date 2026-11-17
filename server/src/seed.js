import bcrypt from "bcryptjs";
import db from "./db.js";

const email = "admin@outerheaven.local";
const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
if (!existing) {
  const hash = bcrypt.hashSync("Admin123!", 12);
  db.prepare("INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,?)")
    .run("OuterHeaven Administrator", email, hash, "admin");
}
const count = db.prepare("SELECT COUNT(*) AS n FROM accommodation").get().n;
if (count === 0) {
  const insert = db.prepare(`INSERT INTO accommodation (title,location,price,type,description)
    VALUES (?,?,?,?,?)`);
  const examples = [
    ["Shared room near Bolzano centre","Bolzano / Bozen","€450 / month","Shared room","Illustrative student accommodation example. Contact the provider and confirm all details before making arrangements."],
    ["Single room in shared flat","Bolzano / Bozen","€580 / month","Single room","Illustrative student accommodation example. Availability, deposit and utilities are not verified."],
    ["Student room near Brixen campus","Bressanone / Brixen","€520 / month","Single room","Illustrative student accommodation example. Check commute, contract and current price directly."]
  ];
  for (const row of examples) insert.run(...row);
}
console.log("Seed complete. Demo admin: admin@outerheaven.local / Admin123!");
console.log("Accommodation cards are illustrative demo data, not verified offers.");

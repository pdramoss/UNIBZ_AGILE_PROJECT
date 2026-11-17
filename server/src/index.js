
import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./db.js";

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "local-development-secret-change-before-deployment";

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false
  })
);

app.use(express.json());

// Safe user data (never expose password hash)
const safeUser = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
  programme: u.programme || "",
  campus: u.campus || "",
  bio: u.bio || ""
});

// Authentication middleware
function auth(required = true) {
  return (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ")
      ? header.slice(7)
      : null;

    if (!token) {
      return required
        ? res.status(401).json({
            message: "Please sign in to continue."
          })
        : next();
    }

    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch {
      return res.status(401).json({
        message: "Your session has expired. Please sign in again."
      });
    }
  };
}

// Administrator middleware
function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      message: "Administrator access required."
    });
  }

  next();
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "OuterHeaven API"
  });
});

// Register
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({
      message: "Name, email and password are required."
    });
  }

  const cleanName = name.trim().replace(/\s+/g, " ");

  if (!/^[A-ZÀ-ÖØ-Ý]/.test(cleanName)) {
    return res.status(400).json({
      message: "Full name must start with an uppercase letter."
    });
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    return res.status(400).json({
      message:
        "Password must contain at least 8 characters, one uppercase letter, one number and one symbol."
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({
      message: "Enter a valid email address."
    });
  }

  try {
    const hash = await bcrypt.hash(password, 12);

    const result = db
      .prepare(
        "INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,'student')"
      )
      .run(cleanName, normalizedEmail, hash);

    const user = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(result.lastInsertRowid);

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(201).json({
      token,
      user: safeUser(user)
    });
  } catch (e) {
    if (String(e.message).includes("UNIQUE")) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    console.error(e);

    res.status(500).json({
      message: "Could not create the account."
    });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();

  const password = String(req.body?.password || "");

  const user = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (
    !user ||
    !(await bcrypt.compare(password, user.password_hash))
  ) {
    return res.status(401).json({
      message: "Invalid email or password."
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    user: safeUser(user)
  });
});

// Current authenticated user
app.get("/api/auth/me", auth(), (req, res) => {
  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "Account not found."
    });
  }

  res.json({
    user: safeUser(user)
  });
});

// Get profile
app.get("/api/profile", auth(), (req, res) => {
  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "Account not found."
    });
  }

  res.json({
    user: safeUser(user)
  });
});

// Update profile
app.put("/api/profile", auth(), (req, res) => {
  const {
    name,
    programme = "",
    campus = "",
    bio = ""
  } = req.body || {};

  const cleanName = String(name || "")
    .trim()
    .replace(/\s+/g, " ");

  const cleanProgramme = String(programme)
    .trim()
    .replace(/\b([a-zà-öø-ÿ])/g, (_, c) =>
      c.toUpperCase()
    );

  if (!cleanName) {
    return res.status(400).json({
      message: "Name cannot be empty."
    });
  }

  if (!/^[A-ZÀ-ÖØ-Ý]/.test(cleanName)) {
    return res.status(400).json({
      message: "Full name must start with an uppercase letter."
    });
  }

  db.prepare(
    "UPDATE users SET name=?, programme=?, campus=?, bio=? WHERE id=?"
  ).run(
    cleanName,
    cleanProgramme,
    String(campus).trim(),
    String(bio).trim().slice(0, 500),
    req.user.id
  );

  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.user.id);

  res.json({
    user: safeUser(user)
  });
});

// University information
app.get("/api/universities", (_req, res) => {
  res.json({
    faculties: [
      {
        name: "Economics and Management",
        campus: "Bolzano",
        focus:
          "Economics, management, business and related social sciences."
      },
      {
        name: "Design and Art",
        campus: "Bolzano",
        focus:
          "Design, visual communication, art and creative practice."
      },
      {
        name: "Agricultural, Environmental and Food Sciences",
        campus: "Bolzano",
        focus:
          "Agriculture, environment, food and sustainability."
      },
      {
        name: "Engineering",
        campus: "NOI Techpark, Bolzano",
        focus:
          "Engineering, technology and applied innovation."
      },
      {
        name: "Education",
        campus: "Bressanone",
        focus:
          "Education, learning, social and pedagogical fields."
      }
    ],

    campuses: [
      {
        name: "Bolzano / Bozen – Main Campus",
        detail:
          "City-centre campus with several faculties and university services."
      },
      {
        name: "NOI Techpark – Bolzano",
        detail:
          "Innovation and research environment; home to the Faculty of Engineering."
      },
      {
        name: "Bressanone / Brixen",
        detail:
          "Campus of the Faculty of Education."
      },
      {
        name: "Brunico / Bruneck",
        detail:
          "Location for Tourism, Sport and Event Management study programmes."
      }
    ],

    languages: [
      "German",
      "Italian",
      "English"
    ],

    note:
      "Study programmes, admission requirements and course languages can change. Always confirm details on the official unibz website."
  });
});

// Accommodation
app.get("/api/accommodation", (_req, res) => {
  const rows = db
    .prepare(
      `SELECT
        id,
        title,
        location,
        price,
        type,
        description,
        source_note AS sourceNote
       FROM accommodation
       ORDER BY id`
    )
    .all();

  res.json(rows);
});

// Admin summary
app.get(
  "/api/admin/summary",
  auth(),
  adminOnly,
  (_req, res) => {
    const users = db
      .prepare("SELECT COUNT(*) AS count FROM users")
      .get().count;

    const listings = db
      .prepare("SELECT COUNT(*) AS count FROM accommodation")
      .get().count;

    res.json({
      users,
      listings
    });
  }
);

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(500).json({
    message: "Unexpected server error."
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `OuterHeaven API listening on http://localhost:${PORT}`
  );
});

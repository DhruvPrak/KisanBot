# KisanBot — Backend (Week 5: Database Integration)

## Database Choice: MongoDB (via MongoDB Atlas) + Mongoose

We chose MongoDB over PostgreSQL because KisanBot's core data — farmer crop queries and (later) chat messages — is document-based with potentially variable fields per query, which fits MongoDB's flexible schema better than a rigid relational structure.

## Schema Diagram

![KisanBot Schema](./W5_SchemaDiagram_Dhruv.png)

**Query** — crop, problem, advice, createdAt
**User** — name, email, password, createdAt (for authentication, added in a later week)

No relationship exists between these collections yet. Once login/auth is implemented, `Query` will reference `User._id` (one-to-many).

## Set Up the Database

1. Create a free MongoDB Atlas account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create an M0 (free) cluster
3. Create a database user and whitelist your IP (or allow access from anywhere for development)
4. Get your connection string from **Connect → Drivers → Node.js**
5. Copy `.env.example` to `.env` and fill in your own `MONGO_URI`:
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/kisanbot?retryWrites=true&w=majority
6. Install dependencies and run the server:
```bash
   npm install
   npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/queries` | Get all queries |
| GET | `/api/queries/search?q=` | Search queries by crop or problem |
| GET | `/api/queries/:id` | Get a single query |
| POST | `/api/queries` | Create a new query |
| PUT | `/api/queries/:id` | Update a query |
| DELETE | `/api/queries/:id` | Delete a query |

All endpoints now read from and write to MongoDB Atlas instead of in-memory data.
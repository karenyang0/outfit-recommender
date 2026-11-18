# Command Cheat Sheet

> Run server and database commands from inside `server/`

### Run the server
| Command | What it does |
|---|---|
| `cd server` | Go to the server folder |
| `npm run dev` | Start the server (auto-restarts on save) |
| `Ctrl+C` | Stop the server |
| `npm install` | Install packages (after cloning or pulling new ones) |

### Test endpoints
```bash
# Health check
curl localhost:3000/health

# Get all items
curl localhost:3000/items

# Get one item
curl localhost:3000/items/1

# Add an item
curl -X POST localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"type":"top","color":"black","formality":"casual","style":"streetwear"}'
```
- `curl` sends GET by default. Use `-X POST`, `-X PATCH`, or `-X DELETE` for other methods
- POST/PATCH need the `-H "Content-Type: application/json"` header

### Database (Drizzle)
| Command | What it does |
|---|---|
| `npx drizzle-kit push` | Apply schema.ts changes to the database |
| `npx drizzle-kit studio` | View/edit tables in the browser (use Chrome) |
| `npx tsx src/seed.ts` | Run the seed script |

### Git workflow (per issue)
```bash
git checkout main && git pull          # start from latest main
git checkout -b feat/<short-name>      # new branch for the issue
# ...write code...
git status                             # see what changed
git add .                              # stage changes
git commit -m "Describe the change"    # commit
git push -u origin feat/<short-name>   # push (first time on a branch)
git push                               # push (after that)
```
Then open a PR on GitHub with `Closes #<issue number>` in the description.

### npm vs npx
- `npm` → manages this project's packages and scripts (`npm install`, `npm run dev`)
- `npx` → runs a tool's command (`npx drizzle-kit push`)

### Common errors
| Error | Fix |
|---|---|
| `Missing script: "dev"` | You're not in `server/`, or you typed `npx` instead of `npm` |
| `Cannot GET /something` | No route for that method + path. Check the method (`-X`) and URL |
| `no such table: items` | Server was started outside `server/`. `cd server`, then delete any stray `closet.db` |
| `EADDRINUSE :3000` | Server is already running in another terminal. `Ctrl+C` it |
| `req.body` is `undefined` | Missing the `Content-Type: application/json` header in curl |

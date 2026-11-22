# Project Requirements Document (PRD)

**Project**: Outfit recommender

**Users**:

1. Young adult/teenager student with full closets and don't know what to wear

## User Stories

Format: As a [type of user], I want to [do something] so that [benefit].
Example: As a customer, I want to add pastries to my shopping cart so that I can keep track of what I want to buy and see the price.

1. [P0] As a young adult/teen student, I want to upload a picture of a clothing piece in my closet so that the app knows what's in my closet.
2. [P0] As a young adult/teen student, I want to manually tag a picture of clothing in my closet with descriptions so that the app knows its use case.
   1. [P2] Name
   2. [P0] Clothing Type (Top/pants/shoes/jewelry/accessories)
   3. [P0] Color
   4. [P0] Formality (casual/business casual/professional)
   5. [P0] Style (streetwear, etc)
   6. [P1] Temperature (cold, mild, hot)
   7. [P1] Precipitation (snow, rain, no precipitation)
3. [P0] As a young adult/teen student, I want to view my closet so that I know which pieces are available
4. [P0] As a young adult/teen student, I want to edit and delete an item in my closet so that my closet is up to date
5. [P2] As a young adult/teen student, I want to filter by tag so that I can see available options
6. [P2] As a young adult/teen student, I want to search by name so that I can see available options
7. [P0] As a young adult/teen student, I want to manually build an outfit so that I am able to visualize what to wear
8. [P0] As a young adult/teen student, I want to save a liked outfit so that I am able remember an outfit
9. [P1] As a young adult/teen student, I want to share my location for weather so that the app generates better-informed outfits
10. [P2] As a young adult/teen student, I want to randomly generate an outfit so that I can see available options
11. [P0] As a young adult/teen student, I want to set constraints on a recommendation (formality, color, style) so that the outfit fits the occasion.
12. [P0] As a young adult/teen student, I want to get a full outfit recommendation so that I know what to wear
13. [P1] As a young adult/teen student, I want to accept/reject items in a recommended outfit so that the app generates better-informed outfits
14. [P1] As a young adult/teen student, I want to accept/reject a full recommended outfit so that the app generates better-informed outfits
15. [P1] As a young adult/teen student, I want to notify that I wore an outfit so that the app can track what I wore

## Priorities

- **P0**: minimum viable product
- **P1**: feature you want, but don't need
- **P2**: feature that's nice to have

| Priority | User Story |
| --- | --- |
| **P0** | As a young adult/teen student, I want to upload a picture of a clothing piece in my closet so that the app knows what's in my closet. |
| **P0** | As a young adult/teen student, I want to manually tag a picture of clothing in my closet with descriptions (clothing type, color, formality, style) so that the app knows its use case. |
| **P0** | As a young adult/teen student, I want to view my closet so that I know which pieces are available. |
| **P0** | As a young adult/teen student, I want to edit and delete an item in my closet so that my closet is up to date. |
| **P0** | As a young adult/teen student, I want to manually build an outfit so that I am able to visualize what to wear. |
| **P0** | As a young adult/teen student, I want to save a liked outfit so that I am able to remember an outfit. |
| **P0** | As a young adult/teen student, I want to set constraints on a recommendation (formality, color, style) so that the outfit fits the occasion. |
| **P0** | As a young adult/teen student, I want to get a full outfit recommendation so that I know what to wear. |
| **P1** | As a young adult/teen student, I want to tag clothing with temperature (cold, mild, hot) and precipitation (snow, rain, no precipitation) so that the app knows its use case. |
| **P1** | As a young adult/teen student, I want to share my location for weather so that the app generates better-informed outfits. |
| **P1** | As a young adult/teen student, I want to accept/reject items in a recommended outfit so that the app generates better-informed outfits. |
| **P1** | As a young adult/teen student, I want to accept/reject a full recommended outfit so that the app generates better-informed outfits. |
| **P1** | As a young adult/teen student, I want to notify that I wore an outfit so that the app can track what I wore. |
| **P2** | As a young adult/teen student, I want to tag clothing with a name so that I can identify it. |
| **P2** | As a young adult/teen student, I want to filter by tag so that I can see available options. |
| **P2** | As a young adult/teen student, I want to search by name so that I can see available options. |
| **P2** | As a young adult/teen student, I want to randomly generate an outfit so that I can see available options. |

> **TODO**: analytics? — this is the data science aspect of project

# Technical Approach

## Technical Stack

Full-stack TypeScript, with a separate Python analysis layer reading the same database. The app writes to SQLite. A Jupyter notebook reads that same file with pandas for the wear-frequency, cost-per-wear, and closet-gap analysis.

1. Frontend: React + TypeScript + Vite
2. Backend: Express (TS) — plain REST
3. ORM: Drizzle (mirrors SQL more) or Prisma (nicer DX, learn less abt SQL)
4. DB: SQLite
5. Analytics: Jupyter + pandas, reading the same `.db` file

## Data Models

| DB Table | Fields |
| --- | --- |
| `items` | id, name, type, color, formality, style, temp_range, precipitation, image_path, created_at |
| `outfits` | id, name, created_at, source (`'manual'` \| `'generated'`) |
| `outfit_items` | outfit_id, item_id |
| `wear_events` | id, outfit_id, worn_at |
| `feedback` | id, outfit_id, item_id (nullable), verdict, created_at |

## Recommender

Split recommender into 3 stages of implementation.

1. **Filter**: hard constraints. Formality matches, temperature range contains today's temp, item isn't already used in this outfit. Just use SQL `WHERE` clauses.
2. **Score**: soft preferences. Color harmony, days since last worn (favor neglected items), style coherence. Weighted sum, hand-tuned constants.
3. **Learn**: adjust weights from the feedback table.

## Implementation (rough)

schema and items CRUD → closet view → manual outfit builder → recommendation stage 1 → wear tracking (early, since the data can't be backfilled) → weather → images → analytics notebook → auth

Set up server with Drizzle + SQLite and create the items table.

- [ ] `server/` scaffolded (Drizzle, libsql, tsx)
- [ ] items table matches PRD data model
- [ ] Seed script inserts and reads one item

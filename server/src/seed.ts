import { db } from './db/index';
import { items } from './db/schema';

await db.insert(items).values({
    type: 'top', color: 'black', formality: 'casual', style: 'streetwear'
})
console.log(await db.select().from(items))
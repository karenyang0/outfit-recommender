PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_closet_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`color` text,
	`image_path` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_closet_items`("id", "name", "category", "color", "image_path", "created_at") SELECT "id", "name", "category", "color", "image_path", "created_at" FROM `closet_items`;--> statement-breakpoint
DROP TABLE `closet_items`;--> statement-breakpoint
ALTER TABLE `__new_closet_items` RENAME TO `closet_items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
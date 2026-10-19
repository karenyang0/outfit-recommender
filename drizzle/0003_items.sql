CREATE TABLE `items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`type` text NOT NULL,
	`color` text NOT NULL,
	`formality` text NOT NULL,
	`style` text NOT NULL,
	`temp_range` text,
	`precipitation` text,
	`image_path` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DROP TABLE `closet_items`;
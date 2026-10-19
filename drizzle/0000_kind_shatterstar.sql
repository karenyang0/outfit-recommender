CREATE TABLE `closet_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`color` text,
	`image_path` text,
	`created_at` text DEFAULT '(CURRENT_TIMESTAMP)' NOT NULL
);

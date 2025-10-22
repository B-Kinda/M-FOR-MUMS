// app/datamappers/userDatamapper.js
import pool from "../db/db.js";

const userDatamapper = {
	/**
	 * Trouve un utilisateur par son ID Google
	 */
	async findByGoogleId(googleId) {
		const query = {
			text: 'SELECT * FROM "user" WHERE google_id = $1',
			values: [googleId],
		};
		const result = await pool.query(query);
		return result.rows[0];
	},

	/**
	 * Crée un nouvel utilisateur
	 */
	async create(userData) {
		const { google_id, email, name, photo } = userData;
		const query = {
			text: `INSERT INTO "user" (google_id, email, name, photo, created_at, updated_at)
                   VALUES ($1, $2, $3, $4, NOW(), NOW())
                   RETURNING *`,
			values: [google_id, email, name, photo],
		};
		const result = await pool.query(query);
		return result.rows[0];
	},

	/**
	 * Met à jour un utilisateur existant
	 */
	async update(userId, userData) {
		const { name, email, photo } = userData;
		const query = {
			text: `UPDATE "user" 
                   SET name = COALESCE($1, name),
                       email = COALESCE($2, email),
                       photo = COALESCE($3, photo),
                       updated_at = NOW()
                   WHERE id = $4
                   RETURNING *`,
			values: [name, email, photo, userId],
		};
		const result = await pool.query(query);
		return result.rows[0];
	},

	/**
	 * Trouve un utilisateur par son ID
	 */
	async findById(userId) {
		const query = {
			text: 'SELECT id, name, email, photo, created_at, updated_at FROM "user" WHERE id = $1',
			values: [userId],
		};
		const result = await pool.query(query);
		return result.rows[0];
	},
};

export default userDatamapper;

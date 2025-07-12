/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
module.exports = {
  up(pgm) {
    pgm.createTable('blogs', {
      id: 'id',
      slug: { type: 'varchar(255)', notNull: true, unique: true },
      title: { type: 'text', notNull: true },
      content: { type: 'text', notNull: true },
      image_url: { type: 'text', notNull: true },
      character_count: { type: 'integer', notNull: false, default: 0 },
      created_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
    });
  },
  down(pgm) {
    pgm.dropTable('blogs');
  }
};

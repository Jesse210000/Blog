/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
module.exports = {
  up(pgm) {
    pgm.createTable('tags', {
      id: 'id',
      name: { type: 'varchar(50)', notNull: true, unique: true }
    });
    pgm.createTable('blog_tags', {
      blog_id: {
        type: 'integer',
        notNull: true,
        references: '"blogs"',
        onDelete: 'cascade'
      },
      tag_id: {
        type: 'integer',
        notNull: true,
        references: '"tags"',
        onDelete: 'cascade'
      }
    });
    pgm.addConstraint('blog_tags', 'unique_blog_tag', {
      unique: ['blog_id', 'tag_id']
    });
  },

  down(pgm) {
    pgm.dropTable('blog_tags');
    pgm.dropTable('tags');
  }
};

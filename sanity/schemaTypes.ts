import { defineField, defineType } from 'sanity';

const mediaItem = defineType({ name: 'mediaItem', title: 'Media item', type: 'object', fields: [
  defineField({ name: 'image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', validation: (Rule) => Rule.required() })] }),
  defineField({ name: 'muxPlaybackId', title: 'Mux playback ID', type: 'string' }),
  defineField({ name: 'caption', type: 'string' })
] });

const project = defineType({ name: 'project', type: 'document', fields: [
  defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
  defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
  defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  defineField({ name: 'featuredOrder', type: 'number', hidden: ({ document }) => !document?.featured }),
  defineField({ name: 'year', type: 'string' }),
  defineField({ name: 'discipline', type: 'string' }),
  defineField({ name: 'excerpt', type: 'text', rows: 3 }),
  defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
  defineField({ name: 'cover', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', validation: (Rule) => Rule.required() })] }),
  defineField({ name: 'muxPlaybackId', title: 'Mux playback ID', type: 'string' }),
  defineField({ name: 'gallery', type: 'array', of: [{ type: 'mediaItem' }] }),
  defineField({ name: 'credits', type: 'array', of: [{ type: 'string' }] })
] });

const siteSettings = defineType({ name: 'siteSettings', type: 'document', fields: [
  defineField({ name: 'title', type: 'string', initialValue: 'Last Seen Dreaming' }),
  defineField({ name: 'contactEmail', type: 'string', validation: (Rule) => Rule.required().email() }),
  defineField({ name: 'clientLogos', type: 'array', of: [{ type: 'image' }] }),
  defineField({ name: 'socialLinks', type: 'array', of: [{ type: 'url' }] })
] });

export const schemaTypes = [mediaItem, project, siteSettings];

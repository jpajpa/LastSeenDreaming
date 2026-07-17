import { defineArrayMember, defineField, defineType } from 'sanity';

const projectMedia = defineType({
  name: 'projectMedia',
  title: 'Project media',
  type: 'object',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media type',
      type: 'string',
      initialValue: 'image',
      options: {
        layout: 'radio',
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType === 'video',
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as { mediaType?: string } | undefined;
        return parent?.mediaType !== 'video' && !value ? 'Choose an image.' : true;
      }),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as { mediaType?: string } | undefined;
        return parent?.mediaType === 'video' && !value ? 'Choose a video.' : true;
      }),
    }),
    defineField({
      name: 'alt',
      title: 'Accessible description',
      type: 'string',
      description: 'Briefly describe what is shown for visitors using screen readers.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'alt',
      mediaType: 'mediaType',
      media: 'image',
    },
    prepare({ title, subtitle, mediaType, media }) {
      return {
        title: title || (mediaType === 'video' ? 'Video' : 'Image'),
        subtitle,
        media,
      };
    },
  },
});

const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'mainMedia',
      title: 'Main image / video',
      type: 'projectMedia',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 8,
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'additionalMedia',
      title: 'Additional media',
      type: 'array',
      group: 'content',
      description: 'Add images and videos in the order they should appear on the project page.',
      of: [defineArrayMember({ type: 'projectMedia' })],
    }),
    defineField({
      name: 'slug',
      title: 'Page URL',
      type: 'slug',
      group: 'settings',
      description: 'Click Generate after entering the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Show on homepage',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'projectType',
      title: 'Project type',
      type: 'string',
      group: 'settings',
      placeholder: 'Music film, campaign, identity…',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'settings',
      validation: (Rule) => Rule.regex(/^\d{4}$/, { name: 'year', invert: false }).warning('Use a four-digit year.'),
    }),
  ],
  orderings: [
    {
      title: 'Recently updated',
      name: 'updatedAtDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainMedia.image',
      mediaType: 'mainMedia.mediaType',
      featured: 'featured',
    },
    prepare({ title, media, mediaType, featured }) {
      const labels = [mediaType === 'video' ? 'Video' : 'Image', featured ? 'Homepage' : null].filter(Boolean);
      return { title, subtitle: labels.join(' · '), media };
    },
  },
});

export const schemaTypes = [projectMedia, project];

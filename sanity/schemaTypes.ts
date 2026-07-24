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
    },
    prepare({ title, media, mediaType }) {
      return { title, subtitle: mediaType === 'video' ? 'Video' : 'Image', media };
    },
  },
});

const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'projects', title: 'Featured projects' },
    { name: 'video', title: 'Main video' },
  ],
  fields: [
    defineField({
      name: 'intro',
      title: 'Home page info',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'The short production-house introduction shown over the main video.',
      initialValue: 'Last Seen Dreaming is a London production house that chases dreams and turns them into visuals.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured projects on home',
      type: 'array',
      group: 'projects',
      description: 'Choose up to three projects and drag them into the order they should appear.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(3).unique(),
    }),
    defineField({
      name: 'mainVideo',
      title: 'Main video on home',
      type: 'file',
      group: 'video',
      description: 'Upload the looping reel shown near the top of the home page.',
      options: { accept: 'video/mp4,video/webm' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainVideoLabel',
      title: 'Video description',
      type: 'string',
      group: 'video',
      description: 'A short accessible label, for example “2025 highlight reel”.',
      initialValue: '2025 highlight reel',
      validation: (Rule) => Rule.required().max(120),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home page',
        subtitle: 'Intro, main video and featured projects',
      };
    },
  },
});

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      description: 'Shown as the main link on the Contact page.',
      initialValue: 'inbox@lastseendreaming.com',
      validation: (Rule) => Rule.required().email(),
    }),
  ],
  preview: {
    select: { subtitle: 'contactEmail' },
    prepare({ subtitle }) {
      return { title: 'Site settings', subtitle };
    },
  },
});

export const schemaTypes = [projectMedia, project, homePage, siteSettings];

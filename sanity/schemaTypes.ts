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

const clientLogo = defineType({
  name: 'clientLogo',
  title: 'Client logo',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Client name',
      type: 'string',
      description: 'Used as the logo’s accessible description.',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'logo',
      title: 'Logo image',
      type: 'image',
      description: 'Upload a transparent PNG or WebP. The site displays it in grey automatically.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayScale',
      title: 'Visual size',
      type: 'number',
      description: 'Use 1 for the standard size, a smaller number to reduce it, or a larger number to enlarge it.',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(0.5).max(2),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      displayScale: 'displayScale',
    },
    prepare({ title, media, displayScale }) {
      return {
        title: title || 'Untitled client',
        subtitle: `Visual size: ${displayScale ?? 1}`,
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
    defineField({
      name: 'externalUrl',
      title: 'External link',
      type: 'url',
      group: 'settings',
      description: 'Link to the live project (e.g. YouTube, Vimeo, website).',
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
    { name: 'clients', title: 'Client logos' },
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
      name: 'clientLogos',
      title: 'Client logos',
      type: 'array',
      group: 'clients',
      description: 'Add, remove and drag logos into the order they should appear. The first six are shown on phones.',
      of: [defineArrayMember({ type: 'clientLogo' })],
      validation: (Rule) => Rule.max(12),
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
        subtitle: 'Intro, client logos, main video and featured projects',
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

export const schemaTypes = [projectMedia, clientLogo, project, homePage, siteSettings];

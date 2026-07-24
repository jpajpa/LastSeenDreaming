import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home page')
        .id('homePage')
        .child(
          S.document()
            .title('Home page')
            .schemaType('homePage')
            .documentId('homePage'),
        ),
      S.documentTypeListItem('project')
        .title('Projects')
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
        ),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(
          S.document()
            .title('Site settings')
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
    ]);

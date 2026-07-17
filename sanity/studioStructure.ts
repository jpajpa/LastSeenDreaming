import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Project portal')
    .items([
      S.documentTypeListItem('project')
        .title('Projects')
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
        ),
    ]);

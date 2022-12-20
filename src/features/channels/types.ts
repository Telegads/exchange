type Pagination = {
  pageSize: number | undefined;
  pageNumber: number | undefined;
};

export type Sort = {
  type: string | undefined;
  direction: string | undefined;
};

export type Filter = {
  searchString?: string | null;
  category?: string | null;
  sort?: Sort | null;
  subscriptionsCount?:
    | {
        min?: number | undefined;
        max?: number | undefined;
      }
    | undefined;
  viewsCount?:
    | {
        min?: number | undefined;
        max?: number | undefined;
      }
    | undefined;
};

export type GetChannelArgs = Pagination & Filter;

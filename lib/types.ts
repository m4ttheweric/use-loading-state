export type AsyncTaskOptions<IdType extends string = string> =
  | {
      loadingId?: IdType;
      task: () => Promise<unknown>;
    }
  | (() => Promise<unknown>);

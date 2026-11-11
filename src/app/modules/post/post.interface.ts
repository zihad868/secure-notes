export interface ICreatePostPayload {
  title: string;
  content?: string;
  isPublic?: boolean;
}

export interface IUpdatePostPayload {
  title?: string;
  content?: string;
  isPublic?: boolean;
}


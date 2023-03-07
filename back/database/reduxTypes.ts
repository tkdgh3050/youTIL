export interface PlayList {
  id: number;
  playListName: string;
  videoList?: Video[];
}

export interface Video {
  id: number;
  videoName: string;
  videoURL: string;
  videoLength?: number;
  bookmarkList?: Bookmark[];
  textNote?: string;
  lastViewTime: number;
  playListId?: number;
  isPinned?: number;
}

export interface PlayListInVideo {
  videoId: number;
  playListId: number;
}

export interface Bookmark {
  id: number;
  time: number;
  playListId: number;
  videoId: number;
}

// DB에서 값을 가져와서 리덕스로 돌려주기 위한 파일

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
  created_at?: string;
  modified_lastViewTime_at?: string;
  modified_isPinned_at?: string;
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

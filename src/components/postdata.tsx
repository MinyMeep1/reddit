export interface Post {
    id: string;
    title: string;
    body: string;
    time: number;
    replies: Record<string, Reply>;
    upvotes: Record<string, { userID: string; time: number }>;
    userID: string;
}

export interface Reply {
    id: string;
    message: string;
    userID: string;
    userName: string;
    time: number;
}

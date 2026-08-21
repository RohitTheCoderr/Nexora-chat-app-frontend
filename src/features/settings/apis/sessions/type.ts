export type Session ={
    user: string;
    sessionId: string;
    device: string;
    browser: string;
    os: string;
    createdAt: string;
    lastActive: string;
    ipAddress?: string | null ;
    isCurrent: boolean;
}

export type SessionRes=Session[]
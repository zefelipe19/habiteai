export interface baseUser {
    id: number;
    email: string;
    username: string | null;
    password: string;
}

type advertiserType = "realState" | "individual"

export interface advertiserUser {
    userId: number;
    type: advertiserType;
}

export interface userForm {
    email: string | null;
    password: string | null;
}

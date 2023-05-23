export class Login {
    static readonly type = '[Authentication] Login';

    constructor(public payload: { email: string, password: string }) {
    }
}

export class Logout {
    static readonly type = '[Authentication] Logout';
}

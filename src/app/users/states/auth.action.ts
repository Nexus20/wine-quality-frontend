export class Login {
    static readonly type = '[Authentication] Login';

    constructor(public payload: { email: string, password: string }) {
    }
}

export class Logout {
    static readonly type = '[Authentication] Logout';
}

export class SetLanguage {
    static readonly type = '[Authentication] Set language';

    constructor(public newLanguage: string) {
    }
}

export class GetOwnProfile {
    static readonly type = '[Profile] GetOwnProfile'

    constructor() {
    }
}

export class ClearProfile {
    static readonly type = '[Profile] Clear'

    constructor() {
    }
}

export class SetLanguage {
    static readonly type = '[Profile] Set language';

    constructor(public newLanguage: string) {
    }
}

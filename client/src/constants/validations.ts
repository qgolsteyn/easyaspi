export const name = {
    format: {
        message: 'must be a valid name.',
        pattern: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
    },
    presence: true,
};

export const classroomName = {
    format: {
        message: 'must not contain special characters.',
        pattern: /[^\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
    },
    presence: true,
};

export const classroomPasscode = {
    format: {
        message: 'must be all digits',
        pattern: /[0-9]+/,
    },
    length: {
        message: 'must have at least 4 numbers.',
        minimum: 4,
    },
    presence: true,
};

export const url = {
    format: {
        message: 'must be a valid url',
        pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    },
    presence: true,
};

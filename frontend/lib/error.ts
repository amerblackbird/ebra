interface IOptions {
    error: any // eslint-disable-line
}

export function handleError({error}: IOptions) {
    if (error instanceof TypeError) {
        return "Network error or resource not found.";
    } else if (error instanceof SyntaxError) {
        return "Invalid JSON response.";
    } else if (error instanceof Error) {
        return error.message;
    } else {
        return "An unknown error occurred.";
    }
}
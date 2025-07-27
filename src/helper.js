export function checkHeading(str) {
    return /^(\*{1,})/.test(str); // matches one or more '*' at start
}


export function replaceHeadingStarts(str) {
    return str.replace(/^\*+/, '').replace(/\*+$/, '').replace(/\$+$/, '');
}
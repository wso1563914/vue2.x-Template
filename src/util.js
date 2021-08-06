export function stripScript(content) {
    const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
    return result && result[2] ? result[2].trim() : '';
}
export function stripStyle(content) {
    const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
    return result && result[2] ? result[2].trim() : '';
}

export function stripTemplate(content) {
    let content1 = content.trim();
    if (!content1) {
        return content1;
    }
    return content1.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

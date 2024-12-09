export function createMarkup(messages: any) {
    return { __html: messages };
}

export default function renderHtml(messages: any) {
    return <div dangerouslySetInnerHTML={createMarkup(messages)} />;
}

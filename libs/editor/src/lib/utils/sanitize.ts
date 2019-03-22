import { MarkSpec, NodeSpec } from "prosemirror-model"

function isContentSupported(
    nodes: { [key: string]: NodeSpec },
    contentKey: string,
): boolean {
    const nodeKeys = Object.keys(nodes);

    // content is with valid node
    if (nodeKeys.indexOf(contentKey) > -1) {
        return true;
    }

    // content is with valid group
    // tslint:disable-next-line
    for (const supportedKey in nodes) {
        const nodeSpec = nodes[supportedKey];
        if (nodeSpec && nodeSpec.group === contentKey) {
            return true;
        }
    }

    return false;
}

function sanitizedContent(
    content: string | undefined,
    invalidContent: string,
): string {
    if (!invalidContent.length) {
        return content || '';
    }

    if (!content || !content.match(/\w/)) {
        return '';
    }

    const newContent = content
        .replace(
            new RegExp(
                `(${invalidContent}((\\s)*\\|)+)|((\\|(\\s)*)+${invalidContent})|(${invalidContent}$)`,
                'g',
            ),
            '',
        )
        .replace('  ', ' ')
        .trim();

    return newContent;
}

export function sanitizeNodes(
    nodes: { [key: string]: NodeSpec },
    supportedMarks: { [key: string]: MarkSpec },
): { [key: string]: NodeSpec } {
    const nodeNames = Object.keys(nodes);
    nodeNames.forEach(nodeKey => {
        const nodeSpec = { ...nodes[nodeKey] };
        if (nodeSpec.marks && nodeSpec.marks !== '_') {
            nodeSpec.marks = nodeSpec.marks
                .split(' ')
                .filter(mark => !!supportedMarks[mark])
                .join(' ');
        }
        if (nodeSpec.content) {
            const content = nodeSpec.content.replace(/\W/g, ' ');
            const contentKeys = content.split(' ');
            const unsupportedContentKeys = contentKeys.filter(
                contentKey => !isContentSupported(nodes, contentKey),
            );
            nodeSpec.content = unsupportedContentKeys.reduce(
                (newContent, nodeName) => sanitizedContent(newContent, nodeName),
                nodeSpec.content,
            );
        }
        nodes[nodeKey] = nodeSpec;
    });
    return nodes;
}

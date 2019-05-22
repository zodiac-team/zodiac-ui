import * as LinkifyItNs from "linkify-it"

const LinkifyIt = LinkifyItNs

const whitelistedURLPatterns = [
    /^https?:\/\//im,
    /^ftps?:\/\//im,
    /^\//im,
    /^mailto:/im,
    /^skype:/im,
    /^callto:/im,
    /^facetime:/im,
    /^git:/im,
    /^irc6?:/im,
    /^news:/im,
    /^nntp:/im,
    /^feed:/im,
    /^cvs:/im,
    /^svn:/im,
    /^mvn:/im,
    /^ssh:/im,
    /^scp:\/\//im,
    /^sftp:\/\//im,
    /^itms:/im,
    /^notes:/im,
    /^hipchat:\/\//im,
    /^sourcetree:/im,
    /^urn:/im,
    /^tel:/im,
    /^xmpp:/im,
    /^telnet:/im,
    /^vnc:/im,
    /^rdp:/im,
    /^whatsapp:/im,
    /^slack:/im,
    /^sips?:/im,
    /^magnet:/im,
]

export const isSafeUrl = (url: string): boolean => {
    return whitelistedURLPatterns.some(p => p.test(url.trim()) === true)
}

export interface Match {
    schema: any
    index: number
    lastIndex: number
    raw: string
    text: string
    url: string
    length?: number
}

const linkify = LinkifyIt()
linkify.add("sourcetree:", "http:")

export function getLinkMatch(str: string): "" | Match | null {
    const match = str && linkify.match(str)
    return match && match[0]
}

/**
 * Adds protocol to url if needed.
 */
export function normalizeUrl(url: string) {
    const match = getLinkMatch(url)
    return (match && match.url) || url
}

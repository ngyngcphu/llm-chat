type MarkdownOptions = {
    stripListLeaders?: boolean;
    listUnicodeChar?: string;
    gfm?: boolean;
    useImgAltText?: boolean;
    abbr?: boolean;
    replaceLinksWithURL?: boolean;
    htmlTagsToSkip?: string[];
};

export function removeMarkdown(md: string, options?: MarkdownOptions): string {
    if (!md) return '';

    options = {
        listUnicodeChar: options?.hasOwnProperty('listUnicodeChar') ? options.listUnicodeChar : '',
        stripListLeaders: options?.hasOwnProperty('stripListLeaders') ? options.stripListLeaders : true,
        gfm: options?.hasOwnProperty('gfm') ? options.gfm : true,
        useImgAltText: options?.hasOwnProperty('useImgAltText') ? options.useImgAltText : true,
        abbr: options?.hasOwnProperty('abbr') ? options.abbr : false,
        replaceLinksWithURL: options?.hasOwnProperty('replaceLinksWithURL') ? options.replaceLinksWithURL : false,
        htmlTagsToSkip: options?.hasOwnProperty('htmlTagsToSkip') ? options.htmlTagsToSkip : []
    };

    let output = md;

    // Remove horizontal rules (moved to the top)
    output = output.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*/gm, '');

    try {
        if (options.stripListLeaders) {
            if (options.listUnicodeChar) output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, options.listUnicodeChar + ' $1');
            else output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, '$1');
        }

        if (options.gfm) {
            // Header
            output = output.replace(/\n={2,}/g, '\n');
            // Fenced codeblocks
            output = output.replace(/~{3}.*\n/g, '');
            // Strikethrough
            output = output.replace(/~~/g, '');
            // Fenced codeblocks
            output = output.replace(/`{3}.*\n/g, '');
        }

        if (options.abbr) {
            output = output.replace(/\*\[.*\]:.*\n/, '');
        }

        output = output
            // Remove HTML tags (using template literals for clarity)
            .replace(/<[^>]*>/g, '');

        let htmlReplaceRegex = new RegExp('<[^>]*>', 'g');
        if (options.htmlTagsToSkip && options.htmlTagsToSkip.length > 0) {
            // Using negative lookahead. Eg. (?!sup|sub) will not match 'sup' and 'sub' tags.
            const joinedHtmlTagsToSkip = options.htmlTagsToSkip.join('|');

            // Adding the lookahead literal with the default regex for html. Eg./<(?!sup|sub)[^>]*>/ig
            htmlReplaceRegex = new RegExp(`<(?!${joinedHtmlTagsToSkip})[^>]*>`, 'ig');
        }

        // Remove various markdown elements based on options
        output = output
            // Remove HTML tags
            .replace(htmlReplaceRegex, '')
            // Remove setext-style headers
            .replace(/^[=\-]{2,}\s*$/g, '')
            // Remove footnotes?
            .replace(/\[\^.+?\](\: .*?$)?/g, '')
            .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
            // Remove images
            .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, options.useImgAltText ? '$1' : '')
            // Remove inline links
            .replace(/\[([^\]]*?)\][\[\(].*?[\]\)]/g, options.replaceLinksWithURL ? '$2' : '$1')
            // Remove blockquotes
            .replace(/^(\n)?\s{0,3}>\s?/gm, '$1')
            // .replace(/(^|\n)\s{0,3}>\s?/g, '\n\n')
            // Remove reference-style links?
            .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
            // Remove atx-style headers
            .replace(/^(\n)?\s{0,}#{1,6}\s*( (.+))? +#+$|^(\n)?\s{0,}#{1,6}\s*( (.+))?$/gm, '$1$3$4$6')
            // Remove * emphasis
            .replace(/([\*]+)(\S)(.*?\S)??\1/g, '$2$3')
            // Remove _ emphasis. Unlike *, _ emphasis gets rendered only if
            //   1. Either there is a whitespace character before opening _ and after closing _.
            //   2. Or _ is at the start/end of the string.
            .replace(/(^|\W)([_]+)(\S)(.*?\S)??\2($|\W)/g, '$1$3$4$5')
            // Remove code blocks
            .replace(/(`{3,})(.*?)\1/gm, '$2')
            // Remove inline code
            .replace(/`(.+?)`/g, '$1')
            // // Replace two or more newlines with exactly two? Not entirely sure this belongs here...
            // .replace(/\n{2,}/g, '\n\n')
            // // Remove newlines in a paragraph
            // .replace(/(\S+)\n\s*(\S+)/g, '$1 $2')
            // Replace strike through
            .replace(/~(.*?)~/g, '$1');
    } catch (e) {
        console.error(e);
    }
    return output;
}

export type MarkdownOptions = {
    stripListLeaders?: boolean;
    listUnicodeChar?: string;
    gfm?: boolean;
    useImgAltText?: boolean;
    abbr?: boolean;
    replaceLinksWithURL?: boolean;
    htmlTagsToSkip?: string[];
};

export type MarkdownData = {
    title?: string | null;
    date?: number | null;
    authors: string[];
    tags: string[];
    tokens?: number | null;
    content?: string | null;
    questions?: string | null;
    answers?: string | null;
};

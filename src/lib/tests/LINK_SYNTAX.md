# Link Syntax for Test Content

This document describes the format for embedding clickable links in test output content.

## Syntax

```
[link:display text](url)
```

- `display text` - The text shown to the user (required)
- `url` - An absolute URL starting with `http://` or `https://` (required)

## Rules

1. **URLs must be absolute** - Relative paths are not supported. Always include the full URL with protocol.
2. **Display text is required** - Cannot be empty.
3. **No nested brackets** - Display text should not contain `]` characters.
4. **No nested parentheses in URL** - URLs should not contain unescaped `)` characters.

## Examples

### Valid

```
[link:View on Facebook](https://facebook.com/example)
[link:https://example.com](https://example.com)
[link:Check canonical URL](https://example.com/page)
```

### Invalid (rendered as plain text)

```
[link:](https://example.com)           # Empty display text
[link:text](example.com)               # Relative URL (no protocol)
[link:text](/path/to/page)             # Relative path
[text](https://example.com)            # Missing "link:" prefix
```

## Usage in Test Definitions

When a test detects a URL-based resource, wrap it using the link syntax:

```typescript
// Good - URL is clickable
content: fbLink ? `[link:${fbLink}](${fbLink})` : null;

// Good - Custom display text
content: href ? `[link:View canonical](${href})` : null;

// Good - Mixed text and links
content: `Found favicon at [link:${icon}](${absoluteIconUrl})`;
```

## Multiple Links

Multiple links can appear in the same content string:

```
Found issues: [link:Page A](https://example.com/a) and [link:Page B](https://example.com/b)
```

## Parser Behavior

- Valid link syntax is rendered as clickable `<a>` elements opening in a new tab
- Invalid or malformed syntax is rendered as plain text (graceful degradation)
- Text outside link syntax is preserved as-is

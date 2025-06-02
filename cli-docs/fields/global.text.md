### Text (`global.text`)
Returns a CMA-compatible field definition for various text types.

| Field        | Type      | Possible Values                                | Default           | Required | Description                                                                 |
|--------------|-----------|------------------------------------------------|-------------------|----------|-----------------------------------------------------------------------------|
| `fieldName`  | `string`  | Any string                                     | `"Description"`   | No       | Display name of the field.                                                  |
| `fieldId`    | `string`  | Any valid field ID                             | `"description"`   | No       | Field ID used in the content model.                                         |
| `required`   | `boolean` | `true`, `false`                                | `false`           | No       | Whether the field is required.                                              |
| `textType`   | `string`  | `"single-line"`, `"multi-line"`, `"markdown"`, `"rich-text"` | `"single-line"` | No       | Type of text input and how it’s rendered in Contentful.                    |
| `emoji`      | `string`  | Emoji key or literal string                    | `""`              | No       | Optional emoji to prefix the field name.                                    |

**Examples by `textType`:**

**Single-line (default):**
```json
{
  "type": "global.text"
}
```

**Single-line (override):**
```json
{
  "type": "global.text",
  "fieldName": "Short Label",
  "fieldId": "shortLabel",
  "textType": "single-line",
  "emoji": "✏️"
}
```

**Multi-line (default):**
```json
{
  "type": "global.text",
  "textType": "multi-line"
}
```

**Multi-line (override):**
```json
{
  "type": "global.text",
  "fieldName": "Summary",
  "fieldId": "summary",
  "textType": "multi-line",
  "emoji": "📄"
}
```

**Markdown (default):**
```json
{
  "type": "global.text",
  "textType": "markdown"
}
```

**Markdown (override):**
```json
{
  "type": "global.text",
  "fieldName": "Body (Markdown)",
  "fieldId": "bodyMarkdown",
  "textType": "markdown",
  "emoji": "📝"
}
```

**Rich-text (default):**
```json
{
  "type": "global.text",
  "textType": "rich-text"
}
```

**Rich-text (override):**
```json
{
  "type": "global.text",
  "fieldName": "Full Body",
  "fieldId": "fullBody",
  "textType": "rich-text",
  "emoji": "📚"
}
```

**Full Content Type Example:**
```json
{
  "id": "article",
  "name": "Article",
  "emoji": "emoji.contentType.contentgroup",
  "entryField": "title",
  "description": "This content type lets you create an article.",
  "fields": [
    {
      "type": "global.title"
    },
    {
      "type": "global.text",
      "fieldName": "Summary",
      "fieldId": "summary",
      "textType": "multi-line",
      "emoji": "📄"
    },
    {
      "type": "global.text",
      "fieldName": "Body (Markdown)",
      "fieldId": "bodyMarkdown",
      "textType": "markdown",
      "emoji": "📝"
    },
    {
      "type": "global.text",
      "fieldName": "Full Body",
      "fieldId": "fullBody",
      "textType": "rich-text",
      "emoji": "📚"
    }
  ]
}
```

<br>

[<- Back to all fields](./README.md)

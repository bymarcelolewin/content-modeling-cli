### URL (`url`)
Returns a CMA-compatible Symbol field for URL or path validation.

| Field        | Type      | Possible Values          | Default           | Required | Description                                                                 |
|--------------|-----------|--------------------------|-------------------|----------|-----------------------------------------------------------------------------|
| `fieldName`  | `string`  | Any string               | `"URL or Path"`   | No       | Display name of the field.                                                  |
| `fieldId`    | `string`  | Any valid field ID       | `"urlOrPath"`     | No       | Field ID used in the content model.                                         |
| `required`   | `boolean` | `true`, `false`          | `true`            | No       | Whether the field is required.                                              |
| `validate`   | `string`  | `"url"`, `"path"`, `"both"` | `"both"`       | No       | Type of value to validate—URL, path, or both.                              |
| `emoji`      | `string`  | Emoji key or literal     | `""`              | No       | Optional emoji to prefix the field name.                                    |

**Example with overrides:**

```json
{
  "type": "url",
  "fieldName": "Article URL",
  "fieldId": "articleURL",
  "validate": "path",
  "emoji": "🔗"
}
```

**Example with defaults:**
```json
{
  "type": "url"
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
      "type": "title"
    },
    {
      "type": "url",
      "fieldName": "Article URL",
      "fieldId": "articleURL",
      "validate": "path",
      "emoji": "🔗"
    }
  ]
}
```

<br>

[<- Back to all fields](./README.md)

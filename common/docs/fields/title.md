### Title (`title`)
Returns a CMA-compatible Symbol field intended for content titles.

| Field        | Type      | Possible Values     | Default     | Required | Description                                                                 |
|--------------|-----------|---------------------|-------------|----------|-----------------------------------------------------------------------------|
| `fieldName`  | `string`  | Any string          | `"Title"`   | No       | Display name of the field.                                                  |
| `fieldId`    | `string`  | Any valid field ID  | `"title"`   | No       | Field ID used in the content model.                                         |
| `required`   | `boolean` | `true`, `false`     | `true`      | No       | Whether the field is required.                                              |
| `emoji`      | `string`  | Emoji key or literal| `""`        | No       | Optional emoji to prefix the field name.                                    |

**Example with overrides:**

```json
{
  "type": "title",
  "fieldName": "Headline",
  "fieldId": "headline",
  "emoji": "📰"
}
```

**Example with defaults:**
```json
{
  "type": "title"
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
      "type": "title",
      "fieldName": "Headline",
      "fieldId": "headline",
      "emoji": "📰"
    }
  ]
}
```

<br>

[<- Back to all fields](./README.md)

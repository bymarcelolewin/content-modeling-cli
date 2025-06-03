### Code ID (`codeId`)
Creates a developer-friendly ID field for your developers to use in entries.

| Field        | Type      | Possible Values               | Default                    | Required | Description                                                         |
|--------------|-----------|-------------------------------|----------------------------|----------|---------------------------------------------------------------------|
| `fieldName`  | `string`  | Any string                    | `"Code ID"`                | No       | Display name of the field.                                          |
| `fieldId`    | `string`  | Any valid field ID            | `"codeId"`                 | No       | Field ID used in the content model.                                 |
| `required`   | `boolean` | `true`, `false`               | `true`                     | No       | Whether the field is required.                                      |
| `unique`     | `boolean` | `true`, `false`               | `true`                     | No       | Whether the field value must be unique.                             |
| `validate`   | `string`  | `"camelCase"`, `"snake_case"` | `"camelCase"`              | No       | Validation type for the field’s value.                              |
| `emoji`      | `string`  | Emoji key or literal string   | `"emoji.field.developer"` | No       | Optional emoji to prefix the field name.                            |

**Example with overrides:**

```json
{
  "type": "codeId",
  "fieldName": "Content Block ID",
  "fieldId": "contentBlockId",
  "validate": "snake_case",
  "emoji": "emoji.field.developer"
}
```

**Example with defaults:**
```json
{
  "type": "codeId"
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
      "type": "codeId"
    }
  ]
}
```

<br>

[<- Back to all fields](./README.md)

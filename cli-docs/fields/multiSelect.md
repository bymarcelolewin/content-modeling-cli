### Multi-Select (`multiSelect`)
Returns a CMA-compatible Array field with Symbol items and value restrictions.

| Field           | Type              | Possible Values           | Default     | Required | Description                                                                  |
|----------------|-------------------|---------------------------|-------------|----------|------------------------------------------------------------------------------|
| `fieldName`     | `string`          | Any string                | `"Tags"`    | No       | Display name of the field.                                                   |
| `fieldId`       | `string`          | Any valid field ID        | `"tags"`    | No       | Field ID used in the content model.                                          |
| `required`      | `boolean`         | `true`, `false`           | `false`     | No       | Whether the field is required.                                               |
| `options`       | `Array<string>`   | Any list of strings       | `[]`        | Yes      | Allowed string values for the multi-select field. Must be non-empty.         |
| `defaultValues` | `Array<string>`   | Must be subset of options | `undefined` | No       | Optional default values to preselect. Must exist in `options`.               |
| `emoji`         | `string`          | Emoji key or literal      | `""`        | No       | Optional emoji to prefix the field name.                                     |

**Example with overrides:**

```json
{
  "type": "multiSelect",
  "fieldName": "Topics",
  "fieldId": "topics",
  "options": ["Design", "Engineering", "Marketing"],
  "defaultValues": ["Design", "Marketing"],
  "emoji": "🧩"
}
```

**Example with defaults:**
```json
{
  "type": "multiSelect",
  "options": ["One", "Two"]
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
      "type": "multiSelect",
      "fieldName": "Topics",
      "fieldId": "topics",
      "options": ["Design", "Engineering", "Marketing"],
      "defaultValues": ["Design", "Marketing"],
      "emoji": "🧩"
    }
  ]
}
```

<br>

[<- Back to all fields](./README.md)

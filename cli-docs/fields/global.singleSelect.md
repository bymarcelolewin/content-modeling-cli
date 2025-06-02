### Single Select (`global.singleSelect`)
Returns a CMA-compatible Symbol field with a single-select value from a list.

| Field          | Type            | Possible Values           | Default       | Required | Description                                                                  |
|----------------|-----------------|---------------------------|---------------|----------|------------------------------------------------------------------------------|
| `fieldName`     | `string`        | Any string                | `"Category"`  | No       | Display name of the field.                                                   |
| `fieldId`       | `string`        | Any valid field ID        | `"category"`  | No       | Field ID used in the content model.                                          |
| `required`      | `boolean`       | `true`, `false`           | `false`       | No       | Whether the field is required.                                               |
| `options`       | `Array<string>` | Any list of strings       | `[]`          | Yes      | Allowed string values for the single-select field. Must be non-empty.        |
| `defaultValue`  | `string`        | Must be in `options`      | `undefined`   | No       | Optional default value to preselect. Must exist in `options`.                |
| `emoji`         | `string`        | Emoji key or literal      | `""`          | No       | Optional emoji to prefix the field name.                                     |

**Example with overrides:**

```json
{
  "type": "global.singleSelect",
  "fieldName": "Post Type",
  "fieldId": "postType",
  "options": ["News", "Tutorial", "Update"],
  "defaultValue": "Tutorial",
  "emoji": "📂"
}
```

**Example with defaults:**
```json
{
  "type": "global.singleSelect",
  "options": ["Small", "Medium", "Large"]
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
      "type": "global.singleSelect",
      "options": ["Small", "Medium", "Large"]
    }
  ]
}
```

<br>

[<- Back to all fields](./README.md)

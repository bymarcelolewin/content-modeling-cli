### Reference (`reference`)
Returns a CMA-compatible reference field for entries.

| Field                 | Type            | Possible Values                                           | Default          | Required | Description                                                                 |
|----------------------|-----------------|-----------------------------------------------------------|------------------|----------|-----------------------------------------------------------------------------|
| `fieldId`            | `string`        | Any valid field ID                                        | `"metadata"`     | No       | ID of the field.                                                            |
| `fieldName`          | `string`        | Any string                                                | `"Metadata"`     | No       | Display name of the field.                                                  |
| `allowedEntries`     | `string`        | `"one"`, `"zero-to-one"`, `"one-to-many"`, `"zero-to-many"` | `"one-to-many"`  | No       | Controls single vs. multi reference and required status.                    |
| `allowedContentTypes`| `Array<string>` | Array of content type IDs                                 | `[]`             | Yes      | List of allowed content type IDs for the reference.                         |
| `emoji`              | `string`        | Emoji key or literal string                               | `""`             | No       | Optional emoji to prefix the field name.                                    |

**Example with overrides:**

```json
{
  "type": "reference",
  "fieldName": "Related Articles",
  "fieldId": "relatedArticles",
  "allowedEntries": "zero-to-many",
  "allowedContentTypes": ["article", "caseStudy"],
  "emoji": "📎"
}
```

**Example with defaults:**
```json
{
  "type": "reference",
  "allowedContentTypes": ["referenceType"]
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
      "type": "reference",
      "fieldName": "Related Articles",
      "fieldId": "relatedArticles",
      "allowedEntries": "zero-to-many",
      "allowedContentTypes": ["article", "caseStudy"],
      "emoji": "📎"
    }
  ]
}
```

<br>

[<- Back to all fields](./README.md)

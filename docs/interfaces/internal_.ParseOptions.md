# Interface: ParseOptions

[\<internal\>](../modules/internal_.md).ParseOptions

## Properties

### emptyTag

• `Optional` **emptyTag**: [`EmptyTag`](../modules/internal_.md#emptytag)

When parsing XML the empty tags are replaced by '' - this is the default
behavior of fast-ml-parser. When this variable is set to any other value,
the empty tags are futher replaced by that value, overriding default ''.

___

### xmlOptions

• `Optional` **xmlOptions**: `Partial`\<`X2jOptions`\>

Additional parse options for XML parser. Any option of fast-xml-parser
can be used here. This object is passed to the constructor of
fast-xml-parser. Then parser is used to parse XML response from GUS.

See [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser/blob/HEAD/docs/v4/2.XMLparseOptions.md)

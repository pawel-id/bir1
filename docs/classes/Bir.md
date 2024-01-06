# Class: Bir

Class Bir provides access to REGON API

**`Example`**

```js
  import Bir from 'bir1'
  const bir = new Bir()
  await bir.login()
  console.log(await bir.search({ nip: '5261040567' }))
  // output:
  // {
  //   regon: '011417295',
  //   nip: '5261040567',
  //   statusNip: '',
  //   nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA',
  //   ...
  // }
```

## Constructors

### constructor

• **new Bir**(`options?`): [`Bir`](Bir.md)

Create a new Bir instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.key?` | `string` | API key provided by GUS. **`Remarks`** If `options.key` is not provided, the internally stored public API key is used to access non-production GUS database. It allows quick start, however non-production database contains old and anonymized data. Providing GUS provided key connects to the production database. |
| `options.parseOptions?` | [`ParseOptions`](../interfaces/internal_.ParseOptions.md) | Additional parse options for XML parser |

#### Returns

[`Bir`](Bir.md)

#### Defined in

[bir.ts:53](https://github.com/pawel-id/bir1/blob/140054f/src/bir.ts#L53)

## Methods

### login

▸ **login**(): `Promise`\<`void`\>

Login to the API (method: Zaloguj)

#### Returns

`Promise`\<`void`\>

**`Remarks`**

This method must be called before any other method. It is not called
automatically to allow for more control over the login process.

#### Defined in

[bir.ts:113](https://github.com/pawel-id/bir1/blob/140054f/src/bir.ts#L113)

___

### value

▸ **value**(`value`): `Promise`\<`string`\>

Get diagnostic information (method: GetValue)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`GetValueOptions`](../modules/internal_.md#getvalueoptions) | value to retrieve |

#### Returns

`Promise`\<`string`\>

#### Defined in

[bir.ts:126](https://github.com/pawel-id/bir1/blob/140054f/src/bir.ts#L126)

___

### search

▸ **search**(`query`): `Promise`\<`any`\>

Search (method: DaneSzukajPodmioty)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | \{ `nip`: `string`  } \| \{ `regon`: `string`  } \| \{ `krs`: `string`  } |

#### Returns

`Promise`\<`any`\>

**`Remarks`**

Only one of the query parameters can be used at a time.

#### Defined in

[bir.ts:142](https://github.com/pawel-id/bir1/blob/140054f/src/bir.ts#L142)

___

### report

▸ **report**(`query`): `Promise`\<`any`\>

Retrive report (method: DanePobierzPelnyRaport)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `Object` | - |
| `query.regon` | `string` | REGON number |
| `query.report` | [`DanePobierzPelnyRaportOptions`](../modules/internal_.md#danepobierzpelnyraportoptions) | report name |

#### Returns

`Promise`\<`any`\>

#### Defined in

[bir.ts:153](https://github.com/pawel-id/bir1/blob/140054f/src/bir.ts#L153)

___

### summary

▸ **summary**(`query`): `Promise`\<`any`\>

Retrive summary report (method: DanePobierzRaportZbiorczy)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `Object` | - |
| `query.date` | `string` | date in format YYYY-MM-DD not earlier than week before |
| `query.report` | [`DanePobierzRaportZbiorczyOptions`](../modules/internal_.md#danepobierzraportzbiorczyoptions) | report name |

#### Returns

`Promise`\<`any`\>

#### Defined in

[bir.ts:167](https://github.com/pawel-id/bir1/blob/140054f/src/bir.ts#L167)

___

### logout

▸ **logout**(): `Promise`\<`void`\>

Logout (method: Wyloguj)

#### Returns

`Promise`\<`void`\>

#### Defined in

[bir.ts:179](https://github.com/pawel-id/bir1/blob/140054f/src/bir.ts#L179)

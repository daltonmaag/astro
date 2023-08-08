import type { AstroComponentMetadata } from '../../@types/astro';

type ValueOf<T> = T[keyof T];

const PROP_TYPE = {
	Value: 0,
	JSON: 1, // Actually means Array
	RegExp: 2,
	Date: 3,
	Map: 4,
	Set: 5,
	BigInt: 6,
	URL: 7,
	Uint8Array: 8,
	Uint16Array: 9,
	Uint32Array: 10,
};

function serializeArray(
	value: any[],
	metadata: AstroComponentMetadata | Record<string, any> = {},
	parents = new WeakSet<any>()
): any[] {
	if (parents.has(value)) {
		throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
	}
	parents.add(value);
	const serialized = value.map((v) => {
		return convertToSerializedForm(v, metadata, parents);
	});
	parents.delete(value);
	return serialized;
}

function serializeObject(
	value: Record<any, any>,
	metadata: AstroComponentMetadata | Record<string, any> = {},
	parents = new WeakSet<any>()
): Record<any, any> {
	if (parents.has(value)) {
		throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
	}
	parents.add(value);
	const serialized = Object.fromEntries(
		Object.entries(value).map(([k, v]) => {
			return [k, convertToSerializedForm(v, metadata, parents)];
		})
	);
	parents.delete(value);
	return serialized;
}

function convertToSerializedForm(
	value: any,
	metadata: AstroComponentMetadata | Record<string, any> = {},
	parents = new WeakSet<any>()
): [ValueOf<typeof PROP_TYPE>, any] | [ValueOf<typeof PROP_TYPE>] {
	const tag = Object.prototype.toString.call(value);
	switch (tag) {
		case '[object Date]': {
			return [PROP_TYPE.Date, (value as Date).toISOString()];
		}
		case '[object RegExp]': {
			return [PROP_TYPE.RegExp, (value as RegExp).source];
		}
		case '[object Map]': {
			return [PROP_TYPE.Map, serializeArray(Array.from(value as Map<any, any>), metadata, parents)];
		}
		case '[object Set]': {
			return [PROP_TYPE.Set, serializeArray(Array.from(value as Set<any>), metadata, parents)];
		}
		case '[object BigInt]': {
			return [PROP_TYPE.BigInt, (value as bigint).toString()];
		}
		case '[object URL]': {
			return [PROP_TYPE.URL, (value as URL).toString()];
		}
		case '[object Array]': {
			return [PROP_TYPE.JSON, serializeArray(value, metadata, parents)];
		}
		case '[object Uint8Array]': {
			return [PROP_TYPE.Uint8Array, Array.from(value as Uint8Array)];
		}
		case '[object Uint16Array]': {
			return [PROP_TYPE.Uint16Array, Array.from(value as Uint16Array)];
		}
		case '[object Uint32Array]': {
			return [PROP_TYPE.Uint32Array, Array.from(value as Uint32Array)];
		}
		default: {
			if (value !== null && typeof value === 'object') {
				return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
			} else if (value === undefined) {
				return [PROP_TYPE.Value];
			} else {
				return [PROP_TYPE.Value, value];
			}
		}
	}
}

export function serializeProps(props: any, metadata: AstroComponentMetadata) {
	const serialized = JSON.stringify(serializeObject(props, metadata));
	return serialized;
}

interface PropTypeSelector {
	[k: string]: (value: any) => any;
}
const propTypes: PropTypeSelector = {
	0: (value) => reviveObject(value),
	1: (value) => reviveArray(value),
	2: (value) => new RegExp(value),
	3: (value) => new Date(value),
	4: (value) => new Map(reviveArray(value)),
	5: (value) => new Set(reviveArray(value)),
	6: (value) => BigInt(value),
	7: (value) => new URL(value),
	8: (value) => new Uint8Array(value),
	9: (value) => new Uint16Array(value),
	10: (value) => new Uint32Array(value),
};

// Not using JSON.parse reviver because it's bottom-up but we want top-down
const reviveTuple = (raw: any): any => {
	const [type, value] = raw;
	return type in propTypes ? propTypes[type](value) : undefined;
};

const reviveArray = (raw: any): any => (raw as Array<any>).map(reviveTuple);

export const reviveObject = (raw: any): any => {
	if (typeof raw !== 'object' || raw === null) return raw;
	return Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, reviveTuple(value)]));
};

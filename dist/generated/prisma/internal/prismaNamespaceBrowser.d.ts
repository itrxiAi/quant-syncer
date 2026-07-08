import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly Bar: "Bar";
    readonly BarRaw: "BarRaw";
    readonly Calendar: "Calendar";
    readonly Index: "Index";
    readonly IndexMember: "IndexMember";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const BarScalarFieldEnum: {
    readonly ts: "ts";
    readonly symbol: "symbol";
    readonly asset: "asset";
    readonly freq: "freq";
    readonly open: "open";
    readonly high: "high";
    readonly low: "low";
    readonly close: "close";
    readonly volume: "volume";
    readonly amount: "amount";
    readonly factor: "factor";
    readonly takerBuyBaseVolume: "takerBuyBaseVolume";
    readonly vendor: "vendor";
    readonly ingestTs: "ingestTs";
};
export type BarScalarFieldEnum = (typeof BarScalarFieldEnum)[keyof typeof BarScalarFieldEnum];
export declare const BarRawScalarFieldEnum: {
    readonly ts: "ts";
    readonly symbol: "symbol";
    readonly asset: "asset";
    readonly freq: "freq";
    readonly vendor: "vendor";
    readonly data: "data";
    readonly ingestTs: "ingestTs";
};
export type BarRawScalarFieldEnum = (typeof BarRawScalarFieldEnum)[keyof typeof BarRawScalarFieldEnum];
export declare const CalendarScalarFieldEnum: {
    readonly date: "date";
    readonly isOpen: "isOpen";
    readonly asset: "asset";
};
export type CalendarScalarFieldEnum = (typeof CalendarScalarFieldEnum)[keyof typeof CalendarScalarFieldEnum];
export declare const IndexScalarFieldEnum: {
    readonly code: "code";
    readonly name: "name";
    readonly asset: "asset";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type IndexScalarFieldEnum = (typeof IndexScalarFieldEnum)[keyof typeof IndexScalarFieldEnum];
export declare const IndexMemberScalarFieldEnum: {
    readonly indexCode: "indexCode";
    readonly symbol: "symbol";
    readonly inDate: "inDate";
    readonly outDate: "outDate";
};
export type IndexMemberScalarFieldEnum = (typeof IndexMemberScalarFieldEnum)[keyof typeof IndexMemberScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly AnyNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

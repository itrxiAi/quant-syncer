import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type BarRawModel = runtime.Types.Result.DefaultSelection<Prisma.$BarRawPayload>;
export type AggregateBarRaw = {
    _count: BarRawCountAggregateOutputType | null;
    _min: BarRawMinAggregateOutputType | null;
    _max: BarRawMaxAggregateOutputType | null;
};
export type BarRawMinAggregateOutputType = {
    ts: Date | null;
    symbol: string | null;
    asset: $Enums.Asset | null;
    freq: $Enums.Freq | null;
    vendor: string | null;
    ingestTs: Date | null;
};
export type BarRawMaxAggregateOutputType = {
    ts: Date | null;
    symbol: string | null;
    asset: $Enums.Asset | null;
    freq: $Enums.Freq | null;
    vendor: string | null;
    ingestTs: Date | null;
};
export type BarRawCountAggregateOutputType = {
    ts: number;
    symbol: number;
    asset: number;
    freq: number;
    vendor: number;
    data: number;
    ingestTs: number;
    _all: number;
};
export type BarRawMinAggregateInputType = {
    ts?: true;
    symbol?: true;
    asset?: true;
    freq?: true;
    vendor?: true;
    ingestTs?: true;
};
export type BarRawMaxAggregateInputType = {
    ts?: true;
    symbol?: true;
    asset?: true;
    freq?: true;
    vendor?: true;
    ingestTs?: true;
};
export type BarRawCountAggregateInputType = {
    ts?: true;
    symbol?: true;
    asset?: true;
    freq?: true;
    vendor?: true;
    data?: true;
    ingestTs?: true;
    _all?: true;
};
export type BarRawAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BarRawWhereInput;
    orderBy?: Prisma.BarRawOrderByWithRelationInput | Prisma.BarRawOrderByWithRelationInput[];
    cursor?: Prisma.BarRawWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BarRawCountAggregateInputType;
    _min?: BarRawMinAggregateInputType;
    _max?: BarRawMaxAggregateInputType;
};
export type GetBarRawAggregateType<T extends BarRawAggregateArgs> = {
    [P in keyof T & keyof AggregateBarRaw]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBarRaw[P]> : Prisma.GetScalarType<T[P], AggregateBarRaw[P]>;
};
export type BarRawGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BarRawWhereInput;
    orderBy?: Prisma.BarRawOrderByWithAggregationInput | Prisma.BarRawOrderByWithAggregationInput[];
    by: Prisma.BarRawScalarFieldEnum[] | Prisma.BarRawScalarFieldEnum;
    having?: Prisma.BarRawScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BarRawCountAggregateInputType | true;
    _min?: BarRawMinAggregateInputType;
    _max?: BarRawMaxAggregateInputType;
};
export type BarRawGroupByOutputType = {
    ts: Date;
    symbol: string;
    asset: $Enums.Asset;
    freq: $Enums.Freq;
    vendor: string;
    data: runtime.JsonValue;
    ingestTs: Date;
    _count: BarRawCountAggregateOutputType | null;
    _min: BarRawMinAggregateOutputType | null;
    _max: BarRawMaxAggregateOutputType | null;
};
type GetBarRawGroupByPayload<T extends BarRawGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BarRawGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BarRawGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BarRawGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BarRawGroupByOutputType[P]>;
}>>;
export type BarRawWhereInput = {
    AND?: Prisma.BarRawWhereInput | Prisma.BarRawWhereInput[];
    OR?: Prisma.BarRawWhereInput[];
    NOT?: Prisma.BarRawWhereInput | Prisma.BarRawWhereInput[];
    ts?: Prisma.DateTimeFilter<"BarRaw"> | Date | string;
    symbol?: Prisma.StringFilter<"BarRaw"> | string;
    asset?: Prisma.EnumAssetFilter<"BarRaw"> | $Enums.Asset;
    freq?: Prisma.EnumFreqFilter<"BarRaw"> | $Enums.Freq;
    vendor?: Prisma.StringFilter<"BarRaw"> | string;
    data?: Prisma.JsonFilter<"BarRaw">;
    ingestTs?: Prisma.DateTimeFilter<"BarRaw"> | Date | string;
};
export type BarRawOrderByWithRelationInput = {
    ts?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    freq?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    ingestTs?: Prisma.SortOrder;
};
export type BarRawWhereUniqueInput = Prisma.AtLeast<{
    ts_symbol_asset_freq_vendor?: Prisma.BarRawTsSymbolAssetFreqVendorCompoundUniqueInput;
    AND?: Prisma.BarRawWhereInput | Prisma.BarRawWhereInput[];
    OR?: Prisma.BarRawWhereInput[];
    NOT?: Prisma.BarRawWhereInput | Prisma.BarRawWhereInput[];
    ts?: Prisma.DateTimeFilter<"BarRaw"> | Date | string;
    symbol?: Prisma.StringFilter<"BarRaw"> | string;
    asset?: Prisma.EnumAssetFilter<"BarRaw"> | $Enums.Asset;
    freq?: Prisma.EnumFreqFilter<"BarRaw"> | $Enums.Freq;
    vendor?: Prisma.StringFilter<"BarRaw"> | string;
    data?: Prisma.JsonFilter<"BarRaw">;
    ingestTs?: Prisma.DateTimeFilter<"BarRaw"> | Date | string;
}, "ts_symbol_asset_freq_vendor">;
export type BarRawOrderByWithAggregationInput = {
    ts?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    freq?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    ingestTs?: Prisma.SortOrder;
    _count?: Prisma.BarRawCountOrderByAggregateInput;
    _max?: Prisma.BarRawMaxOrderByAggregateInput;
    _min?: Prisma.BarRawMinOrderByAggregateInput;
};
export type BarRawScalarWhereWithAggregatesInput = {
    AND?: Prisma.BarRawScalarWhereWithAggregatesInput | Prisma.BarRawScalarWhereWithAggregatesInput[];
    OR?: Prisma.BarRawScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BarRawScalarWhereWithAggregatesInput | Prisma.BarRawScalarWhereWithAggregatesInput[];
    ts?: Prisma.DateTimeWithAggregatesFilter<"BarRaw"> | Date | string;
    symbol?: Prisma.StringWithAggregatesFilter<"BarRaw"> | string;
    asset?: Prisma.EnumAssetWithAggregatesFilter<"BarRaw"> | $Enums.Asset;
    freq?: Prisma.EnumFreqWithAggregatesFilter<"BarRaw"> | $Enums.Freq;
    vendor?: Prisma.StringWithAggregatesFilter<"BarRaw"> | string;
    data?: Prisma.JsonWithAggregatesFilter<"BarRaw">;
    ingestTs?: Prisma.DateTimeWithAggregatesFilter<"BarRaw"> | Date | string;
};
export type BarRawCreateInput = {
    ts: Date | string;
    symbol: string;
    asset: $Enums.Asset;
    freq: $Enums.Freq;
    vendor: string;
    data: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ingestTs?: Date | string;
};
export type BarRawUncheckedCreateInput = {
    ts: Date | string;
    symbol: string;
    asset: $Enums.Asset;
    freq: $Enums.Freq;
    vendor: string;
    data: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ingestTs?: Date | string;
};
export type BarRawUpdateInput = {
    ts?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    freq?: Prisma.EnumFreqFieldUpdateOperationsInput | $Enums.Freq;
    vendor?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ingestTs?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BarRawUncheckedUpdateInput = {
    ts?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    freq?: Prisma.EnumFreqFieldUpdateOperationsInput | $Enums.Freq;
    vendor?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ingestTs?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BarRawCreateManyInput = {
    ts: Date | string;
    symbol: string;
    asset: $Enums.Asset;
    freq: $Enums.Freq;
    vendor: string;
    data: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ingestTs?: Date | string;
};
export type BarRawUpdateManyMutationInput = {
    ts?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    freq?: Prisma.EnumFreqFieldUpdateOperationsInput | $Enums.Freq;
    vendor?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ingestTs?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BarRawUncheckedUpdateManyInput = {
    ts?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    freq?: Prisma.EnumFreqFieldUpdateOperationsInput | $Enums.Freq;
    vendor?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ingestTs?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BarRawTsSymbolAssetFreqVendorCompoundUniqueInput = {
    ts: Date | string;
    symbol: string;
    asset: $Enums.Asset;
    freq: $Enums.Freq;
    vendor: string;
};
export type BarRawCountOrderByAggregateInput = {
    ts?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    freq?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    ingestTs?: Prisma.SortOrder;
};
export type BarRawMaxOrderByAggregateInput = {
    ts?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    freq?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
    ingestTs?: Prisma.SortOrder;
};
export type BarRawMinOrderByAggregateInput = {
    ts?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    freq?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
    ingestTs?: Prisma.SortOrder;
};
export type BarRawSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ts?: boolean;
    symbol?: boolean;
    asset?: boolean;
    freq?: boolean;
    vendor?: boolean;
    data?: boolean;
    ingestTs?: boolean;
}, ExtArgs["result"]["barRaw"]>;
export type BarRawSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ts?: boolean;
    symbol?: boolean;
    asset?: boolean;
    freq?: boolean;
    vendor?: boolean;
    data?: boolean;
    ingestTs?: boolean;
}, ExtArgs["result"]["barRaw"]>;
export type BarRawSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ts?: boolean;
    symbol?: boolean;
    asset?: boolean;
    freq?: boolean;
    vendor?: boolean;
    data?: boolean;
    ingestTs?: boolean;
}, ExtArgs["result"]["barRaw"]>;
export type BarRawSelectScalar = {
    ts?: boolean;
    symbol?: boolean;
    asset?: boolean;
    freq?: boolean;
    vendor?: boolean;
    data?: boolean;
    ingestTs?: boolean;
};
export type BarRawOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ts" | "symbol" | "asset" | "freq" | "vendor" | "data" | "ingestTs", ExtArgs["result"]["barRaw"]>;
export type $BarRawPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BarRaw";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ts: Date;
        symbol: string;
        asset: $Enums.Asset;
        freq: $Enums.Freq;
        vendor: string;
        data: runtime.JsonValue;
        ingestTs: Date;
    }, ExtArgs["result"]["barRaw"]>;
    composites: {};
};
export type BarRawGetPayload<S extends boolean | null | undefined | BarRawDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BarRawPayload, S>;
export type BarRawCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BarRawFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BarRawCountAggregateInputType | true;
};
export interface BarRawDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BarRaw'];
        meta: {
            name: 'BarRaw';
        };
    };
    findUnique<T extends BarRawFindUniqueArgs>(args: Prisma.SelectSubset<T, BarRawFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BarRawClient<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BarRawFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BarRawFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BarRawClient<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BarRawFindFirstArgs>(args?: Prisma.SelectSubset<T, BarRawFindFirstArgs<ExtArgs>>): Prisma.Prisma__BarRawClient<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BarRawFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BarRawFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BarRawClient<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BarRawFindManyArgs>(args?: Prisma.SelectSubset<T, BarRawFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BarRawCreateArgs>(args: Prisma.SelectSubset<T, BarRawCreateArgs<ExtArgs>>): Prisma.Prisma__BarRawClient<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BarRawCreateManyArgs>(args?: Prisma.SelectSubset<T, BarRawCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BarRawCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BarRawCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BarRawDeleteArgs>(args: Prisma.SelectSubset<T, BarRawDeleteArgs<ExtArgs>>): Prisma.Prisma__BarRawClient<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BarRawUpdateArgs>(args: Prisma.SelectSubset<T, BarRawUpdateArgs<ExtArgs>>): Prisma.Prisma__BarRawClient<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BarRawDeleteManyArgs>(args?: Prisma.SelectSubset<T, BarRawDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BarRawUpdateManyArgs>(args: Prisma.SelectSubset<T, BarRawUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BarRawUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BarRawUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BarRawUpsertArgs>(args: Prisma.SelectSubset<T, BarRawUpsertArgs<ExtArgs>>): Prisma.Prisma__BarRawClient<runtime.Types.Result.GetResult<Prisma.$BarRawPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BarRawCountArgs>(args?: Prisma.Subset<T, BarRawCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BarRawCountAggregateOutputType> : number>;
    aggregate<T extends BarRawAggregateArgs>(args: Prisma.Subset<T, BarRawAggregateArgs>): Prisma.PrismaPromise<GetBarRawAggregateType<T>>;
    groupBy<T extends BarRawGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BarRawGroupByArgs['orderBy'];
    } : {
        orderBy?: BarRawGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BarRawGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBarRawGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BarRawFieldRefs;
}
export interface Prisma__BarRawClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BarRawFieldRefs {
    readonly ts: Prisma.FieldRef<"BarRaw", 'DateTime'>;
    readonly symbol: Prisma.FieldRef<"BarRaw", 'String'>;
    readonly asset: Prisma.FieldRef<"BarRaw", 'Asset'>;
    readonly freq: Prisma.FieldRef<"BarRaw", 'Freq'>;
    readonly vendor: Prisma.FieldRef<"BarRaw", 'String'>;
    readonly data: Prisma.FieldRef<"BarRaw", 'Json'>;
    readonly ingestTs: Prisma.FieldRef<"BarRaw", 'DateTime'>;
}
export type BarRawFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelect<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    where: Prisma.BarRawWhereUniqueInput;
};
export type BarRawFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelect<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    where: Prisma.BarRawWhereUniqueInput;
};
export type BarRawFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelect<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    where?: Prisma.BarRawWhereInput;
    orderBy?: Prisma.BarRawOrderByWithRelationInput | Prisma.BarRawOrderByWithRelationInput[];
    cursor?: Prisma.BarRawWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BarRawScalarFieldEnum | Prisma.BarRawScalarFieldEnum[];
};
export type BarRawFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelect<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    where?: Prisma.BarRawWhereInput;
    orderBy?: Prisma.BarRawOrderByWithRelationInput | Prisma.BarRawOrderByWithRelationInput[];
    cursor?: Prisma.BarRawWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BarRawScalarFieldEnum | Prisma.BarRawScalarFieldEnum[];
};
export type BarRawFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelect<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    where?: Prisma.BarRawWhereInput;
    orderBy?: Prisma.BarRawOrderByWithRelationInput | Prisma.BarRawOrderByWithRelationInput[];
    cursor?: Prisma.BarRawWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BarRawScalarFieldEnum | Prisma.BarRawScalarFieldEnum[];
};
export type BarRawCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelect<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BarRawCreateInput, Prisma.BarRawUncheckedCreateInput>;
};
export type BarRawCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BarRawCreateManyInput | Prisma.BarRawCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BarRawCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    data: Prisma.BarRawCreateManyInput | Prisma.BarRawCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BarRawUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelect<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BarRawUpdateInput, Prisma.BarRawUncheckedUpdateInput>;
    where: Prisma.BarRawWhereUniqueInput;
};
export type BarRawUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BarRawUpdateManyMutationInput, Prisma.BarRawUncheckedUpdateManyInput>;
    where?: Prisma.BarRawWhereInput;
    limit?: number;
};
export type BarRawUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BarRawUpdateManyMutationInput, Prisma.BarRawUncheckedUpdateManyInput>;
    where?: Prisma.BarRawWhereInput;
    limit?: number;
};
export type BarRawUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelect<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    where: Prisma.BarRawWhereUniqueInput;
    create: Prisma.XOR<Prisma.BarRawCreateInput, Prisma.BarRawUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BarRawUpdateInput, Prisma.BarRawUncheckedUpdateInput>;
};
export type BarRawDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelect<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
    where: Prisma.BarRawWhereUniqueInput;
};
export type BarRawDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BarRawWhereInput;
    limit?: number;
};
export type BarRawDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarRawSelect<ExtArgs> | null;
    omit?: Prisma.BarRawOmit<ExtArgs> | null;
};
export {};

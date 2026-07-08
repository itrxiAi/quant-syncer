import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type BarModel = runtime.Types.Result.DefaultSelection<Prisma.$BarPayload>;
export type AggregateBar = {
    _count: BarCountAggregateOutputType | null;
    _avg: BarAvgAggregateOutputType | null;
    _sum: BarSumAggregateOutputType | null;
    _min: BarMinAggregateOutputType | null;
    _max: BarMaxAggregateOutputType | null;
};
export type BarAvgAggregateOutputType = {
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
    volume: number | null;
    amount: number | null;
    factor: number | null;
    takerBuyBaseVolume: number | null;
};
export type BarSumAggregateOutputType = {
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
    volume: number | null;
    amount: number | null;
    factor: number | null;
    takerBuyBaseVolume: number | null;
};
export type BarMinAggregateOutputType = {
    ts: Date | null;
    symbol: string | null;
    asset: $Enums.Asset | null;
    freq: $Enums.Freq | null;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
    volume: number | null;
    amount: number | null;
    factor: number | null;
    takerBuyBaseVolume: number | null;
    vendor: string | null;
    ingestTs: Date | null;
};
export type BarMaxAggregateOutputType = {
    ts: Date | null;
    symbol: string | null;
    asset: $Enums.Asset | null;
    freq: $Enums.Freq | null;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
    volume: number | null;
    amount: number | null;
    factor: number | null;
    takerBuyBaseVolume: number | null;
    vendor: string | null;
    ingestTs: Date | null;
};
export type BarCountAggregateOutputType = {
    ts: number;
    symbol: number;
    asset: number;
    freq: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    amount: number;
    factor: number;
    takerBuyBaseVolume: number;
    vendor: number;
    ingestTs: number;
    _all: number;
};
export type BarAvgAggregateInputType = {
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    volume?: true;
    amount?: true;
    factor?: true;
    takerBuyBaseVolume?: true;
};
export type BarSumAggregateInputType = {
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    volume?: true;
    amount?: true;
    factor?: true;
    takerBuyBaseVolume?: true;
};
export type BarMinAggregateInputType = {
    ts?: true;
    symbol?: true;
    asset?: true;
    freq?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    volume?: true;
    amount?: true;
    factor?: true;
    takerBuyBaseVolume?: true;
    vendor?: true;
    ingestTs?: true;
};
export type BarMaxAggregateInputType = {
    ts?: true;
    symbol?: true;
    asset?: true;
    freq?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    volume?: true;
    amount?: true;
    factor?: true;
    takerBuyBaseVolume?: true;
    vendor?: true;
    ingestTs?: true;
};
export type BarCountAggregateInputType = {
    ts?: true;
    symbol?: true;
    asset?: true;
    freq?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    volume?: true;
    amount?: true;
    factor?: true;
    takerBuyBaseVolume?: true;
    vendor?: true;
    ingestTs?: true;
    _all?: true;
};
export type BarAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BarWhereInput;
    orderBy?: Prisma.BarOrderByWithRelationInput | Prisma.BarOrderByWithRelationInput[];
    cursor?: Prisma.BarWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BarCountAggregateInputType;
    _avg?: BarAvgAggregateInputType;
    _sum?: BarSumAggregateInputType;
    _min?: BarMinAggregateInputType;
    _max?: BarMaxAggregateInputType;
};
export type GetBarAggregateType<T extends BarAggregateArgs> = {
    [P in keyof T & keyof AggregateBar]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBar[P]> : Prisma.GetScalarType<T[P], AggregateBar[P]>;
};
export type BarGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BarWhereInput;
    orderBy?: Prisma.BarOrderByWithAggregationInput | Prisma.BarOrderByWithAggregationInput[];
    by: Prisma.BarScalarFieldEnum[] | Prisma.BarScalarFieldEnum;
    having?: Prisma.BarScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BarCountAggregateInputType | true;
    _avg?: BarAvgAggregateInputType;
    _sum?: BarSumAggregateInputType;
    _min?: BarMinAggregateInputType;
    _max?: BarMaxAggregateInputType;
};
export type BarGroupByOutputType = {
    ts: Date;
    symbol: string;
    asset: $Enums.Asset;
    freq: $Enums.Freq;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
    volume: number | null;
    amount: number | null;
    factor: number;
    takerBuyBaseVolume: number | null;
    vendor: string | null;
    ingestTs: Date;
    _count: BarCountAggregateOutputType | null;
    _avg: BarAvgAggregateOutputType | null;
    _sum: BarSumAggregateOutputType | null;
    _min: BarMinAggregateOutputType | null;
    _max: BarMaxAggregateOutputType | null;
};
type GetBarGroupByPayload<T extends BarGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BarGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BarGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BarGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BarGroupByOutputType[P]>;
}>>;
export type BarWhereInput = {
    AND?: Prisma.BarWhereInput | Prisma.BarWhereInput[];
    OR?: Prisma.BarWhereInput[];
    NOT?: Prisma.BarWhereInput | Prisma.BarWhereInput[];
    ts?: Prisma.DateTimeFilter<"Bar"> | Date | string;
    symbol?: Prisma.StringFilter<"Bar"> | string;
    asset?: Prisma.EnumAssetFilter<"Bar"> | $Enums.Asset;
    freq?: Prisma.EnumFreqFilter<"Bar"> | $Enums.Freq;
    open?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    high?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    low?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    close?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    volume?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    amount?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    factor?: Prisma.FloatFilter<"Bar"> | number;
    takerBuyBaseVolume?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    vendor?: Prisma.StringNullableFilter<"Bar"> | string | null;
    ingestTs?: Prisma.DateTimeFilter<"Bar"> | Date | string;
};
export type BarOrderByWithRelationInput = {
    ts?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    freq?: Prisma.SortOrder;
    open?: Prisma.SortOrderInput | Prisma.SortOrder;
    high?: Prisma.SortOrderInput | Prisma.SortOrder;
    low?: Prisma.SortOrderInput | Prisma.SortOrder;
    close?: Prisma.SortOrderInput | Prisma.SortOrder;
    volume?: Prisma.SortOrderInput | Prisma.SortOrder;
    amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    factor?: Prisma.SortOrder;
    takerBuyBaseVolume?: Prisma.SortOrderInput | Prisma.SortOrder;
    vendor?: Prisma.SortOrderInput | Prisma.SortOrder;
    ingestTs?: Prisma.SortOrder;
};
export type BarWhereUniqueInput = Prisma.AtLeast<{
    ts_symbol_asset_freq?: Prisma.BarTsSymbolAssetFreqCompoundUniqueInput;
    AND?: Prisma.BarWhereInput | Prisma.BarWhereInput[];
    OR?: Prisma.BarWhereInput[];
    NOT?: Prisma.BarWhereInput | Prisma.BarWhereInput[];
    ts?: Prisma.DateTimeFilter<"Bar"> | Date | string;
    symbol?: Prisma.StringFilter<"Bar"> | string;
    asset?: Prisma.EnumAssetFilter<"Bar"> | $Enums.Asset;
    freq?: Prisma.EnumFreqFilter<"Bar"> | $Enums.Freq;
    open?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    high?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    low?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    close?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    volume?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    amount?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    factor?: Prisma.FloatFilter<"Bar"> | number;
    takerBuyBaseVolume?: Prisma.FloatNullableFilter<"Bar"> | number | null;
    vendor?: Prisma.StringNullableFilter<"Bar"> | string | null;
    ingestTs?: Prisma.DateTimeFilter<"Bar"> | Date | string;
}, "ts_symbol_asset_freq">;
export type BarOrderByWithAggregationInput = {
    ts?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    freq?: Prisma.SortOrder;
    open?: Prisma.SortOrderInput | Prisma.SortOrder;
    high?: Prisma.SortOrderInput | Prisma.SortOrder;
    low?: Prisma.SortOrderInput | Prisma.SortOrder;
    close?: Prisma.SortOrderInput | Prisma.SortOrder;
    volume?: Prisma.SortOrderInput | Prisma.SortOrder;
    amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    factor?: Prisma.SortOrder;
    takerBuyBaseVolume?: Prisma.SortOrderInput | Prisma.SortOrder;
    vendor?: Prisma.SortOrderInput | Prisma.SortOrder;
    ingestTs?: Prisma.SortOrder;
    _count?: Prisma.BarCountOrderByAggregateInput;
    _avg?: Prisma.BarAvgOrderByAggregateInput;
    _max?: Prisma.BarMaxOrderByAggregateInput;
    _min?: Prisma.BarMinOrderByAggregateInput;
    _sum?: Prisma.BarSumOrderByAggregateInput;
};
export type BarScalarWhereWithAggregatesInput = {
    AND?: Prisma.BarScalarWhereWithAggregatesInput | Prisma.BarScalarWhereWithAggregatesInput[];
    OR?: Prisma.BarScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BarScalarWhereWithAggregatesInput | Prisma.BarScalarWhereWithAggregatesInput[];
    ts?: Prisma.DateTimeWithAggregatesFilter<"Bar"> | Date | string;
    symbol?: Prisma.StringWithAggregatesFilter<"Bar"> | string;
    asset?: Prisma.EnumAssetWithAggregatesFilter<"Bar"> | $Enums.Asset;
    freq?: Prisma.EnumFreqWithAggregatesFilter<"Bar"> | $Enums.Freq;
    open?: Prisma.FloatNullableWithAggregatesFilter<"Bar"> | number | null;
    high?: Prisma.FloatNullableWithAggregatesFilter<"Bar"> | number | null;
    low?: Prisma.FloatNullableWithAggregatesFilter<"Bar"> | number | null;
    close?: Prisma.FloatNullableWithAggregatesFilter<"Bar"> | number | null;
    volume?: Prisma.FloatNullableWithAggregatesFilter<"Bar"> | number | null;
    amount?: Prisma.FloatNullableWithAggregatesFilter<"Bar"> | number | null;
    factor?: Prisma.FloatWithAggregatesFilter<"Bar"> | number;
    takerBuyBaseVolume?: Prisma.FloatNullableWithAggregatesFilter<"Bar"> | number | null;
    vendor?: Prisma.StringNullableWithAggregatesFilter<"Bar"> | string | null;
    ingestTs?: Prisma.DateTimeWithAggregatesFilter<"Bar"> | Date | string;
};
export type BarCreateInput = {
    ts: Date | string;
    symbol: string;
    asset: $Enums.Asset;
    freq: $Enums.Freq;
    open?: number | null;
    high?: number | null;
    low?: number | null;
    close?: number | null;
    volume?: number | null;
    amount?: number | null;
    factor?: number;
    takerBuyBaseVolume?: number | null;
    vendor?: string | null;
    ingestTs?: Date | string;
};
export type BarUncheckedCreateInput = {
    ts: Date | string;
    symbol: string;
    asset: $Enums.Asset;
    freq: $Enums.Freq;
    open?: number | null;
    high?: number | null;
    low?: number | null;
    close?: number | null;
    volume?: number | null;
    amount?: number | null;
    factor?: number;
    takerBuyBaseVolume?: number | null;
    vendor?: string | null;
    ingestTs?: Date | string;
};
export type BarUpdateInput = {
    ts?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    freq?: Prisma.EnumFreqFieldUpdateOperationsInput | $Enums.Freq;
    open?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    high?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    low?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    close?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    volume?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    amount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    factor?: Prisma.FloatFieldUpdateOperationsInput | number;
    takerBuyBaseVolume?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingestTs?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BarUncheckedUpdateInput = {
    ts?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    freq?: Prisma.EnumFreqFieldUpdateOperationsInput | $Enums.Freq;
    open?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    high?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    low?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    close?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    volume?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    amount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    factor?: Prisma.FloatFieldUpdateOperationsInput | number;
    takerBuyBaseVolume?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingestTs?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BarCreateManyInput = {
    ts: Date | string;
    symbol: string;
    asset: $Enums.Asset;
    freq: $Enums.Freq;
    open?: number | null;
    high?: number | null;
    low?: number | null;
    close?: number | null;
    volume?: number | null;
    amount?: number | null;
    factor?: number;
    takerBuyBaseVolume?: number | null;
    vendor?: string | null;
    ingestTs?: Date | string;
};
export type BarUpdateManyMutationInput = {
    ts?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    freq?: Prisma.EnumFreqFieldUpdateOperationsInput | $Enums.Freq;
    open?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    high?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    low?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    close?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    volume?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    amount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    factor?: Prisma.FloatFieldUpdateOperationsInput | number;
    takerBuyBaseVolume?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingestTs?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BarUncheckedUpdateManyInput = {
    ts?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    freq?: Prisma.EnumFreqFieldUpdateOperationsInput | $Enums.Freq;
    open?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    high?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    low?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    close?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    volume?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    amount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    factor?: Prisma.FloatFieldUpdateOperationsInput | number;
    takerBuyBaseVolume?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    vendor?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingestTs?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BarTsSymbolAssetFreqCompoundUniqueInput = {
    ts: Date | string;
    symbol: string;
    asset: $Enums.Asset;
    freq: $Enums.Freq;
};
export type BarCountOrderByAggregateInput = {
    ts?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    freq?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    factor?: Prisma.SortOrder;
    takerBuyBaseVolume?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
    ingestTs?: Prisma.SortOrder;
};
export type BarAvgOrderByAggregateInput = {
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    factor?: Prisma.SortOrder;
    takerBuyBaseVolume?: Prisma.SortOrder;
};
export type BarMaxOrderByAggregateInput = {
    ts?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    freq?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    factor?: Prisma.SortOrder;
    takerBuyBaseVolume?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
    ingestTs?: Prisma.SortOrder;
};
export type BarMinOrderByAggregateInput = {
    ts?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    freq?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    factor?: Prisma.SortOrder;
    takerBuyBaseVolume?: Prisma.SortOrder;
    vendor?: Prisma.SortOrder;
    ingestTs?: Prisma.SortOrder;
};
export type BarSumOrderByAggregateInput = {
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    factor?: Prisma.SortOrder;
    takerBuyBaseVolume?: Prisma.SortOrder;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumAssetFieldUpdateOperationsInput = {
    set?: $Enums.Asset;
};
export type EnumFreqFieldUpdateOperationsInput = {
    set?: $Enums.Freq;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type BarSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ts?: boolean;
    symbol?: boolean;
    asset?: boolean;
    freq?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
    volume?: boolean;
    amount?: boolean;
    factor?: boolean;
    takerBuyBaseVolume?: boolean;
    vendor?: boolean;
    ingestTs?: boolean;
}, ExtArgs["result"]["bar"]>;
export type BarSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ts?: boolean;
    symbol?: boolean;
    asset?: boolean;
    freq?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
    volume?: boolean;
    amount?: boolean;
    factor?: boolean;
    takerBuyBaseVolume?: boolean;
    vendor?: boolean;
    ingestTs?: boolean;
}, ExtArgs["result"]["bar"]>;
export type BarSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ts?: boolean;
    symbol?: boolean;
    asset?: boolean;
    freq?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
    volume?: boolean;
    amount?: boolean;
    factor?: boolean;
    takerBuyBaseVolume?: boolean;
    vendor?: boolean;
    ingestTs?: boolean;
}, ExtArgs["result"]["bar"]>;
export type BarSelectScalar = {
    ts?: boolean;
    symbol?: boolean;
    asset?: boolean;
    freq?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
    volume?: boolean;
    amount?: boolean;
    factor?: boolean;
    takerBuyBaseVolume?: boolean;
    vendor?: boolean;
    ingestTs?: boolean;
};
export type BarOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ts" | "symbol" | "asset" | "freq" | "open" | "high" | "low" | "close" | "volume" | "amount" | "factor" | "takerBuyBaseVolume" | "vendor" | "ingestTs", ExtArgs["result"]["bar"]>;
export type $BarPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Bar";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ts: Date;
        symbol: string;
        asset: $Enums.Asset;
        freq: $Enums.Freq;
        open: number | null;
        high: number | null;
        low: number | null;
        close: number | null;
        volume: number | null;
        amount: number | null;
        factor: number;
        takerBuyBaseVolume: number | null;
        vendor: string | null;
        ingestTs: Date;
    }, ExtArgs["result"]["bar"]>;
    composites: {};
};
export type BarGetPayload<S extends boolean | null | undefined | BarDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BarPayload, S>;
export type BarCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BarCountAggregateInputType | true;
};
export interface BarDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Bar'];
        meta: {
            name: 'Bar';
        };
    };
    findUnique<T extends BarFindUniqueArgs>(args: Prisma.SelectSubset<T, BarFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BarClient<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BarFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BarFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BarClient<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BarFindFirstArgs>(args?: Prisma.SelectSubset<T, BarFindFirstArgs<ExtArgs>>): Prisma.Prisma__BarClient<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BarFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BarFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BarClient<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BarFindManyArgs>(args?: Prisma.SelectSubset<T, BarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BarCreateArgs>(args: Prisma.SelectSubset<T, BarCreateArgs<ExtArgs>>): Prisma.Prisma__BarClient<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BarCreateManyArgs>(args?: Prisma.SelectSubset<T, BarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BarCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BarDeleteArgs>(args: Prisma.SelectSubset<T, BarDeleteArgs<ExtArgs>>): Prisma.Prisma__BarClient<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BarUpdateArgs>(args: Prisma.SelectSubset<T, BarUpdateArgs<ExtArgs>>): Prisma.Prisma__BarClient<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BarDeleteManyArgs>(args?: Prisma.SelectSubset<T, BarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BarUpdateManyArgs>(args: Prisma.SelectSubset<T, BarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BarUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BarUpsertArgs>(args: Prisma.SelectSubset<T, BarUpsertArgs<ExtArgs>>): Prisma.Prisma__BarClient<runtime.Types.Result.GetResult<Prisma.$BarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BarCountArgs>(args?: Prisma.Subset<T, BarCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BarCountAggregateOutputType> : number>;
    aggregate<T extends BarAggregateArgs>(args: Prisma.Subset<T, BarAggregateArgs>): Prisma.PrismaPromise<GetBarAggregateType<T>>;
    groupBy<T extends BarGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BarGroupByArgs['orderBy'];
    } : {
        orderBy?: BarGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BarFieldRefs;
}
export interface Prisma__BarClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BarFieldRefs {
    readonly ts: Prisma.FieldRef<"Bar", 'DateTime'>;
    readonly symbol: Prisma.FieldRef<"Bar", 'String'>;
    readonly asset: Prisma.FieldRef<"Bar", 'Asset'>;
    readonly freq: Prisma.FieldRef<"Bar", 'Freq'>;
    readonly open: Prisma.FieldRef<"Bar", 'Float'>;
    readonly high: Prisma.FieldRef<"Bar", 'Float'>;
    readonly low: Prisma.FieldRef<"Bar", 'Float'>;
    readonly close: Prisma.FieldRef<"Bar", 'Float'>;
    readonly volume: Prisma.FieldRef<"Bar", 'Float'>;
    readonly amount: Prisma.FieldRef<"Bar", 'Float'>;
    readonly factor: Prisma.FieldRef<"Bar", 'Float'>;
    readonly takerBuyBaseVolume: Prisma.FieldRef<"Bar", 'Float'>;
    readonly vendor: Prisma.FieldRef<"Bar", 'String'>;
    readonly ingestTs: Prisma.FieldRef<"Bar", 'DateTime'>;
}
export type BarFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelect<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    where: Prisma.BarWhereUniqueInput;
};
export type BarFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelect<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    where: Prisma.BarWhereUniqueInput;
};
export type BarFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelect<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    where?: Prisma.BarWhereInput;
    orderBy?: Prisma.BarOrderByWithRelationInput | Prisma.BarOrderByWithRelationInput[];
    cursor?: Prisma.BarWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BarScalarFieldEnum | Prisma.BarScalarFieldEnum[];
};
export type BarFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelect<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    where?: Prisma.BarWhereInput;
    orderBy?: Prisma.BarOrderByWithRelationInput | Prisma.BarOrderByWithRelationInput[];
    cursor?: Prisma.BarWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BarScalarFieldEnum | Prisma.BarScalarFieldEnum[];
};
export type BarFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelect<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    where?: Prisma.BarWhereInput;
    orderBy?: Prisma.BarOrderByWithRelationInput | Prisma.BarOrderByWithRelationInput[];
    cursor?: Prisma.BarWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BarScalarFieldEnum | Prisma.BarScalarFieldEnum[];
};
export type BarCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelect<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BarCreateInput, Prisma.BarUncheckedCreateInput>;
};
export type BarCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BarCreateManyInput | Prisma.BarCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BarCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    data: Prisma.BarCreateManyInput | Prisma.BarCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BarUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelect<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BarUpdateInput, Prisma.BarUncheckedUpdateInput>;
    where: Prisma.BarWhereUniqueInput;
};
export type BarUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BarUpdateManyMutationInput, Prisma.BarUncheckedUpdateManyInput>;
    where?: Prisma.BarWhereInput;
    limit?: number;
};
export type BarUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BarUpdateManyMutationInput, Prisma.BarUncheckedUpdateManyInput>;
    where?: Prisma.BarWhereInput;
    limit?: number;
};
export type BarUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelect<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    where: Prisma.BarWhereUniqueInput;
    create: Prisma.XOR<Prisma.BarCreateInput, Prisma.BarUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BarUpdateInput, Prisma.BarUncheckedUpdateInput>;
};
export type BarDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelect<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
    where: Prisma.BarWhereUniqueInput;
};
export type BarDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BarWhereInput;
    limit?: number;
};
export type BarDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BarSelect<ExtArgs> | null;
    omit?: Prisma.BarOmit<ExtArgs> | null;
};
export {};

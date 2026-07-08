import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type IndexMemberModel = runtime.Types.Result.DefaultSelection<Prisma.$IndexMemberPayload>;
export type AggregateIndexMember = {
    _count: IndexMemberCountAggregateOutputType | null;
    _min: IndexMemberMinAggregateOutputType | null;
    _max: IndexMemberMaxAggregateOutputType | null;
};
export type IndexMemberMinAggregateOutputType = {
    indexCode: string | null;
    symbol: string | null;
    inDate: Date | null;
    outDate: Date | null;
};
export type IndexMemberMaxAggregateOutputType = {
    indexCode: string | null;
    symbol: string | null;
    inDate: Date | null;
    outDate: Date | null;
};
export type IndexMemberCountAggregateOutputType = {
    indexCode: number;
    symbol: number;
    inDate: number;
    outDate: number;
    _all: number;
};
export type IndexMemberMinAggregateInputType = {
    indexCode?: true;
    symbol?: true;
    inDate?: true;
    outDate?: true;
};
export type IndexMemberMaxAggregateInputType = {
    indexCode?: true;
    symbol?: true;
    inDate?: true;
    outDate?: true;
};
export type IndexMemberCountAggregateInputType = {
    indexCode?: true;
    symbol?: true;
    inDate?: true;
    outDate?: true;
    _all?: true;
};
export type IndexMemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IndexMemberWhereInput;
    orderBy?: Prisma.IndexMemberOrderByWithRelationInput | Prisma.IndexMemberOrderByWithRelationInput[];
    cursor?: Prisma.IndexMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IndexMemberCountAggregateInputType;
    _min?: IndexMemberMinAggregateInputType;
    _max?: IndexMemberMaxAggregateInputType;
};
export type GetIndexMemberAggregateType<T extends IndexMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateIndexMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIndexMember[P]> : Prisma.GetScalarType<T[P], AggregateIndexMember[P]>;
};
export type IndexMemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IndexMemberWhereInput;
    orderBy?: Prisma.IndexMemberOrderByWithAggregationInput | Prisma.IndexMemberOrderByWithAggregationInput[];
    by: Prisma.IndexMemberScalarFieldEnum[] | Prisma.IndexMemberScalarFieldEnum;
    having?: Prisma.IndexMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IndexMemberCountAggregateInputType | true;
    _min?: IndexMemberMinAggregateInputType;
    _max?: IndexMemberMaxAggregateInputType;
};
export type IndexMemberGroupByOutputType = {
    indexCode: string;
    symbol: string;
    inDate: Date;
    outDate: Date | null;
    _count: IndexMemberCountAggregateOutputType | null;
    _min: IndexMemberMinAggregateOutputType | null;
    _max: IndexMemberMaxAggregateOutputType | null;
};
type GetIndexMemberGroupByPayload<T extends IndexMemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IndexMemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IndexMemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IndexMemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IndexMemberGroupByOutputType[P]>;
}>>;
export type IndexMemberWhereInput = {
    AND?: Prisma.IndexMemberWhereInput | Prisma.IndexMemberWhereInput[];
    OR?: Prisma.IndexMemberWhereInput[];
    NOT?: Prisma.IndexMemberWhereInput | Prisma.IndexMemberWhereInput[];
    indexCode?: Prisma.StringFilter<"IndexMember"> | string;
    symbol?: Prisma.StringFilter<"IndexMember"> | string;
    inDate?: Prisma.DateTimeFilter<"IndexMember"> | Date | string;
    outDate?: Prisma.DateTimeNullableFilter<"IndexMember"> | Date | string | null;
    index?: Prisma.XOR<Prisma.IndexScalarRelationFilter, Prisma.IndexWhereInput>;
};
export type IndexMemberOrderByWithRelationInput = {
    indexCode?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    inDate?: Prisma.SortOrder;
    outDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    index?: Prisma.IndexOrderByWithRelationInput;
};
export type IndexMemberWhereUniqueInput = Prisma.AtLeast<{
    indexCode_symbol_inDate?: Prisma.IndexMemberIndexCodeSymbolInDateCompoundUniqueInput;
    AND?: Prisma.IndexMemberWhereInput | Prisma.IndexMemberWhereInput[];
    OR?: Prisma.IndexMemberWhereInput[];
    NOT?: Prisma.IndexMemberWhereInput | Prisma.IndexMemberWhereInput[];
    indexCode?: Prisma.StringFilter<"IndexMember"> | string;
    symbol?: Prisma.StringFilter<"IndexMember"> | string;
    inDate?: Prisma.DateTimeFilter<"IndexMember"> | Date | string;
    outDate?: Prisma.DateTimeNullableFilter<"IndexMember"> | Date | string | null;
    index?: Prisma.XOR<Prisma.IndexScalarRelationFilter, Prisma.IndexWhereInput>;
}, "indexCode_symbol_inDate">;
export type IndexMemberOrderByWithAggregationInput = {
    indexCode?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    inDate?: Prisma.SortOrder;
    outDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.IndexMemberCountOrderByAggregateInput;
    _max?: Prisma.IndexMemberMaxOrderByAggregateInput;
    _min?: Prisma.IndexMemberMinOrderByAggregateInput;
};
export type IndexMemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.IndexMemberScalarWhereWithAggregatesInput | Prisma.IndexMemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.IndexMemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IndexMemberScalarWhereWithAggregatesInput | Prisma.IndexMemberScalarWhereWithAggregatesInput[];
    indexCode?: Prisma.StringWithAggregatesFilter<"IndexMember"> | string;
    symbol?: Prisma.StringWithAggregatesFilter<"IndexMember"> | string;
    inDate?: Prisma.DateTimeWithAggregatesFilter<"IndexMember"> | Date | string;
    outDate?: Prisma.DateTimeNullableWithAggregatesFilter<"IndexMember"> | Date | string | null;
};
export type IndexMemberCreateInput = {
    symbol: string;
    inDate: Date | string;
    outDate?: Date | string | null;
    index: Prisma.IndexCreateNestedOneWithoutMembersInput;
};
export type IndexMemberUncheckedCreateInput = {
    indexCode: string;
    symbol: string;
    inDate: Date | string;
    outDate?: Date | string | null;
};
export type IndexMemberUpdateInput = {
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    inDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    index?: Prisma.IndexUpdateOneRequiredWithoutMembersNestedInput;
};
export type IndexMemberUncheckedUpdateInput = {
    indexCode?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    inDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IndexMemberCreateManyInput = {
    indexCode: string;
    symbol: string;
    inDate: Date | string;
    outDate?: Date | string | null;
};
export type IndexMemberUpdateManyMutationInput = {
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    inDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IndexMemberUncheckedUpdateManyInput = {
    indexCode?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    inDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IndexMemberListRelationFilter = {
    every?: Prisma.IndexMemberWhereInput;
    some?: Prisma.IndexMemberWhereInput;
    none?: Prisma.IndexMemberWhereInput;
};
export type IndexMemberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IndexMemberIndexCodeSymbolInDateCompoundUniqueInput = {
    indexCode: string;
    symbol: string;
    inDate: Date | string;
};
export type IndexMemberCountOrderByAggregateInput = {
    indexCode?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    inDate?: Prisma.SortOrder;
    outDate?: Prisma.SortOrder;
};
export type IndexMemberMaxOrderByAggregateInput = {
    indexCode?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    inDate?: Prisma.SortOrder;
    outDate?: Prisma.SortOrder;
};
export type IndexMemberMinOrderByAggregateInput = {
    indexCode?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    inDate?: Prisma.SortOrder;
    outDate?: Prisma.SortOrder;
};
export type IndexMemberCreateNestedManyWithoutIndexInput = {
    create?: Prisma.XOR<Prisma.IndexMemberCreateWithoutIndexInput, Prisma.IndexMemberUncheckedCreateWithoutIndexInput> | Prisma.IndexMemberCreateWithoutIndexInput[] | Prisma.IndexMemberUncheckedCreateWithoutIndexInput[];
    connectOrCreate?: Prisma.IndexMemberCreateOrConnectWithoutIndexInput | Prisma.IndexMemberCreateOrConnectWithoutIndexInput[];
    createMany?: Prisma.IndexMemberCreateManyIndexInputEnvelope;
    connect?: Prisma.IndexMemberWhereUniqueInput | Prisma.IndexMemberWhereUniqueInput[];
};
export type IndexMemberUncheckedCreateNestedManyWithoutIndexInput = {
    create?: Prisma.XOR<Prisma.IndexMemberCreateWithoutIndexInput, Prisma.IndexMemberUncheckedCreateWithoutIndexInput> | Prisma.IndexMemberCreateWithoutIndexInput[] | Prisma.IndexMemberUncheckedCreateWithoutIndexInput[];
    connectOrCreate?: Prisma.IndexMemberCreateOrConnectWithoutIndexInput | Prisma.IndexMemberCreateOrConnectWithoutIndexInput[];
    createMany?: Prisma.IndexMemberCreateManyIndexInputEnvelope;
    connect?: Prisma.IndexMemberWhereUniqueInput | Prisma.IndexMemberWhereUniqueInput[];
};
export type IndexMemberUpdateManyWithoutIndexNestedInput = {
    create?: Prisma.XOR<Prisma.IndexMemberCreateWithoutIndexInput, Prisma.IndexMemberUncheckedCreateWithoutIndexInput> | Prisma.IndexMemberCreateWithoutIndexInput[] | Prisma.IndexMemberUncheckedCreateWithoutIndexInput[];
    connectOrCreate?: Prisma.IndexMemberCreateOrConnectWithoutIndexInput | Prisma.IndexMemberCreateOrConnectWithoutIndexInput[];
    upsert?: Prisma.IndexMemberUpsertWithWhereUniqueWithoutIndexInput | Prisma.IndexMemberUpsertWithWhereUniqueWithoutIndexInput[];
    createMany?: Prisma.IndexMemberCreateManyIndexInputEnvelope;
    set?: Prisma.IndexMemberWhereUniqueInput | Prisma.IndexMemberWhereUniqueInput[];
    disconnect?: Prisma.IndexMemberWhereUniqueInput | Prisma.IndexMemberWhereUniqueInput[];
    delete?: Prisma.IndexMemberWhereUniqueInput | Prisma.IndexMemberWhereUniqueInput[];
    connect?: Prisma.IndexMemberWhereUniqueInput | Prisma.IndexMemberWhereUniqueInput[];
    update?: Prisma.IndexMemberUpdateWithWhereUniqueWithoutIndexInput | Prisma.IndexMemberUpdateWithWhereUniqueWithoutIndexInput[];
    updateMany?: Prisma.IndexMemberUpdateManyWithWhereWithoutIndexInput | Prisma.IndexMemberUpdateManyWithWhereWithoutIndexInput[];
    deleteMany?: Prisma.IndexMemberScalarWhereInput | Prisma.IndexMemberScalarWhereInput[];
};
export type IndexMemberUncheckedUpdateManyWithoutIndexNestedInput = {
    create?: Prisma.XOR<Prisma.IndexMemberCreateWithoutIndexInput, Prisma.IndexMemberUncheckedCreateWithoutIndexInput> | Prisma.IndexMemberCreateWithoutIndexInput[] | Prisma.IndexMemberUncheckedCreateWithoutIndexInput[];
    connectOrCreate?: Prisma.IndexMemberCreateOrConnectWithoutIndexInput | Prisma.IndexMemberCreateOrConnectWithoutIndexInput[];
    upsert?: Prisma.IndexMemberUpsertWithWhereUniqueWithoutIndexInput | Prisma.IndexMemberUpsertWithWhereUniqueWithoutIndexInput[];
    createMany?: Prisma.IndexMemberCreateManyIndexInputEnvelope;
    set?: Prisma.IndexMemberWhereUniqueInput | Prisma.IndexMemberWhereUniqueInput[];
    disconnect?: Prisma.IndexMemberWhereUniqueInput | Prisma.IndexMemberWhereUniqueInput[];
    delete?: Prisma.IndexMemberWhereUniqueInput | Prisma.IndexMemberWhereUniqueInput[];
    connect?: Prisma.IndexMemberWhereUniqueInput | Prisma.IndexMemberWhereUniqueInput[];
    update?: Prisma.IndexMemberUpdateWithWhereUniqueWithoutIndexInput | Prisma.IndexMemberUpdateWithWhereUniqueWithoutIndexInput[];
    updateMany?: Prisma.IndexMemberUpdateManyWithWhereWithoutIndexInput | Prisma.IndexMemberUpdateManyWithWhereWithoutIndexInput[];
    deleteMany?: Prisma.IndexMemberScalarWhereInput | Prisma.IndexMemberScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type IndexMemberCreateWithoutIndexInput = {
    symbol: string;
    inDate: Date | string;
    outDate?: Date | string | null;
};
export type IndexMemberUncheckedCreateWithoutIndexInput = {
    symbol: string;
    inDate: Date | string;
    outDate?: Date | string | null;
};
export type IndexMemberCreateOrConnectWithoutIndexInput = {
    where: Prisma.IndexMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.IndexMemberCreateWithoutIndexInput, Prisma.IndexMemberUncheckedCreateWithoutIndexInput>;
};
export type IndexMemberCreateManyIndexInputEnvelope = {
    data: Prisma.IndexMemberCreateManyIndexInput | Prisma.IndexMemberCreateManyIndexInput[];
    skipDuplicates?: boolean;
};
export type IndexMemberUpsertWithWhereUniqueWithoutIndexInput = {
    where: Prisma.IndexMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.IndexMemberUpdateWithoutIndexInput, Prisma.IndexMemberUncheckedUpdateWithoutIndexInput>;
    create: Prisma.XOR<Prisma.IndexMemberCreateWithoutIndexInput, Prisma.IndexMemberUncheckedCreateWithoutIndexInput>;
};
export type IndexMemberUpdateWithWhereUniqueWithoutIndexInput = {
    where: Prisma.IndexMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.IndexMemberUpdateWithoutIndexInput, Prisma.IndexMemberUncheckedUpdateWithoutIndexInput>;
};
export type IndexMemberUpdateManyWithWhereWithoutIndexInput = {
    where: Prisma.IndexMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.IndexMemberUpdateManyMutationInput, Prisma.IndexMemberUncheckedUpdateManyWithoutIndexInput>;
};
export type IndexMemberScalarWhereInput = {
    AND?: Prisma.IndexMemberScalarWhereInput | Prisma.IndexMemberScalarWhereInput[];
    OR?: Prisma.IndexMemberScalarWhereInput[];
    NOT?: Prisma.IndexMemberScalarWhereInput | Prisma.IndexMemberScalarWhereInput[];
    indexCode?: Prisma.StringFilter<"IndexMember"> | string;
    symbol?: Prisma.StringFilter<"IndexMember"> | string;
    inDate?: Prisma.DateTimeFilter<"IndexMember"> | Date | string;
    outDate?: Prisma.DateTimeNullableFilter<"IndexMember"> | Date | string | null;
};
export type IndexMemberCreateManyIndexInput = {
    symbol: string;
    inDate: Date | string;
    outDate?: Date | string | null;
};
export type IndexMemberUpdateWithoutIndexInput = {
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    inDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IndexMemberUncheckedUpdateWithoutIndexInput = {
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    inDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IndexMemberUncheckedUpdateManyWithoutIndexInput = {
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    inDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    outDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IndexMemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    indexCode?: boolean;
    symbol?: boolean;
    inDate?: boolean;
    outDate?: boolean;
    index?: boolean | Prisma.IndexDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["indexMember"]>;
export type IndexMemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    indexCode?: boolean;
    symbol?: boolean;
    inDate?: boolean;
    outDate?: boolean;
    index?: boolean | Prisma.IndexDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["indexMember"]>;
export type IndexMemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    indexCode?: boolean;
    symbol?: boolean;
    inDate?: boolean;
    outDate?: boolean;
    index?: boolean | Prisma.IndexDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["indexMember"]>;
export type IndexMemberSelectScalar = {
    indexCode?: boolean;
    symbol?: boolean;
    inDate?: boolean;
    outDate?: boolean;
};
export type IndexMemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"indexCode" | "symbol" | "inDate" | "outDate", ExtArgs["result"]["indexMember"]>;
export type IndexMemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    index?: boolean | Prisma.IndexDefaultArgs<ExtArgs>;
};
export type IndexMemberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    index?: boolean | Prisma.IndexDefaultArgs<ExtArgs>;
};
export type IndexMemberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    index?: boolean | Prisma.IndexDefaultArgs<ExtArgs>;
};
export type $IndexMemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IndexMember";
    objects: {
        index: Prisma.$IndexPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        indexCode: string;
        symbol: string;
        inDate: Date;
        outDate: Date | null;
    }, ExtArgs["result"]["indexMember"]>;
    composites: {};
};
export type IndexMemberGetPayload<S extends boolean | null | undefined | IndexMemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload, S>;
export type IndexMemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IndexMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IndexMemberCountAggregateInputType | true;
};
export interface IndexMemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IndexMember'];
        meta: {
            name: 'IndexMember';
        };
    };
    findUnique<T extends IndexMemberFindUniqueArgs>(args: Prisma.SelectSubset<T, IndexMemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IndexMemberClient<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IndexMemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IndexMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IndexMemberClient<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IndexMemberFindFirstArgs>(args?: Prisma.SelectSubset<T, IndexMemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__IndexMemberClient<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IndexMemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IndexMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IndexMemberClient<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IndexMemberFindManyArgs>(args?: Prisma.SelectSubset<T, IndexMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IndexMemberCreateArgs>(args: Prisma.SelectSubset<T, IndexMemberCreateArgs<ExtArgs>>): Prisma.Prisma__IndexMemberClient<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IndexMemberCreateManyArgs>(args?: Prisma.SelectSubset<T, IndexMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IndexMemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IndexMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IndexMemberDeleteArgs>(args: Prisma.SelectSubset<T, IndexMemberDeleteArgs<ExtArgs>>): Prisma.Prisma__IndexMemberClient<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IndexMemberUpdateArgs>(args: Prisma.SelectSubset<T, IndexMemberUpdateArgs<ExtArgs>>): Prisma.Prisma__IndexMemberClient<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IndexMemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, IndexMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IndexMemberUpdateManyArgs>(args: Prisma.SelectSubset<T, IndexMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IndexMemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IndexMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IndexMemberUpsertArgs>(args: Prisma.SelectSubset<T, IndexMemberUpsertArgs<ExtArgs>>): Prisma.Prisma__IndexMemberClient<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IndexMemberCountArgs>(args?: Prisma.Subset<T, IndexMemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IndexMemberCountAggregateOutputType> : number>;
    aggregate<T extends IndexMemberAggregateArgs>(args: Prisma.Subset<T, IndexMemberAggregateArgs>): Prisma.PrismaPromise<GetIndexMemberAggregateType<T>>;
    groupBy<T extends IndexMemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IndexMemberGroupByArgs['orderBy'];
    } : {
        orderBy?: IndexMemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IndexMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIndexMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IndexMemberFieldRefs;
}
export interface Prisma__IndexMemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    index<T extends Prisma.IndexDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.IndexDefaultArgs<ExtArgs>>): Prisma.Prisma__IndexClient<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IndexMemberFieldRefs {
    readonly indexCode: Prisma.FieldRef<"IndexMember", 'String'>;
    readonly symbol: Prisma.FieldRef<"IndexMember", 'String'>;
    readonly inDate: Prisma.FieldRef<"IndexMember", 'DateTime'>;
    readonly outDate: Prisma.FieldRef<"IndexMember", 'DateTime'>;
}
export type IndexMemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelect<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    include?: Prisma.IndexMemberInclude<ExtArgs> | null;
    where: Prisma.IndexMemberWhereUniqueInput;
};
export type IndexMemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelect<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    include?: Prisma.IndexMemberInclude<ExtArgs> | null;
    where: Prisma.IndexMemberWhereUniqueInput;
};
export type IndexMemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelect<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    include?: Prisma.IndexMemberInclude<ExtArgs> | null;
    where?: Prisma.IndexMemberWhereInput;
    orderBy?: Prisma.IndexMemberOrderByWithRelationInput | Prisma.IndexMemberOrderByWithRelationInput[];
    cursor?: Prisma.IndexMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IndexMemberScalarFieldEnum | Prisma.IndexMemberScalarFieldEnum[];
};
export type IndexMemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelect<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    include?: Prisma.IndexMemberInclude<ExtArgs> | null;
    where?: Prisma.IndexMemberWhereInput;
    orderBy?: Prisma.IndexMemberOrderByWithRelationInput | Prisma.IndexMemberOrderByWithRelationInput[];
    cursor?: Prisma.IndexMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IndexMemberScalarFieldEnum | Prisma.IndexMemberScalarFieldEnum[];
};
export type IndexMemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelect<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    include?: Prisma.IndexMemberInclude<ExtArgs> | null;
    where?: Prisma.IndexMemberWhereInput;
    orderBy?: Prisma.IndexMemberOrderByWithRelationInput | Prisma.IndexMemberOrderByWithRelationInput[];
    cursor?: Prisma.IndexMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IndexMemberScalarFieldEnum | Prisma.IndexMemberScalarFieldEnum[];
};
export type IndexMemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelect<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    include?: Prisma.IndexMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IndexMemberCreateInput, Prisma.IndexMemberUncheckedCreateInput>;
};
export type IndexMemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IndexMemberCreateManyInput | Prisma.IndexMemberCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IndexMemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    data: Prisma.IndexMemberCreateManyInput | Prisma.IndexMemberCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.IndexMemberIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type IndexMemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelect<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    include?: Prisma.IndexMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IndexMemberUpdateInput, Prisma.IndexMemberUncheckedUpdateInput>;
    where: Prisma.IndexMemberWhereUniqueInput;
};
export type IndexMemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IndexMemberUpdateManyMutationInput, Prisma.IndexMemberUncheckedUpdateManyInput>;
    where?: Prisma.IndexMemberWhereInput;
    limit?: number;
};
export type IndexMemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IndexMemberUpdateManyMutationInput, Prisma.IndexMemberUncheckedUpdateManyInput>;
    where?: Prisma.IndexMemberWhereInput;
    limit?: number;
    include?: Prisma.IndexMemberIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type IndexMemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelect<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    include?: Prisma.IndexMemberInclude<ExtArgs> | null;
    where: Prisma.IndexMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.IndexMemberCreateInput, Prisma.IndexMemberUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IndexMemberUpdateInput, Prisma.IndexMemberUncheckedUpdateInput>;
};
export type IndexMemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelect<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    include?: Prisma.IndexMemberInclude<ExtArgs> | null;
    where: Prisma.IndexMemberWhereUniqueInput;
};
export type IndexMemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IndexMemberWhereInput;
    limit?: number;
};
export type IndexMemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexMemberSelect<ExtArgs> | null;
    omit?: Prisma.IndexMemberOmit<ExtArgs> | null;
    include?: Prisma.IndexMemberInclude<ExtArgs> | null;
};
export {};

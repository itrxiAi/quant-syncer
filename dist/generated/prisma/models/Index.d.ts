import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IndexModel = runtime.Types.Result.DefaultSelection<Prisma.$IndexPayload>;
export type AggregateIndex = {
    _count: IndexCountAggregateOutputType | null;
    _min: IndexMinAggregateOutputType | null;
    _max: IndexMaxAggregateOutputType | null;
};
export type IndexMinAggregateOutputType = {
    code: string | null;
    name: string | null;
    asset: $Enums.Asset | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type IndexMaxAggregateOutputType = {
    code: string | null;
    name: string | null;
    asset: $Enums.Asset | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type IndexCountAggregateOutputType = {
    code: number;
    name: number;
    asset: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type IndexMinAggregateInputType = {
    code?: true;
    name?: true;
    asset?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type IndexMaxAggregateInputType = {
    code?: true;
    name?: true;
    asset?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type IndexCountAggregateInputType = {
    code?: true;
    name?: true;
    asset?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type IndexAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IndexWhereInput;
    orderBy?: Prisma.IndexOrderByWithRelationInput | Prisma.IndexOrderByWithRelationInput[];
    cursor?: Prisma.IndexWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IndexCountAggregateInputType;
    _min?: IndexMinAggregateInputType;
    _max?: IndexMaxAggregateInputType;
};
export type GetIndexAggregateType<T extends IndexAggregateArgs> = {
    [P in keyof T & keyof AggregateIndex]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIndex[P]> : Prisma.GetScalarType<T[P], AggregateIndex[P]>;
};
export type IndexGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IndexWhereInput;
    orderBy?: Prisma.IndexOrderByWithAggregationInput | Prisma.IndexOrderByWithAggregationInput[];
    by: Prisma.IndexScalarFieldEnum[] | Prisma.IndexScalarFieldEnum;
    having?: Prisma.IndexScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IndexCountAggregateInputType | true;
    _min?: IndexMinAggregateInputType;
    _max?: IndexMaxAggregateInputType;
};
export type IndexGroupByOutputType = {
    code: string;
    name: string | null;
    asset: $Enums.Asset;
    createdAt: Date;
    updatedAt: Date;
    _count: IndexCountAggregateOutputType | null;
    _min: IndexMinAggregateOutputType | null;
    _max: IndexMaxAggregateOutputType | null;
};
type GetIndexGroupByPayload<T extends IndexGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IndexGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IndexGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IndexGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IndexGroupByOutputType[P]>;
}>>;
export type IndexWhereInput = {
    AND?: Prisma.IndexWhereInput | Prisma.IndexWhereInput[];
    OR?: Prisma.IndexWhereInput[];
    NOT?: Prisma.IndexWhereInput | Prisma.IndexWhereInput[];
    code?: Prisma.StringFilter<"Index"> | string;
    name?: Prisma.StringNullableFilter<"Index"> | string | null;
    asset?: Prisma.EnumAssetFilter<"Index"> | $Enums.Asset;
    createdAt?: Prisma.DateTimeFilter<"Index"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Index"> | Date | string;
    members?: Prisma.IndexMemberListRelationFilter;
};
export type IndexOrderByWithRelationInput = {
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    members?: Prisma.IndexMemberOrderByRelationAggregateInput;
};
export type IndexWhereUniqueInput = Prisma.AtLeast<{
    code?: string;
    AND?: Prisma.IndexWhereInput | Prisma.IndexWhereInput[];
    OR?: Prisma.IndexWhereInput[];
    NOT?: Prisma.IndexWhereInput | Prisma.IndexWhereInput[];
    name?: Prisma.StringNullableFilter<"Index"> | string | null;
    asset?: Prisma.EnumAssetFilter<"Index"> | $Enums.Asset;
    createdAt?: Prisma.DateTimeFilter<"Index"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Index"> | Date | string;
    members?: Prisma.IndexMemberListRelationFilter;
}, "code">;
export type IndexOrderByWithAggregationInput = {
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.IndexCountOrderByAggregateInput;
    _max?: Prisma.IndexMaxOrderByAggregateInput;
    _min?: Prisma.IndexMinOrderByAggregateInput;
};
export type IndexScalarWhereWithAggregatesInput = {
    AND?: Prisma.IndexScalarWhereWithAggregatesInput | Prisma.IndexScalarWhereWithAggregatesInput[];
    OR?: Prisma.IndexScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IndexScalarWhereWithAggregatesInput | Prisma.IndexScalarWhereWithAggregatesInput[];
    code?: Prisma.StringWithAggregatesFilter<"Index"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"Index"> | string | null;
    asset?: Prisma.EnumAssetWithAggregatesFilter<"Index"> | $Enums.Asset;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Index"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Index"> | Date | string;
};
export type IndexCreateInput = {
    code: string;
    name?: string | null;
    asset: $Enums.Asset;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.IndexMemberCreateNestedManyWithoutIndexInput;
};
export type IndexUncheckedCreateInput = {
    code: string;
    name?: string | null;
    asset: $Enums.Asset;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.IndexMemberUncheckedCreateNestedManyWithoutIndexInput;
};
export type IndexUpdateInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.IndexMemberUpdateManyWithoutIndexNestedInput;
};
export type IndexUncheckedUpdateInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.IndexMemberUncheckedUpdateManyWithoutIndexNestedInput;
};
export type IndexCreateManyInput = {
    code: string;
    name?: string | null;
    asset: $Enums.Asset;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type IndexUpdateManyMutationInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IndexUncheckedUpdateManyInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IndexCountOrderByAggregateInput = {
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type IndexMaxOrderByAggregateInput = {
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type IndexMinOrderByAggregateInput = {
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type IndexScalarRelationFilter = {
    is?: Prisma.IndexWhereInput;
    isNot?: Prisma.IndexWhereInput;
};
export type IndexCreateNestedOneWithoutMembersInput = {
    create?: Prisma.XOR<Prisma.IndexCreateWithoutMembersInput, Prisma.IndexUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.IndexCreateOrConnectWithoutMembersInput;
    connect?: Prisma.IndexWhereUniqueInput;
};
export type IndexUpdateOneRequiredWithoutMembersNestedInput = {
    create?: Prisma.XOR<Prisma.IndexCreateWithoutMembersInput, Prisma.IndexUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.IndexCreateOrConnectWithoutMembersInput;
    upsert?: Prisma.IndexUpsertWithoutMembersInput;
    connect?: Prisma.IndexWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.IndexUpdateToOneWithWhereWithoutMembersInput, Prisma.IndexUpdateWithoutMembersInput>, Prisma.IndexUncheckedUpdateWithoutMembersInput>;
};
export type IndexCreateWithoutMembersInput = {
    code: string;
    name?: string | null;
    asset: $Enums.Asset;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type IndexUncheckedCreateWithoutMembersInput = {
    code: string;
    name?: string | null;
    asset: $Enums.Asset;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type IndexCreateOrConnectWithoutMembersInput = {
    where: Prisma.IndexWhereUniqueInput;
    create: Prisma.XOR<Prisma.IndexCreateWithoutMembersInput, Prisma.IndexUncheckedCreateWithoutMembersInput>;
};
export type IndexUpsertWithoutMembersInput = {
    update: Prisma.XOR<Prisma.IndexUpdateWithoutMembersInput, Prisma.IndexUncheckedUpdateWithoutMembersInput>;
    create: Prisma.XOR<Prisma.IndexCreateWithoutMembersInput, Prisma.IndexUncheckedCreateWithoutMembersInput>;
    where?: Prisma.IndexWhereInput;
};
export type IndexUpdateToOneWithWhereWithoutMembersInput = {
    where?: Prisma.IndexWhereInput;
    data: Prisma.XOR<Prisma.IndexUpdateWithoutMembersInput, Prisma.IndexUncheckedUpdateWithoutMembersInput>;
};
export type IndexUpdateWithoutMembersInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IndexUncheckedUpdateWithoutMembersInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IndexCountOutputType = {
    members: number;
};
export type IndexCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | IndexCountOutputTypeCountMembersArgs;
};
export type IndexCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexCountOutputTypeSelect<ExtArgs> | null;
};
export type IndexCountOutputTypeCountMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IndexMemberWhereInput;
};
export type IndexSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    code?: boolean;
    name?: boolean;
    asset?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    members?: boolean | Prisma.Index$membersArgs<ExtArgs>;
    _count?: boolean | Prisma.IndexCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["index"]>;
export type IndexSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    code?: boolean;
    name?: boolean;
    asset?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["index"]>;
export type IndexSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    code?: boolean;
    name?: boolean;
    asset?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["index"]>;
export type IndexSelectScalar = {
    code?: boolean;
    name?: boolean;
    asset?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type IndexOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"code" | "name" | "asset" | "createdAt" | "updatedAt", ExtArgs["result"]["index"]>;
export type IndexInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | Prisma.Index$membersArgs<ExtArgs>;
    _count?: boolean | Prisma.IndexCountOutputTypeDefaultArgs<ExtArgs>;
};
export type IndexIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type IndexIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $IndexPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Index";
    objects: {
        members: Prisma.$IndexMemberPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        code: string;
        name: string | null;
        asset: $Enums.Asset;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["index"]>;
    composites: {};
};
export type IndexGetPayload<S extends boolean | null | undefined | IndexDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IndexPayload, S>;
export type IndexCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IndexFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IndexCountAggregateInputType | true;
};
export interface IndexDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Index'];
        meta: {
            name: 'Index';
        };
    };
    findUnique<T extends IndexFindUniqueArgs>(args: Prisma.SelectSubset<T, IndexFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IndexClient<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IndexFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IndexFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IndexClient<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IndexFindFirstArgs>(args?: Prisma.SelectSubset<T, IndexFindFirstArgs<ExtArgs>>): Prisma.Prisma__IndexClient<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IndexFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IndexFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IndexClient<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IndexFindManyArgs>(args?: Prisma.SelectSubset<T, IndexFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IndexCreateArgs>(args: Prisma.SelectSubset<T, IndexCreateArgs<ExtArgs>>): Prisma.Prisma__IndexClient<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IndexCreateManyArgs>(args?: Prisma.SelectSubset<T, IndexCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IndexCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IndexCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IndexDeleteArgs>(args: Prisma.SelectSubset<T, IndexDeleteArgs<ExtArgs>>): Prisma.Prisma__IndexClient<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IndexUpdateArgs>(args: Prisma.SelectSubset<T, IndexUpdateArgs<ExtArgs>>): Prisma.Prisma__IndexClient<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IndexDeleteManyArgs>(args?: Prisma.SelectSubset<T, IndexDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IndexUpdateManyArgs>(args: Prisma.SelectSubset<T, IndexUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IndexUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IndexUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IndexUpsertArgs>(args: Prisma.SelectSubset<T, IndexUpsertArgs<ExtArgs>>): Prisma.Prisma__IndexClient<runtime.Types.Result.GetResult<Prisma.$IndexPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IndexCountArgs>(args?: Prisma.Subset<T, IndexCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IndexCountAggregateOutputType> : number>;
    aggregate<T extends IndexAggregateArgs>(args: Prisma.Subset<T, IndexAggregateArgs>): Prisma.PrismaPromise<GetIndexAggregateType<T>>;
    groupBy<T extends IndexGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IndexGroupByArgs['orderBy'];
    } : {
        orderBy?: IndexGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IndexGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIndexGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IndexFieldRefs;
}
export interface Prisma__IndexClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    members<T extends Prisma.Index$membersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Index$membersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IndexMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IndexFieldRefs {
    readonly code: Prisma.FieldRef<"Index", 'String'>;
    readonly name: Prisma.FieldRef<"Index", 'String'>;
    readonly asset: Prisma.FieldRef<"Index", 'Asset'>;
    readonly createdAt: Prisma.FieldRef<"Index", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Index", 'DateTime'>;
}
export type IndexFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelect<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    include?: Prisma.IndexInclude<ExtArgs> | null;
    where: Prisma.IndexWhereUniqueInput;
};
export type IndexFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelect<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    include?: Prisma.IndexInclude<ExtArgs> | null;
    where: Prisma.IndexWhereUniqueInput;
};
export type IndexFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelect<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    include?: Prisma.IndexInclude<ExtArgs> | null;
    where?: Prisma.IndexWhereInput;
    orderBy?: Prisma.IndexOrderByWithRelationInput | Prisma.IndexOrderByWithRelationInput[];
    cursor?: Prisma.IndexWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IndexScalarFieldEnum | Prisma.IndexScalarFieldEnum[];
};
export type IndexFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelect<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    include?: Prisma.IndexInclude<ExtArgs> | null;
    where?: Prisma.IndexWhereInput;
    orderBy?: Prisma.IndexOrderByWithRelationInput | Prisma.IndexOrderByWithRelationInput[];
    cursor?: Prisma.IndexWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IndexScalarFieldEnum | Prisma.IndexScalarFieldEnum[];
};
export type IndexFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelect<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    include?: Prisma.IndexInclude<ExtArgs> | null;
    where?: Prisma.IndexWhereInput;
    orderBy?: Prisma.IndexOrderByWithRelationInput | Prisma.IndexOrderByWithRelationInput[];
    cursor?: Prisma.IndexWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IndexScalarFieldEnum | Prisma.IndexScalarFieldEnum[];
};
export type IndexCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelect<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    include?: Prisma.IndexInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IndexCreateInput, Prisma.IndexUncheckedCreateInput>;
};
export type IndexCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IndexCreateManyInput | Prisma.IndexCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IndexCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    data: Prisma.IndexCreateManyInput | Prisma.IndexCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IndexUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelect<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    include?: Prisma.IndexInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IndexUpdateInput, Prisma.IndexUncheckedUpdateInput>;
    where: Prisma.IndexWhereUniqueInput;
};
export type IndexUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IndexUpdateManyMutationInput, Prisma.IndexUncheckedUpdateManyInput>;
    where?: Prisma.IndexWhereInput;
    limit?: number;
};
export type IndexUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IndexUpdateManyMutationInput, Prisma.IndexUncheckedUpdateManyInput>;
    where?: Prisma.IndexWhereInput;
    limit?: number;
};
export type IndexUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelect<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    include?: Prisma.IndexInclude<ExtArgs> | null;
    where: Prisma.IndexWhereUniqueInput;
    create: Prisma.XOR<Prisma.IndexCreateInput, Prisma.IndexUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IndexUpdateInput, Prisma.IndexUncheckedUpdateInput>;
};
export type IndexDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelect<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    include?: Prisma.IndexInclude<ExtArgs> | null;
    where: Prisma.IndexWhereUniqueInput;
};
export type IndexDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IndexWhereInput;
    limit?: number;
};
export type Index$membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type IndexDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IndexSelect<ExtArgs> | null;
    omit?: Prisma.IndexOmit<ExtArgs> | null;
    include?: Prisma.IndexInclude<ExtArgs> | null;
};
export {};

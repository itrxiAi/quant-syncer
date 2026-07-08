import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CalendarModel = runtime.Types.Result.DefaultSelection<Prisma.$CalendarPayload>;
export type AggregateCalendar = {
    _count: CalendarCountAggregateOutputType | null;
    _min: CalendarMinAggregateOutputType | null;
    _max: CalendarMaxAggregateOutputType | null;
};
export type CalendarMinAggregateOutputType = {
    date: Date | null;
    isOpen: boolean | null;
    asset: $Enums.Asset | null;
};
export type CalendarMaxAggregateOutputType = {
    date: Date | null;
    isOpen: boolean | null;
    asset: $Enums.Asset | null;
};
export type CalendarCountAggregateOutputType = {
    date: number;
    isOpen: number;
    asset: number;
    _all: number;
};
export type CalendarMinAggregateInputType = {
    date?: true;
    isOpen?: true;
    asset?: true;
};
export type CalendarMaxAggregateInputType = {
    date?: true;
    isOpen?: true;
    asset?: true;
};
export type CalendarCountAggregateInputType = {
    date?: true;
    isOpen?: true;
    asset?: true;
    _all?: true;
};
export type CalendarAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CalendarWhereInput;
    orderBy?: Prisma.CalendarOrderByWithRelationInput | Prisma.CalendarOrderByWithRelationInput[];
    cursor?: Prisma.CalendarWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CalendarCountAggregateInputType;
    _min?: CalendarMinAggregateInputType;
    _max?: CalendarMaxAggregateInputType;
};
export type GetCalendarAggregateType<T extends CalendarAggregateArgs> = {
    [P in keyof T & keyof AggregateCalendar]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCalendar[P]> : Prisma.GetScalarType<T[P], AggregateCalendar[P]>;
};
export type CalendarGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CalendarWhereInput;
    orderBy?: Prisma.CalendarOrderByWithAggregationInput | Prisma.CalendarOrderByWithAggregationInput[];
    by: Prisma.CalendarScalarFieldEnum[] | Prisma.CalendarScalarFieldEnum;
    having?: Prisma.CalendarScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CalendarCountAggregateInputType | true;
    _min?: CalendarMinAggregateInputType;
    _max?: CalendarMaxAggregateInputType;
};
export type CalendarGroupByOutputType = {
    date: Date;
    isOpen: boolean;
    asset: $Enums.Asset;
    _count: CalendarCountAggregateOutputType | null;
    _min: CalendarMinAggregateOutputType | null;
    _max: CalendarMaxAggregateOutputType | null;
};
type GetCalendarGroupByPayload<T extends CalendarGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CalendarGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CalendarGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CalendarGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CalendarGroupByOutputType[P]>;
}>>;
export type CalendarWhereInput = {
    AND?: Prisma.CalendarWhereInput | Prisma.CalendarWhereInput[];
    OR?: Prisma.CalendarWhereInput[];
    NOT?: Prisma.CalendarWhereInput | Prisma.CalendarWhereInput[];
    date?: Prisma.DateTimeFilter<"Calendar"> | Date | string;
    isOpen?: Prisma.BoolFilter<"Calendar"> | boolean;
    asset?: Prisma.EnumAssetFilter<"Calendar"> | $Enums.Asset;
};
export type CalendarOrderByWithRelationInput = {
    date?: Prisma.SortOrder;
    isOpen?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
};
export type CalendarWhereUniqueInput = Prisma.AtLeast<{
    date?: Date | string;
    AND?: Prisma.CalendarWhereInput | Prisma.CalendarWhereInput[];
    OR?: Prisma.CalendarWhereInput[];
    NOT?: Prisma.CalendarWhereInput | Prisma.CalendarWhereInput[];
    isOpen?: Prisma.BoolFilter<"Calendar"> | boolean;
    asset?: Prisma.EnumAssetFilter<"Calendar"> | $Enums.Asset;
}, "date">;
export type CalendarOrderByWithAggregationInput = {
    date?: Prisma.SortOrder;
    isOpen?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
    _count?: Prisma.CalendarCountOrderByAggregateInput;
    _max?: Prisma.CalendarMaxOrderByAggregateInput;
    _min?: Prisma.CalendarMinOrderByAggregateInput;
};
export type CalendarScalarWhereWithAggregatesInput = {
    AND?: Prisma.CalendarScalarWhereWithAggregatesInput | Prisma.CalendarScalarWhereWithAggregatesInput[];
    OR?: Prisma.CalendarScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CalendarScalarWhereWithAggregatesInput | Prisma.CalendarScalarWhereWithAggregatesInput[];
    date?: Prisma.DateTimeWithAggregatesFilter<"Calendar"> | Date | string;
    isOpen?: Prisma.BoolWithAggregatesFilter<"Calendar"> | boolean;
    asset?: Prisma.EnumAssetWithAggregatesFilter<"Calendar"> | $Enums.Asset;
};
export type CalendarCreateInput = {
    date: Date | string;
    isOpen: boolean;
    asset: $Enums.Asset;
};
export type CalendarUncheckedCreateInput = {
    date: Date | string;
    isOpen: boolean;
    asset: $Enums.Asset;
};
export type CalendarUpdateInput = {
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isOpen?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
};
export type CalendarUncheckedUpdateInput = {
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isOpen?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
};
export type CalendarCreateManyInput = {
    date: Date | string;
    isOpen: boolean;
    asset: $Enums.Asset;
};
export type CalendarUpdateManyMutationInput = {
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isOpen?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
};
export type CalendarUncheckedUpdateManyInput = {
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isOpen?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    asset?: Prisma.EnumAssetFieldUpdateOperationsInput | $Enums.Asset;
};
export type CalendarCountOrderByAggregateInput = {
    date?: Prisma.SortOrder;
    isOpen?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
};
export type CalendarMaxOrderByAggregateInput = {
    date?: Prisma.SortOrder;
    isOpen?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
};
export type CalendarMinOrderByAggregateInput = {
    date?: Prisma.SortOrder;
    isOpen?: Prisma.SortOrder;
    asset?: Prisma.SortOrder;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type CalendarSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    date?: boolean;
    isOpen?: boolean;
    asset?: boolean;
}, ExtArgs["result"]["calendar"]>;
export type CalendarSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    date?: boolean;
    isOpen?: boolean;
    asset?: boolean;
}, ExtArgs["result"]["calendar"]>;
export type CalendarSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    date?: boolean;
    isOpen?: boolean;
    asset?: boolean;
}, ExtArgs["result"]["calendar"]>;
export type CalendarSelectScalar = {
    date?: boolean;
    isOpen?: boolean;
    asset?: boolean;
};
export type CalendarOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"date" | "isOpen" | "asset", ExtArgs["result"]["calendar"]>;
export type $CalendarPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Calendar";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        date: Date;
        isOpen: boolean;
        asset: $Enums.Asset;
    }, ExtArgs["result"]["calendar"]>;
    composites: {};
};
export type CalendarGetPayload<S extends boolean | null | undefined | CalendarDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CalendarPayload, S>;
export type CalendarCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CalendarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CalendarCountAggregateInputType | true;
};
export interface CalendarDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Calendar'];
        meta: {
            name: 'Calendar';
        };
    };
    findUnique<T extends CalendarFindUniqueArgs>(args: Prisma.SelectSubset<T, CalendarFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CalendarClient<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CalendarFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CalendarFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CalendarClient<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CalendarFindFirstArgs>(args?: Prisma.SelectSubset<T, CalendarFindFirstArgs<ExtArgs>>): Prisma.Prisma__CalendarClient<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CalendarFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CalendarFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CalendarClient<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CalendarFindManyArgs>(args?: Prisma.SelectSubset<T, CalendarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CalendarCreateArgs>(args: Prisma.SelectSubset<T, CalendarCreateArgs<ExtArgs>>): Prisma.Prisma__CalendarClient<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CalendarCreateManyArgs>(args?: Prisma.SelectSubset<T, CalendarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CalendarCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CalendarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CalendarDeleteArgs>(args: Prisma.SelectSubset<T, CalendarDeleteArgs<ExtArgs>>): Prisma.Prisma__CalendarClient<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CalendarUpdateArgs>(args: Prisma.SelectSubset<T, CalendarUpdateArgs<ExtArgs>>): Prisma.Prisma__CalendarClient<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CalendarDeleteManyArgs>(args?: Prisma.SelectSubset<T, CalendarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CalendarUpdateManyArgs>(args: Prisma.SelectSubset<T, CalendarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CalendarUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CalendarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CalendarUpsertArgs>(args: Prisma.SelectSubset<T, CalendarUpsertArgs<ExtArgs>>): Prisma.Prisma__CalendarClient<runtime.Types.Result.GetResult<Prisma.$CalendarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CalendarCountArgs>(args?: Prisma.Subset<T, CalendarCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CalendarCountAggregateOutputType> : number>;
    aggregate<T extends CalendarAggregateArgs>(args: Prisma.Subset<T, CalendarAggregateArgs>): Prisma.PrismaPromise<GetCalendarAggregateType<T>>;
    groupBy<T extends CalendarGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CalendarGroupByArgs['orderBy'];
    } : {
        orderBy?: CalendarGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CalendarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCalendarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CalendarFieldRefs;
}
export interface Prisma__CalendarClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CalendarFieldRefs {
    readonly date: Prisma.FieldRef<"Calendar", 'DateTime'>;
    readonly isOpen: Prisma.FieldRef<"Calendar", 'Boolean'>;
    readonly asset: Prisma.FieldRef<"Calendar", 'Asset'>;
}
export type CalendarFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelect<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    where: Prisma.CalendarWhereUniqueInput;
};
export type CalendarFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelect<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    where: Prisma.CalendarWhereUniqueInput;
};
export type CalendarFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelect<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    where?: Prisma.CalendarWhereInput;
    orderBy?: Prisma.CalendarOrderByWithRelationInput | Prisma.CalendarOrderByWithRelationInput[];
    cursor?: Prisma.CalendarWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CalendarScalarFieldEnum | Prisma.CalendarScalarFieldEnum[];
};
export type CalendarFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelect<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    where?: Prisma.CalendarWhereInput;
    orderBy?: Prisma.CalendarOrderByWithRelationInput | Prisma.CalendarOrderByWithRelationInput[];
    cursor?: Prisma.CalendarWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CalendarScalarFieldEnum | Prisma.CalendarScalarFieldEnum[];
};
export type CalendarFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelect<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    where?: Prisma.CalendarWhereInput;
    orderBy?: Prisma.CalendarOrderByWithRelationInput | Prisma.CalendarOrderByWithRelationInput[];
    cursor?: Prisma.CalendarWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CalendarScalarFieldEnum | Prisma.CalendarScalarFieldEnum[];
};
export type CalendarCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelect<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CalendarCreateInput, Prisma.CalendarUncheckedCreateInput>;
};
export type CalendarCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CalendarCreateManyInput | Prisma.CalendarCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CalendarCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    data: Prisma.CalendarCreateManyInput | Prisma.CalendarCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CalendarUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelect<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CalendarUpdateInput, Prisma.CalendarUncheckedUpdateInput>;
    where: Prisma.CalendarWhereUniqueInput;
};
export type CalendarUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CalendarUpdateManyMutationInput, Prisma.CalendarUncheckedUpdateManyInput>;
    where?: Prisma.CalendarWhereInput;
    limit?: number;
};
export type CalendarUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CalendarUpdateManyMutationInput, Prisma.CalendarUncheckedUpdateManyInput>;
    where?: Prisma.CalendarWhereInput;
    limit?: number;
};
export type CalendarUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelect<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    where: Prisma.CalendarWhereUniqueInput;
    create: Prisma.XOR<Prisma.CalendarCreateInput, Prisma.CalendarUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CalendarUpdateInput, Prisma.CalendarUncheckedUpdateInput>;
};
export type CalendarDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelect<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
    where: Prisma.CalendarWhereUniqueInput;
};
export type CalendarDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CalendarWhereInput;
    limit?: number;
};
export type CalendarDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSelect<ExtArgs> | null;
    omit?: Prisma.CalendarOmit<ExtArgs> | null;
};
export {};

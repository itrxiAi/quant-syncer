"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/library"));
const config = {
    "generator": {
        "name": "client",
        "provider": {
            "fromEnvVar": null,
            "value": "prisma-client"
        },
        "output": {
            "value": "/Users/skywalker/Downloads/projects/quant/qlib-syncer/generated/prisma",
            "fromEnvVar": null
        },
        "config": {
            "engineType": "library"
        },
        "binaryTargets": [
            {
                "fromEnvVar": null,
                "value": "darwin-arm64",
                "native": true
            }
        ],
        "previewFeatures": [],
        "sourceFilePath": "/Users/skywalker/Downloads/projects/quant/qlib-syncer/prisma/schema.prisma",
        "isCustomOutput": true
    },
    "relativePath": "../../prisma",
    "clientVersion": "6.19.3",
    "engineVersion": "c2990dca591cba766e3b7ef5d9e8a84796e47ab7",
    "datasourceNames": [
        "db"
    ],
    "activeProvider": "postgresql",
    "postinstall": false,
    "inlineDatasources": {
        "db": {
            "url": {
                "fromEnvVar": "DATABASE_URL",
                "value": null
            }
        }
    },
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum Asset {\n  ashare\n  crypto\n}\n\nenum Freq {\n  d1\n  m5\n  m15\n  h1\n  h4\n}\n\nmodel Bar {\n  ts                 DateTime @db.Timestamptz\n  symbol             String   @db.VarChar(16)\n  asset              Asset\n  freq               Freq\n  open               Float?\n  high               Float?\n  low                Float?\n  close              Float?\n  volume             Float?\n  amount             Float?\n  factor             Float    @default(1)\n  takerBuyBaseVolume Float?   @map(\"taker_buy_base_volume\")\n  vendor             String?  @db.VarChar(32)\n  ingestTs           DateTime @default(now()) @map(\"ingest_ts\")\n\n  @@id([ts, symbol, asset, freq])\n  @@index([symbol, asset, freq, ts(sort: Desc)])\n  @@index([ts, asset, freq])\n  @@index([asset, freq, ts(sort: Desc)])\n  @@map(\"bar\")\n}\n\nmodel BarRaw {\n  ts       DateTime @db.Timestamptz\n  symbol   String   @db.VarChar(16)\n  asset    Asset\n  freq     Freq\n  vendor   String   @db.VarChar(32)\n  data     Json\n  ingestTs DateTime @default(now()) @map(\"ingest_ts\")\n\n  @@id([ts, symbol, asset, freq, vendor])\n  @@index([symbol, asset, freq, ts(sort: Desc)])\n  @@map(\"bar_raw\")\n}\n\nmodel Calendar {\n  date   DateTime @id @db.Date\n  isOpen Boolean  @map(\"is_open\")\n  asset  Asset\n\n  @@index([asset, date])\n  @@map(\"calendar\")\n}\n\nmodel Index {\n  code      String   @id @db.VarChar(32) // e.g. csi500, csi1000, all_ashare\n  name      String?  @db.VarChar(64)\n  asset     Asset\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  members IndexMember[]\n\n  @@map(\"index\")\n}\n\nmodel IndexMember {\n  indexCode String    @map(\"index_code\")\n  symbol    String    @db.VarChar(16)\n  inDate    DateTime  @map(\"in_date\") @db.Date\n  outDate   DateTime? @map(\"out_date\") @db.Date\n\n  index Index @relation(fields: [indexCode], references: [code])\n\n  @@id([indexCode, symbol, inDate])\n  @@index([symbol])\n  @@index([indexCode, inDate, outDate])\n  @@map(\"index_member\")\n}\n",
    "inlineSchemaHash": "52f0550d386e920c730e32c09f96921fc58278d1e25b7444b4e0fe0c0933a294",
    "copyEngine": true,
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "dirname": ""
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Bar\":{\"dbName\":\"bar\",\"schema\":null,\"fields\":[{\"name\":\"ts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"symbol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"16\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Asset\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"freq\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Freq\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"open\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"high\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"low\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"close\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volume\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"factor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"nativeType\":null,\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"takerBuyBaseVolume\",\"dbName\":\"taker_buy_base_volume\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vendor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"32\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ingestTs\",\"dbName\":\"ingest_ts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"ts\",\"symbol\",\"asset\",\"freq\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BarRaw\":{\"dbName\":\"bar_raw\",\"schema\":null,\"fields\":[{\"name\":\"ts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Timestamptz\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"symbol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"16\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Asset\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"freq\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Freq\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vendor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"32\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ingestTs\",\"dbName\":\"ingest_ts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"ts\",\"symbol\",\"asset\",\"freq\",\"vendor\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Calendar\":{\"dbName\":\"calendar\",\"schema\":null,\"fields\":[{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isOpen\",\"dbName\":\"is_open\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Asset\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Index\":{\"dbName\":\"index\",\"schema\":null,\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"32\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"64\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Asset\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"IndexMember\",\"nativeType\":null,\"relationName\":\"IndexToIndexMember\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"IndexMember\":{\"dbName\":\"index_member\",\"schema\":null,\"fields\":[{\"name\":\"indexCode\",\"dbName\":\"index_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"symbol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"16\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"inDate\",\"dbName\":\"in_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"outDate\",\"dbName\":\"out_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"index\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Index\",\"nativeType\":null,\"relationName\":\"IndexToIndexMember\",\"relationFromFields\":[\"indexCode\"],\"relationToFields\":[\"code\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"indexCode\",\"symbol\",\"inDate\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Asset\":{\"values\":[{\"name\":\"ashare\",\"dbName\":null},{\"name\":\"crypto\",\"dbName\":null}],\"dbName\":null},\"Freq\":{\"values\":[{\"name\":\"d1\",\"dbName\":null},{\"name\":\"m5\",\"dbName\":null},{\"name\":\"m15\",\"dbName\":null},{\"name\":\"h1\",\"dbName\":null},{\"name\":\"h4\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}");
config.engineWasm = undefined;
config.compilerWasm = undefined;
function getPrismaClientClass(dirname) {
    config.dirname = dirname;
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map